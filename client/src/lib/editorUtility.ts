import { isHotkey } from 'is-hotkey';
import React from 'react';
import { Editor, Element, Transforms } from 'slate';

const LIST_TYPES = ['numberList', 'bulletedList'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const editorUtiliy = {
  HOT_KEYS: {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
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
