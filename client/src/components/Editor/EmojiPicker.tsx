'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSlate } from 'slate-react';
import { Range } from 'slate';
import { findEmojis } from '@/lib/utils';
import { Button } from '../ui/button';
import editorUtiliy from '@/lib/editorUtility';
import { TypographyH5 } from '../ui/Heading';

interface EmojiPickerProps {
  searchString: string;
  emojiRange: Range | undefined;
  changeEmojiRange: (value: undefined) => void;
}

export default function EmojiPicker({
  searchString,
  emojiRange,
  changeEmojiRange,
}: EmojiPickerProps) {
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const [emojis, setemojis] = useState([]);
  const editor = useSlate();
  const { insertEmoji } = editorUtiliy;

  if (!emojiRange) {
    return null;
  }
  useEffect(() => {
    const el = emojiRef.current;
    const { selection } = editor;
    if (!el || !selection || !Range.isCollapsed(selection)) return;
    const domSelection = getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    if (rect) {
      el.style.opacity = '1';
      el.style.top = `${rect.bottom}px`;
      el.style.left = `${rect.left}px`;
    }
  });

  useEffect(() => {
    const fetchEmojis = async (search: string) => {
      const getEmojis = await findEmojis(search);
      setemojis(getEmojis);
    };
    fetchEmojis(searchString);
  }, [searchString]);

  return (
    <Fragment>
      <div
        ref={emojiRef}
        className="absolute z-50 opacity-0 bg-background border shadow-md rounded-md px-2 
        max-h-72 overflow-y-auto w-80 py-2"
      >
        {emojis.length < 1 ? (
          <Fragment>
            <TypographyH5 className="text-center">
              No emojis has found
            </TypographyH5>
          </Fragment>
        ) : (
          emojis.map((item: any) => (
            <Button
              key={item.id}
              size={'icon'}
              onMouseDown={(e) => e.preventDefault()}
              variant={'ghost'}
              onClick={() => {
                insertEmoji(editor, emojiRange, item.native);
                changeEmojiRange(undefined);
              }}
            >
              {item.native}
            </Button>
          ))
        )}
      </div>
    </Fragment>
  );
}
