import { Editor, Element, Point, Range, Transforms } from 'slate';

const withChecklists = (editor: Editor) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    const { selection } = editor;
    console.log('top');
    const blocktype = {
      '1': 'checkList',
      '2': 'blockQuote',
      '3': 'bulletedlList',
    };
    for (const m in blocktype) {
      if (selection && Range.isCollapsed(selection)) {
        const [match] = Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            n.type === blocktype[m as keyof typeof blocktype],
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
                n.type === blocktype[m as keyof typeof blocktype],
            });
            return;
          }
        }
      }
    }
    deleteBackward(...args);
  };

  return editor;
};

export default withChecklists;
