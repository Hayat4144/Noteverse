import { Editor, Element, Point, Range, Transforms } from 'slate';

const withChecklists = (editor: Editor) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'checkList',
      });

      if (match) {
        const [, path] = match;
        const start = Editor.start(editor, path);

        if (Point.equals(selection.anchor, start)) {
          const newProperties: Partial<Element> = {
            type: 'paragraph',
          };
          Transforms.setNodes(editor, newProperties, {
            match: (n) =>
              !Editor.isEditor(n) &&
              Element.isElement(n) &&
              n.type === 'checkList',
          });
          return;
        }
      }
    }

    deleteBackward(...args);
  };

  return editor;
};

export default withChecklists;
