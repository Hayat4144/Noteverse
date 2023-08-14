import useEditorConfig from '@/hooks/useEditorConfig';
import { Editor } from 'slate';

const withImage = (editor: Editor) => {
  const { editorUtiliy } = useEditorConfig(editor);

  editor.insertData = (data) => {
    /* 
       DataTransfer =>https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
        The DataTransfer object is used to hold the data that is being dragged during a drag and drop operation. 
        It may hold one or more data items, each of one or more data types.
         For more information about drag and drop, see HTML Drag and Drop API. 
    
         DataTransfer.files
        Contains a list of all the local files available on the data transfer.
         If the drag operation doesn't involve dragging files, this property is an empty list.
*/
    const { files } = data;
    if (files && files.length > 0) {
      editorUtiliy.updloadImagehandler(editor, files);
    } else {
      editor.insertData(data);
    }
  };
  return editor;
};

export default withImage;
