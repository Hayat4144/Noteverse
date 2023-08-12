import { Button } from '@/components/ui/button';
import useEditorConfig from '@/hooks/useEditorConfig';
import React, { Fragment } from 'react';
import { useSlate } from 'slate-react';

export default function Toolbar() {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <Fragment>
      <div className="flex items-center space-x-3 flex-wrap">
        <MarkButton format="bold"></MarkButton>
        <MarkButton format="italic"></MarkButton>
        <MarkButton format="underline"></MarkButton>
        <MarkButton format="subscript"></MarkButton>
        <MarkButton format="supscript"></MarkButton>
        <BlockButton format="heading"></BlockButton>
        <BlockButton format="paragraph"></BlockButton>
        <BlockButton format="headingTwo"></BlockButton>
        <BlockButton format="bulletedList"></BlockButton>
        <BlockButton format="numberList"></BlockButton> 
        <Button onClick={() => editorUtiliy.getSelectedBlock(editor, 'link')}>
          Link
        </Button>
      </div>
    </Fragment>
  );
}

const MarkButton = ({ format }: { format: string }) => {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <Button
      variant={
        editorUtiliy.isMarkActive(editor, format) ? 'secondary' : 'outline'
      }
      onMouseDown={(event) => {
        event.preventDefault();
        editorUtiliy.toggleMark(editor, format);
      }}
    >
      {format}
    </Button>
  );      
};

const BlockButton = ({ format }: { format: string }) => {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        editorUtiliy.toggleBlock(editor, format);
      }}
    >
      {format}
    </Button>
  );
};
