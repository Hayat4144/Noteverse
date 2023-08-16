import editorUtiliy from '@/lib/editorUtility';
import { BullitedListElement, NumberListElement } from '@/types';
import { Editor, Element, Range, string, Transforms } from 'slate';

const withShortcut = (editor: Editor) => {
  const { insertText } = editor;
  editor.insertText = (text) => {
    const { selection } = editor;
    if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range) + text.slice(0, -1);
      const blockType =
        editorUtiliy.MarkdownShortcut[beforeText as keyof typeof string];
      if (blockType) {
        Transforms.select(editor, range);
        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }
        const newProperties: Partial<Element> = {
          type: blockType,
        };

        if (blockType === 'numberList') {
          const listProperties: BullitedListElement = {
            type: 'bulletedlList',
            children: [],
          };
          Transforms.setNodes<Element>(editor, listProperties, {
            match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
          });
          const NumberlistElement: NumberListElement = {
            type: 'numberList',
            children: [],
          };
          editorUtiliy.wrapNodes(
            editor,
            NumberlistElement,
            true,
            'bulletedlList',
          );
        } else if (blockType === 'link') {
          const linkElement = editorUtiliy.linkElement();
          Transforms.insertNodes(editor, linkElement, { at: selection });
          Transforms.move(editor, {
            distance: 2,
            unit: 'word',
            reverse: false,
          });
        } else {
          Transforms.setNodes<Element>(editor, newProperties, {
            match: (n) => Element.isElement(n),
          });
        }
        return;
      }
    }
    insertText(text);
  };
  return editor;
};

export default withShortcut;
