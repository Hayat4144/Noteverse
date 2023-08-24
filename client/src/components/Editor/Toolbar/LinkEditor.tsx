import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import editorUtiliy from '@/lib/editorUtility';
import React, { useEffect, useRef, useState } from 'react';
import { Editor, Element } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export default function LinkEditor() {
  const CardRef = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const [linkUrl, setlinkUrl] = useState('');
  const editorRef = useRef(editor.selection);

  useEffect(() => {
    const el = CardRef.current;
    const { selection } = editor;
    console.log(selection);
    if (!el) return;
    if (!selection) return;
    if (!editorUtiliy.isLinkNodeatSelection(editor, selection)) {
      el.removeAttribute('style');
      return;
    }
    const [match, _] = Editor.nodes(editor, {
      at: selection,
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });
    setlinkUrl(match[0].url);
    const domSelection = getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    if (rect) {
      el.style.opacity = '1';
      el.style.top = `${rect.bottom}px`; // Adjust the positioning as needed
      el.style.left = `${rect.left}px`;
    }
  });
  return (
    <div
      ref={CardRef}
      className="opacity-0 absolute z-50"
      // onMouseDown={(e) => e.preventDefault()}
    >
      <Card className="w-[22em] h-28 my-2  pt-2">
        <h3 className="px-2">Update link url</h3>
        <CardContent className="px-2 mt-3">
          <div className="flex w-full  items-center space-x-2">
            <input
              type="text"
              placeholder="Enter your url"
              value={linkUrl}
              onChange={(e) => {
                setlinkUrl(e.target.value);
                e.preventDefault()
              }}
            />
            <Button type="submit" variant={'default'}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
