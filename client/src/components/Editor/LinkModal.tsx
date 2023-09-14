import React, { useCallback, useEffect, useRef, useState } from 'react';
import Portal from '../Portal';
import { ReactEditor, useSlate } from 'slate-react';
import { BaseSelection } from 'slate';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Icons } from '../Icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import editorUtiliy from '@/lib/editorUtility';

interface LinkModalProps {
  isLinkModal: boolean;
  linkModalToggle: (value: boolean) => void;
}
export default function LinkModal({
  isLinkModal,
  linkModalToggle,
}: LinkModalProps) {
  const editor = useSlate();
  const [originalSelection, setOriginalSelection] =
    useState<BaseSelection | null>(null);
  const linkRef = useRef<HTMLDivElement | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [linkUrl, setlinkUrl] = useState('');

  const actionHandler = useCallback(
    (e: any) => {
      if (linkRef.current && !linkRef.current.contains(e.target)) {
        linkModalToggle(false);
      }
    },
    [isLinkModal, linkRef],
  );

  useEffect(() => {
    if (isLinkModal && linkRef.current) {
      setOriginalSelection(editor.selection);
      const x = window.scrollX;
      const y = window.scrollY;
      linkRef.current.focus();
      window.scrollTo(x, y);
    }
  }, [editor, isLinkModal]);

  useEffect(() => {
    document.addEventListener('mousedown', actionHandler);
    document.addEventListener('keydown', actionHandler);
    return () => {
      document.removeEventListener('mousedown', actionHandler);
      document.removeEventListener('keydown', actionHandler);
    };
  }, [actionHandler]);

  useEffect(() => {
    const { selection } = editor;
    const el = linkRef.current;
    if (!el || !selection || !isLinkModal) {
      el?.removeAttribute('style');
      return;
    }
    const domRange = ReactEditor.toDOMRange(editor, selection);
    const rect = domRange.getBoundingClientRect();
    const linkBlock = editorUtiliy.getBlock(editor, 'link');
    setlinkUrl((linkBlock[0] as any).url);
    const CARET_TOP_OFFSET = 15;
    el.style.opacity = '1';
    el.style.top = `${
      rect.top + rect.height + window.pageYOffset + CARET_TOP_OFFSET
    }px`;
    let calPos = rect.left - el.offsetWidth / 2;

    // calculate the endpoint of the modal
    const rightEndPos = calPos + el.offsetWidth;
    const containerWidth = el.parentElement.offsetWidth;

    // When the modal goes off the page from right side
    if (rightEndPos > containerWidth) {
      let diff = rightEndPos - containerWidth;
      // extra space of 10px on right side to look clean
      diff += 10;
      calPos -= diff;
      const shift = diff - 5;
    }

    el.style.left = `${calPos}px`;
  }, [isLinkModal, editor]);

  const removeLink = () => {
    editorUtiliy.removeLink(editor);
    linkModalToggle(false);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(linkUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  return (
    <Portal>
      <div
        ref={linkRef}
        className="absolute opacity-0 -left-[10000px] -top-[10000px]"
      >
        <Card className="w-fit">
          <CardContent className="px-3 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editorUtiliy.updateLink(editor, linkUrl);
                linkModalToggle(false);
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    placeholder="Enter your link"
                    value={linkUrl}
                    type="text"
                    onChange={(e) => setlinkUrl(e.target.value)}
                  />
                </div>
                <Button>Submit</Button>
              </div>
            </form>
            <div className="my-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} onClick={copyLink}>
                      {linkCopied ? (
                        <Icons.check size={17} className="text-green-700" />
                      ) : (
                        <Icons.copy size={17} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy link</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      onClick={removeLink}
                    >
                      <Icons.trash
                        size={16}
                        className="text-red-600 hover:text-red-700"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete link</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      onClick={() => window.open(linkUrl, '_blank')}
                    >
                      <Icons.openTab size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Open link in new tab</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </Portal>
  );
}
