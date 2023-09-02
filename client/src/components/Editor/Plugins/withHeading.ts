import { headings } from '@/lib/constants';
import { Editor, Transforms } from 'slate';

const withHeading = (editor: Editor) => {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection) {
      const [currentNode] = Editor.parent(editor, selection);
      const isHeadingblock = headings.includes((currentNode as any).type);
      if (!isHeadingblock) return insertBreak();
      insertBreak();
      Transforms.setNodes(editor, {
        type: 'paragraph',
        children: [{ text: ' ' }],
      });
    } else {
      insertBreak();
    }
  };

  return editor;
};

export default withHeading;
