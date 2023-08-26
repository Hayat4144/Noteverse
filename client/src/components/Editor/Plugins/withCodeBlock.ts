import editorUtiliy from '@/lib/editorUtility';
import { Editor, Transforms } from 'slate';

const withCodeblock = (editor: Editor) => {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const isCodeBlock = editorUtiliy.isBlock(editor, 'code-block');
    if (isCodeBlock) {
      Transforms.insertText(editor, '\n');
    } else {
      insertBreak();
    }
  };
  return editor;
};

export default withCodeblock;
