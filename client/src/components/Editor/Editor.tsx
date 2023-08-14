'use client';
import React, { Children, useCallback, useMemo } from 'react';
import { createEditor, Descendant, Editor as SlateEditor } from 'slate';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import useEditorConfig from '@/hooks/useEditorConfig';
import { withHistory } from 'slate-history';
import Toolbar from './Toolbar/Toolbar';
import HoveringToolbar from './Toolbar/HoveringToolbar';
import withImage from './Plugins/withImage';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'There are two ways to add links. You can either add a link via the toolbar icon above or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.',
      },
      {
        type: 'link',
        url: 'https://www.smashingmagazine.com/2020/05/building-wysiwyg-editor-javascript-slatejs/',
        children: [{ text: 'click here ' }],
      },
      {
        text: ',hello',
      },
    ],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/zOwZKwZOZq8',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'write something here' }],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/kFrdX5IeQzI',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'write something here' }],
  },
  {
    type: 'heading',
    children: [
      { text: 'Here is the examples of the image rendering in slate js' },
    ],
  },
];

const Editor = () => {
  const editor = useMemo(
    () => withImage(withReact(withHistory(createEditor()))),
    [],
  );
  const { RenderElements, renderLeaf, editorUtiliy } = useEditorConfig(editor);

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElements {...props} />,
    [],
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar />
      <HoveringToolbar />
      <Editable
        style={{ outline: 'none' }}
        placeholder="write something here"
        disableDefaultStyles
        renderElement={renderElement}
        onKeyDown={(e) => editorUtiliy.onkeydown(e, editor)}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export default Editor;
