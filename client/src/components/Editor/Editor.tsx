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
  Operation,
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
import LinkModal from './LinkModal';
import withLink from './Plugins/withLink';
import CommandMenu from './CommandMenu';
import withHeading from './Plugins/withHeading';
import saveNoteBookContent from '@/service/saveNotebookContent';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

const createEditorWithPlugins = pipe(
  withReact,
  withHistory,
  withImage,
  withTables,
  withShortcut,
  withLink,
  withChecklists,
  withCodeblock,
  withHeading,
);

interface EditorProps {
  data: {
    id: string;
    content: any;
    title: string;
  };
}

const Editor = ({ data }: EditorProps) => {
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
  const session = useSession();
  const { id } = useParams();
  const [isCommandMenu, toggleCommandMenu] = useToggle(false);
  const [isTableModal, tableModalToggle] = useToggle(false);
  const [isLinkModal, linkModalToggle] = useToggle(false);
  const emojiPatternProps = {
    editor: editor,
    setEmoji: setemojistring,
    setEmojiToggle: setemojiToggle,
    setemojiTragetRange: setEmojiTargetRange,
  };

  const editorValue = useMemo(() => data.content || initialValue, []);

  return (
    <Slate
      editor={editor}
      initialValue={editorValue}
      onChange={async (Value) => {
        const { selection } = editor;
        editorUtiliy.detectCommandMenuPattern(editor, toggleCommandMenu);
        editorUtiliy.detectEmojiPattern(emojiPatternProps);
        if (selection && isSelectionTable(editor)) {
          tableModalToggle(true);
        }
        if (
          selection &&
          editorUtiliy.isLinkNodeatSelection(editor, selection)
        ) {
          linkModalToggle(true);
        }
        editorUtiliy.identifyLinksInTextIfAny(editor);
        const isAstChange = editor.operations.some(
          (op: Operation) => 'set_selection' !== op.type,
        );
        if (isAstChange) {
          const { error } = await saveNoteBookContent(
            session.data?.user.AccessToken,
            id,
            Value,
          );
          if (error) {
            toast({ title: error, variant: 'destructive' });
          }
        }
      }}
    >
      <Toolbar tableModalToggle={tableModalToggle} isTable={isTableModal} />
      <HoveringToolbar />
      {isCommandMenu ? (
        <CommandMenu
          CommandMenuToggle={toggleCommandMenu}
          isCommandMenu={isCommandMenu}
        />
      ) : null}
      {isTableModal ? (
        <TableModal
          isTableModal={isTableModal}
          tableModalToggle={tableModalToggle}
        />
      ) : null}
      {isLinkModal ? (
        <LinkModal
          isLinkModal={isLinkModal}
          linkModalToggle={linkModalToggle}
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
        className="mt-24 px-5"
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
