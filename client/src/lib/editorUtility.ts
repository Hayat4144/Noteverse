import { CustomElement, ImageElement, LinkElement } from '@/types';
import { isHotkey } from 'is-hotkey';
import isUrl from 'is-url';
import React from 'react';
import {
  Editor,
  Element,
  Transforms,
  Range,
  Path,
  Point,
  Selection,
  Node,
  Text,
  BasePoint,
} from 'slate';
import { ReactEditor } from 'slate-react';

const LIST_TYPES = ['numberList', 'bulletedList'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

interface emojiPatternProps {
  editor: Editor;
  setEmoji: (value: string) => void;
  setEmojiToggle: (value: boolean) => void;
  setemojiTragetRange: (value: Range) => void;
}

const editorUtiliy = {
  emptyNode: (editor: Editor) => {
    const { selection } = editor;

    if (selection) {
      const [start] = Range.edges(selection);
      const characterBefore = Editor.before(editor, start, {
        unit: 'character',
      });
      Transforms.delete(editor, { at: characterBefore });
      Transforms.setNodes(editor, { text: ' ' });
    }
  },
  detectCommandMenuPattern: (
    editor: Editor,
    toggleCommandMenu: (value: boolean) => void,
  ) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const [node] = Editor.node(editor, start.path);
      if ((node as any).text.endsWith('/')) {
        toggleCommandMenu(true);
      }
    }
  },
  identifyLinksInTextIfAny: (editor: Editor) => {
    // if selection is not collapsed, we do not proceed with the link detection.
    if (editor.selection == null || !Range.isCollapsed(editor.selection)) {
      return;
    }

    const [node] = Editor.parent(editor, editor.selection);
    // if we are already inside a link, exit early.
    if ((node as any).type === 'link') {
      return;
    }

    const [currentNode, currentNodePath] = Editor.node(
      editor,
      editor.selection,
    );
    if (!Text.isText(currentNode)) {
      return;
    }

    let [start] = Range.edges(editor.selection);
    const cursorPoint = start;

    const startPointOfLastCharacter = Editor.before(editor, editor.selection, {
      unit: 'character',
    });
    if (!startPointOfLastCharacter || !start) return;
    let lastCharacter = Editor.string(
      editor,
      Editor.range(editor, startPointOfLastCharacter, cursorPoint),
    );

    if (lastCharacter !== ' ') {
      return;
    }

    let end = startPointOfLastCharacter;
    start = Editor.before(editor, end, {
      unit: 'character',
    }) as BasePoint;

    const startOfTextNode = Editor.point(editor, currentNodePath, {
      edge: 'start',
    });

    lastCharacter = Editor.string(editor, Editor.range(editor, start, end));

    while (lastCharacter !== ' ' && !Point.isBefore(start, startOfTextNode)) {
      end = start;
      start = Editor.before(editor, end, { unit: 'character' }) as BasePoint;
      lastCharacter = Editor.string(editor, Editor.range(editor, start, end));
    }

    const lastWordRange = Editor.range(editor, end, startPointOfLastCharacter);
    const lastWord = Editor.string(editor, lastWordRange);

    if (isUrl(lastWord)) {
      Promise.resolve().then(() =>
        editorUtiliy.createLinkForRange(
          editor,
          lastWordRange,
          lastWord,
          lastWord,
          false,
        ),
      );
    }
  },
  createLinkForRange: (
    editor: Editor,
    range: Range,
    linkText: string,
    linkURL: string,
    isInsertion: boolean,
  ) => {
    isInsertion
      ? Transforms.insertNodes(
          editor,
          {
            type: 'link',
            url: linkURL,
            children: [{ text: linkText }],
          },
          range != null ? { at: range } : undefined,
        )
      : Transforms.wrapNodes(
          editor,
          { type: 'link', url: linkURL, children: [{ text: linkText }] },
          { split: true, at: range },
        );
  },
  detectEmojiPattern: ({
    editor,
    setEmoji,
    setEmojiToggle,
    setemojiTragetRange,
  }: emojiPatternProps) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, {
        unit: 'word',
      });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);

      const beforeColonMatch = beforeText && beforeText.match(/^:(\w+)$/);

      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeColonMatch && afterMatch) {
        setEmoji(beforeColonMatch[1]);
        setEmojiToggle(true);
        setemojiTragetRange(beforeRange);
      } else {
        setEmoji('');
        setEmojiToggle(false);
      }
    }
  },
  insertEmoji: (editor: Editor, targetRange: Range, text: any) => {
    Editor.before(editor, targetRange, {
      unit: 'character',
    });
    Transforms.delete(editor, { at: targetRange });
    Transforms.insertText(editor, text);
  },
  gettextBlockStyle: (editor: Editor) => {
    const { selection } = editor;
    if (!selection) {
      return null;
    }
    // gives the forward-direction points in case the selection was
    // was backwards.
    const [start, end] = Range.edges(selection);

    //path[0] gives us the index of the top-level block.
    let startTopLevelBlockIndex = start.path[0];
    const endTopLevelBlockIndex = end.path[0];

    let blockType = null;
    while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
      const [node, _] = Editor.node(editor, [startTopLevelBlockIndex]);
      const typedParentNode = node as CustomElement;
      if (blockType == null) {
        blockType = typedParentNode.type;
      } else if (blockType !== typedParentNode.type) {
        return 'Mixed';
      }
      startTopLevelBlockIndex++;
    }

    return blockType;
  },
  updloadImagehandler: (editor: Editor, files: FileList) => {
    for (const file of files) {
      // FileReader read the files from user storage
      const reader = new FileReader();
      const [mime] = file.type.split('/');
      if (mime === 'image') {
        /* send the file to server for saving
              image upload to server or image service provider
          */
        reader.addEventListener('load', () => {
          const url = reader.result;
          url &&
            typeof url === 'string' &&
            editorUtiliy.insertImage(editor, url);
        });
        reader.readAsDataURL(file);
      }
    }
  },
  insertImage: (editor: Editor, url: string) => {
    const imageNode: ImageElement = {
      type: 'image',
      url,
      children: [{ text: '' }],
    };
    editorUtiliy.InsertNode(editor, imageNode);
  },
  removeImage: (editor: Editor, path: Path) => {
    Transforms.removeNodes(editor, { at: path });
  },
  HOT_KEYS: {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  },
  MarkdownShortcut: {
    '*': 'bulletedlList',
    '-': 'bulletedlList',
    '+': 'numberList',
    '1': 'numberList',
    '[]': 'link',
    '>': 'blockQuote',
    '#': 'heading',
    '##': 'headingTwo',
    '###': 'headingThree',
    '####': 'headingFour',
    '#####': 'headingFive',
    '######': 'headingSix',
  },
  onkeydown: (event: React.KeyboardEvent, editor: Editor) => {
    for (const hotkey in editorUtiliy.HOT_KEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const markType =
          editorUtiliy.HOT_KEYS[hotkey as keyof typeof editorUtiliy.HOT_KEYS];
        editorUtiliy.toggleMark(editor, markType, true);
      }
    }
    if (isHotkey('tab', event)) {
      event.preventDefault();
      Transforms.insertText(editor, '   ');
    }
  },
  isMarkActive: (editor: Editor, format: string, value?: string | boolean) => {
    const marks = Editor.marks(editor) as {
      [key: string]: string | boolean;
    } | null;

    if (value === undefined) {
      return !!marks && !!marks[format];
    } else if (marks && format in marks) {
      return marks[format] === value;
    } else {
      return false;
    }
  },
  toggleMark: (editor: Editor, markType: string, value: string | boolean) => {
    const isActiveMark = editorUtiliy.isMarkActive(editor, markType, value);
    if (isActiveMark) {
      Editor.removeMark(editor, markType);
    } else {
      Editor.addMark(editor, markType, value);
    }
  },
  isBlockActive: (editor: Editor, format: string, blockType = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[blockType as keyof typeof n] === format,
      }),
    );

    return !!match;
  },
  isBlock: (editor: Editor, block: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === block,
    });
    return !!match;
  },
  getBlock: (editor: Editor, block: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === block,
    });
    return match;
  },
  deleteBackwardElements: (editor: Editor, blocktype: string) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === blocktype,
      });

      if (match) {
        const [, path] = match;
        const start = Editor.start(editor, path);

        if (Point.equals(selection.anchor, start)) {
          const newProperties: Partial<Element> = {
            type: 'paragraph',
          };
          const m = Transforms.setNodes(editor, newProperties, {
            match: (n) =>
              !Editor.isEditor(n) &&
              Element.isElement(n) &&
              n.type === blocktype,
          });
          return;
        }
      }
    }
  },
  InsertNode: (editor: Editor, nodes: Element) => {
    return Transforms.insertNodes(editor, nodes);
  },
  wrapNodes: (
    editor: Editor,
    nodes: Element,
    match?: boolean,
    blocktype?: string,
  ) => {
    if (match && blocktype) {
      Transforms.wrapNodes(editor, nodes, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === blocktype,
      });
    } else {
      Transforms.wrapNodes(editor, nodes, { split: true });
    }
  },
  removeLink: (editor: Editor) => {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });
  },
  linkElement: (url = '#', urlText = 'click here') => {
    const link: LinkElement = {
      type: 'link',
      url: url,
      children: [{ text: urlText }],
    };
    return link;
  },
  updateLink: (editor: Editor, url: string) => {
    const { selection } = editor;
    if (!selection) return;

    const inLink = editorUtiliy.isLinkNodeatSelection(editor, selection);
    if (!inLink) return;
    const linkNodePath = ReactEditor.findPath(
      editor,
      Node.parent(editor, selection.focus.path),
    );
    Transforms.setNodes(editor, { url }, { at: linkNodePath });
  },
  toggleLink: (editor: Editor, url: string, urlText: string) => {
    const { selection } = editor;
    ReactEditor.focus(editor);
    const isCollapsed = selection && Range.isCollapsed(selection);
    const isLinkActive = editorUtiliy.isBlock(editor, 'link');
    if (!selection) {
      editorUtiliy.InsertNode(editor, editorUtiliy.linkElement(url, urlText));
      return;
    }
    if (isLinkActive) {
      editorUtiliy.removeLink(editor);
    }
    if (isLinkActive && isCollapsed) {
      editorUtiliy.removeLink(editor);
      return;
    }

    if (isLinkActive) {
      editorUtiliy.removeLink(editor);
      return;
    }
    editorUtiliy.wrapNodes(editor, editorUtiliy.linkElement(url, urlText));
  },
  toggleBlock: (editor: Editor, format: string) => {
    const isActive = editorUtiliy.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
    );
    const isList = LIST_TYPES.includes(format);

    // remove the the one or more parent node from selection
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });

    let newProperties: Partial<Element>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = {
        type: isActive
          ? 'paragraph'
          : isList
          ? 'bulletedlList'
          : (format as keyof typeof newProperties.type),
      };
    }

    //  set the nodes
    Transforms.setNodes<Element>(editor, newProperties);

    if (!isActive && isList) {
      Transforms.wrapNodes(editor, {
        type: format as keyof typeof newProperties.type,
        children: [],
      });
    }
  },
  isLinkNodeatSelection: (editor: Editor, selection: Selection) => {
    if (!selection) {
      return false;
    }
    const isLink = editorUtiliy.isBlockActive(editor, 'link');
    return isLink;
  },
};
export default editorUtiliy;
