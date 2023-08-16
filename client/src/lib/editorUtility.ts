import { ImageElement, LinkElement } from '@/types';
import { isHotkey } from 'is-hotkey';
import { Edit } from 'lucide-react';
import React from 'react';
import { Editor, Element, Transforms, Range, Path, Point } from 'slate';
import { ReactEditor } from 'slate-react';

const LIST_TYPES = ['numberList', 'bulletedList'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const editorUtiliy = {
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
        editorUtiliy.toggleMark(editor, markType);
      }
    }
  },
  isMarkActive: (editor: Editor, format: string) => {
    // Get the marks that would be added to text at the current selection.
    // return a null if no mark exist and if exist return object containing
    // mark with boolean value
    const mark = Editor.marks(editor) as { [key: string]: boolean };
    return mark ? mark[format] === true : false;
  },
  toggleMark: (editor: Editor, markType: string) => {
    const isActiveMark = editorUtiliy.isMarkActive(editor, markType);
    if (isActiveMark) {
      Editor.removeMark(editor, markType);
    } else {
      Editor.addMark(editor, markType, true);
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
  getSelectedBlock: (editor: Editor, block: string) => {
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
};
export default editorUtiliy;
