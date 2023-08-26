import { CustomElement, ImageElement, LinkElement } from '@/types';
import { isHotkey } from 'is-hotkey';
import React from 'react';
import {
  Editor,
  Element,
  Transforms,
  Range,
  Path,
  Point,
  Selection,
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
          console.log(url);
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
          console.log(m);
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
  toggleLink: (editor: Editor, block: string) => {
    const { selection } = editor;
    ReactEditor.focus(editor);
    const isCollapsed = selection && Range.isCollapsed(selection);
    const isLinkActive = editorUtiliy.isBlock(editor, 'link');
    if (!selection) {
      editorUtiliy.InsertNode(editor, editorUtiliy.linkElement());
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
    editorUtiliy.wrapNodes(editor, editorUtiliy.linkElement());
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
    console.log(isLink);
    return isLink;
  },
};
export default editorUtiliy;
