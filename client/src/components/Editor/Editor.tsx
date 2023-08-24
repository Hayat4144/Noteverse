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
  Descendant,
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
  RenderPlaceholderProps,
} from 'slate-react';

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
    type: 'heading',
    children: [{ text: 'This is heading 1' }],
  },
  {
    type: 'headingTwo',
    children: [{ text: 'This is heading 2' }],
  },
  {
    type: 'headingThree',
    children: [{ text: 'This is heading 3' }],
  },
  {
    type: 'headingFour',
    children: [{ text: 'This is heading 4' }],
  },
  {
    type: 'headingFive',
    children: [{ text: 'This is heading 5' }],
  },
  {
    type: 'headingSix',
    children: [{ text: 'This is heading 6' }],
  },
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
    type: 'checkList',
    checked: false,
    children: [{ text: 'learn typescript in 1 on shot' }],
  },

  {
    type: 'checkList',
    checked: false,
    children: [{ text: 'work on yourself' }],
  },
  {
    type: 'checkList',
    checked: true,
    children: [{ text: 'Watch openhiemer movie' }],
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
  {
    type: 'blockQuote',
    children: [{ text: 'works everyday for your future' }],
  },
];

const Editor = () => {
  const editor = useMemo(
    () =>
      withShortcut(
        withChecklists(withImage(withReact(withHistory(createEditor())))),
      ),
    [],
  );
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
      }}
    >
      <Toolbar />
      <HoveringToolbar />
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
        renderPlaceholder={RenderPlaceholder}
        disableDefaultStyles
        renderElement={renderElement}
        onKeyDown={(e) => editorUtiliy.onkeydown(e, editor)}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export default Editor;

const RenderPlaceholder = (props: RenderPlaceholderProps) => {
  return (
    <span
      contentEditable={false}
      data-slate-placeholder={true}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {props.children}
    </span>
  );
};
