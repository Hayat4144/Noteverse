import React, { useEffect, useRef } from 'react';
import { useFocused, useSlate } from 'slate-react';
import { Range, Element, Editor } from 'slate';
import { Icons } from '@/components/Icons';
import useEditorConfig from '@/hooks/useEditorConfig';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Marks {
  id: string;
  icon: React.ReactNode;
  mark: string;
  shortcut?: string;
}

export default function HoveringToolbar() {
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const inFocus = useFocused();
  const { editorUtiliy } = useEditorConfig(editor);

  const marks: Marks[] = [
    {
      id: '1',
      icon: <Icons.bold size={17} />,
      mark: 'bold',
      shortcut: 'ctrl+b',
    },
    {
      id: '2',
      icon: <Icons.Italic size={17} />,
      mark: 'italic',
      shortcut: 'ctrl+b',
    },
    {
      id: '3',
      icon: <Icons.underline size={17} />,
      mark: 'underline',
      shortcut: 'ctrl+u',
    },
    {
      id: '4',
      icon: <Icons.Superscript size={17} />,
      mark: 'superscript',
      shortcut: 'ctrl+s',
    },
    {
      id: '5',
      icon: <Icons.subscript size={17} />,
      mark: 'subscript',
      shortcut: 'ctrl+p',
    },
    {
      id: '6',
      icon: <Icons.strike size={17} />,
      mark: 'strike',
      shortcut: 'ctrl+shift+x',
    },
  ];

  useEffect(() => {
    const el = toolbarRef.current;
    const { selection } = editor;
    if (!el) return;
    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
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
  });
  return (
    <div
      onMouseDown={(e) => {
        // prevent toolbar from taking focus away from editor
        e.preventDefault();
      }}
      ref={toolbarRef}
      className="rounded-md z-10 -top[10000px]  bg-accent  opacity-0 -mt-2 -left[10000px] absolute transition-shadow border px-3 py-0 shadow-lg"
    >
      <div className="marks flex items-center justify-between space-x-1">
        {marks.map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="py-0"
                onClick={() => editorUtiliy.toggleMark(editor, item.mark)}
              >
                <Button variant="secondary" size={'sm'}>
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  <span className="capitalize">{item.mark}</span>
                  <span className="ml-1">{item.shortcut}</span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
