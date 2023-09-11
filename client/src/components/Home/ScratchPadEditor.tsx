'use client';
import React, { useCallback, useMemo } from 'react';
import {
  DefaultElement,
  Editable,
  RenderElementProps,
  Slate,
  withReact,
} from 'slate-react';
import { Descendant, createEditor } from 'slate';
import pipe from 'lodash/fp/pipe';
import { withHistory } from 'slate-history';
import withShortcut from '@/components/Editor/Plugins/withShortcuts';
import renderLeaf from '../Editor/RenderLeaf';
import editorUtiliy from '@/lib/editorUtility';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
const createEditorWithPlugins = pipe(withReact, withHistory, withShortcut);

const ScratchPadEditor = () => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const renderElement = useCallback(
    (props: RenderElementProps) => <DefaultElement {...props} />,
    [],
  );
  return (
    <Slate initialValue={initialValue} editor={editor}>
      <Editable
        style={{ outline: 'none' }}
        disableDefaultStyles
        renderLeaf={renderLeaf}
        spellCheck={false}
        placeholder="write your idea"
        renderElement={renderElement}
        onKeyDown={(e) => editorUtiliy.onkeydown(e, editor)}
      />
    </Slate>
  );
};

export default ScratchPadEditor;
