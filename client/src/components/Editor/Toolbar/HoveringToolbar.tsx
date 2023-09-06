import React, { useEffect, useRef, useState } from 'react';
import { useSlate } from 'slate-react';
import { Range, Editor } from 'slate';
import { Icons } from '@/components/Icons';
import useEditorConfig from '@/hooks/useEditorConfig';
import Portal from '@/components/Portal';
import MarkButtons from './MarkButtons';
import TurnIntoDropDown from './TurnIntoDropDown';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import Iconwithtext from '@/components/Iconwithtext';
import ColorModal from './ColorModal';
import TextColorHighlight from './TextColor';

export interface Marks {
  id: string;
  icon: React.ReactNode;
  mark: string;
  shortcut?: string;
}

export default function HoveringToolbar() {
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  const [blocktype, setblocktype] = useState('paragraph');
  const { selection } = editor;

  const marks: Marks[] = [
    {
      id: '1',
      icon: <Icons.bold size={17} />,
      mark: 'bold',
      shortcut: '(Ctrl+B)',
    },
    {
      id: '2',
      icon: <Icons.Italic size={17} />,
      mark: 'italic',
      shortcut: '(Ctrl+I)',
    },
    {
      id: '3',
      icon: <Icons.underline size={17} />,
      mark: 'underline',
      shortcut: '(Ctrl+U)',
    },
    {
      id: '4',
      icon: <Icons.Superscript size={17} />,
      mark: 'superscript',
      shortcut: '(Ctrl+Shift+P)',
    },
    {
      id: '5',
      icon: <Icons.subscript size={17} />,
      mark: 'subscript',
      shortcut: '(Ctrl+Shift+B)',
    },
    {
      id: '6',
      icon: <Icons.strike size={17} />,
      mark: 'strike',
      shortcut: '(Ctrl+Shift+X)',
    },
  ];

  useEffect(() => {
    const el = toolbarRef.current;
    const { selection } = editor;
    if (!el) return;
    if (
      !selection ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }
    const blocktype = editorUtiliy.gettextBlockStyle(editor);
    if (blocktype) {
      setblocktype(blocktype);
    }
    const domSelection = getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    if (rect) {
      el.style.opacity = '1';
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
      }px`;
    }
  }, [blocktype, selection]);
  return (
    <Portal>
      <div
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        ref={toolbarRef}
        className="rounded-md z-50 -top[10000px] opacity-0 -mt-2
      -left[10000px] absolute dark:bg-secondary transition-shadow
      border py-0 object-fill overflow-hidden bg-background"
      >
        <div className="marks flex items-center h-8">
          <TurnIntoDropDown blockType={blocktype} />
          <Separator orientation="vertical" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="mx-0"
                onClick={() => {
                  const url = 'http://www.google.com';
                  editorUtiliy.toggleLink(editor, url, 'click here');
                }}
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className="hover:dark:bg-[#3b3b40] rounded-none mx-0"
                >
                  <Iconwithtext
                    icons={<Icons.link size={15} />}
                    text="Link"
                    className="w-full"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" />
          {marks.map((item) => (
            <MarkButtons item={item} key={item.id} />
          ))}
          <ColorModal />
          <TextColorHighlight
            format="highlight"
            tooltipContent="Highlight text"
            icon={<Icons.highlight size={15} />}
          />
        </div>
      </div>
    </Portal>
  );
}
