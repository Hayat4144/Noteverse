import React, { useEffect, useRef, useState } from 'react';
import Portal from '../Portal';
import { useSlate } from 'slate-react';
import { BaseSelection } from 'slate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/Icons';
import editorUtiliy from '@/lib/editorUtility';
import Iconwithtext from '../Iconwithtext';
import { ScrollArea } from '../ui/scroll-area';

interface CommandMenuProps {
  isCommandMenu: boolean;
  CommandMenuToggle: (value: boolean) => void;
}

export interface BlockType {
  id: string;
  icon: React.ReactNode;
  type: string;
  lable: string;
}
const blockTypes: BlockType[] = [
  {
    id: '1',
    icon: <Icons.heading1 size={20} />,
    type: 'paragraph',
    lable: 'Paragraph',
  },
  {
    id: '2',
    icon: <Icons.heading1 size={20} />,
    type: 'heading',
    lable: 'Heading 1',
  },
  {
    id: '3',
    lable: 'Heading 2',
    icon: <Icons.heading2 size={20} />,
    type: 'headingTwo',
  },
  {
    id: '4',
    lable: 'Heading 3',
    icon: <Icons.heading3 size={20} />,
    type: 'headingThree',
  },
  {
    id: '5',
    lable: 'Heading 4',
    icon: <Icons.heading4 size={20} />,
    type: 'headingFour',
  },
  {
    id: '6',
    lable: 'Heading 5',
    icon: <Icons.heading5 size={20} />,
    type: 'headingFive',
  },
  {
    id: '7',
    lable: 'Heading 6',
    icon: <Icons.heading6 size={20} />,
    type: 'headingSix',
  },
  {
    id: '8',
    lable: 'codeblock',
    icon: <Icons.code size={20} />,
    type: 'code-block',
  },
  {
    id: '9',
    lable: 'Inline code',
    icon: <Icons.code size={20} />,
    type: 'code-line',
  },
  {
    id: '10',
    lable: 'Bullet List',
    icon: <Icons.list size={20} />,
    type: 'bulletedlList',
  },
  {
    id: '11',
    lable: 'Number List',
    icon: <Icons.numberList size={20} />,
    type: 'numberList',
  },
  {
    id: '12',
    lable: 'Quote',
    icon: <Icons.quote size={20} />,
    type: 'blockQuote',
  },
  {
    id: '19',
    lable: 'Link',
    icon: <Icons.link size={20} />,
    type: 'link',
  },
  {
    id: '20',
    lable: 'Check List',
    icon: <Icons.task size={20} />,
    type: 'checkList',
  },
];

export default function CommandMenu({
  isCommandMenu,
  CommandMenuToggle,
}: CommandMenuProps) {
  const CommandMenuRef = useRef<HTMLDivElement | null>(null);
  const [originalSelection, setOriginalSelection] =
    useState<BaseSelection | null>(null);
  const editor = useSlate();
  useEffect(() => {
    const { selection } = editor;
    const el = CommandMenuRef.current;
    if (!el || !selection || !isCommandMenu) {
      el?.removeAttribute('style');
      return;
    }
    const domSelection = getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    if (rect) {
      el.style.opacity = '1';
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${rect.left}px`;
    }
  }, [editor, isCommandMenu]);
  useEffect(() => {
    if (isCommandMenu) {
      setOriginalSelection(editor.selection);
      const x = window.scrollX;
      const y = window.scrollY;
      window.scrollTo(x, y);
    }
  }, [editor, isCommandMenu]);
  return (
    <Portal>
      <div
        ref={CommandMenuRef}
        className="absolute opacity-0 -left-[10000px] -top-[10000px]"
      >
        <DropdownMenu open={isCommandMenu} onOpenChange={CommandMenuToggle}>
          <DropdownMenuTrigger></DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <ScrollArea className="h-56">
              <DropdownMenuLabel>Basic blocks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {blockTypes.map((block) => (
                <DropdownMenuItem
                  key={block.id}
                  onMouseDown={() => {
                    editorUtiliy.toggleBlock(editor, block.type);
                    editorUtiliy.emptyNode(editor);
                  }}
                >
                  <Iconwithtext
                    icons={block.icon}
                    className="space-x-3"
                    text={block.lable}
                  />
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Portal>
  );
}
