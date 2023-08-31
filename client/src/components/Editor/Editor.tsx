'use client';
import React, { useCallback, useMemo, useState } from 'react';
import useEditorConfig from '@/hooks/useEditorConfig';
import { withHistory } from 'slate-history';
import Toolbar from './Toolbar/Toolbar';
import HoveringToolbar from './Toolbar/HoveringToolbar';
import withImage from './Plugins/withImage';
import withChecklists from './Plugins/withChecklist';
import withShortcut from './Plugins/withShortcuts';
import { useToggle } from '@uidotdev/usehooks';
import EmojiPicker from './EmojiPicker';
import {
  createEditor,
  Element,
  Node,
  Range,
  Editor as SlateEditor,
} from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  ReactEditor,
} from 'slate-react';
import pipe from 'lodash/fp/pipe';
import withCodeblock from './Plugins/withCodeBlock';
import { initialValue } from '@/lib/constants';
import { isSelectionTable, withTables } from './Plugins/withTable';
import TableModal from './TableModal';
import { Button } from '../ui/button';

const createEditorWithPlugins = pipe(
  withReact,
  withHistory,
  withImage,
  withTables,
  withShortcut,
  withChecklists,
  withCodeblock,
);

const Editor = () => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const handleDOMBeforeInput = useCallback(
    (e: InputEvent) => {
      queueMicrotask(() => {
        const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

        const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
          if (!diff.text.endsWith(' ')) {
            return false;
          }

          const { text } = Node.leaf(editor, path);
          const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
          if (!(beforeText in editorUtiliy.MarkdownShortcut)) {
            return;
          }

          const blockEntry = SlateEditor.above(editor, {
            at: path,
            match: (n) =>
              Element.isElement(n) && SlateEditor.isBlock(editor, n),
          });
          if (!blockEntry) {
            return false;
          }

          const [, blockPath] = blockEntry;
          return SlateEditor.isStart(
            editor,
            SlateEditor.start(editor, path),
            blockPath,
          );
        });

        if (scheduleFlush) {
          ReactEditor.androidScheduleFlush(editor);
        }
      });
    },
    [editor],
  );
  const { RenderElements, renderLeaf, editorUtiliy } = useEditorConfig(editor);
  const [emojistring, setemojistring] = useState('');
  const [isEmojiOpen, setemojiToggle] = useToggle(false);
  const [emojiTargetRange, setEmojiTargetRange] = useState<Range>();
  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElements {...props} />,
    [],
  );
  const [isTableModal, tableModalToggle] = useToggle(false);
  const emojiPatternProps = {
    editor: editor,
    setEmoji: setemojistring,
    setEmojiToggle: setemojiToggle,
    setemojiTragetRange: setEmojiTargetRange,
  };

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={() => {
        editorUtiliy.detectEmojiPattern(emojiPatternProps);
        const { selection } = editor;
        if (selection && isSelectionTable(editor)) {
          tableModalToggle(true);
        }
      }}
    >
      <Toolbar />
      <Button onClick={(e) => tableModalToggle(!isTableModal)}>Table</Button>
      <HoveringToolbar />
      {isTableModal ? (
        <TableModal
          isTableModal={isTableModal}
          tableModalToggle={tableModalToggle}
        />
      ) : null}
      {isEmojiOpen ? (
        <EmojiPicker
          searchString={emojistring}
          emojiRange={emojiTargetRange}
          changeEmojiRange={setEmojiTargetRange}
        />
      ) : null}
      <Editable
        onDOMBeforeInput={handleDOMBeforeInput}
        style={{ outline: 'none' }}
        disableDefaultStyles
        renderElement={renderElement}
        onKeyDown={(e) => editorUtiliy.onkeydown(e, editor)}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export default Editor;
