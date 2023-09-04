'use client';
import React, { Fragment, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import { useSlateStatic } from 'slate-react';
import Iconwithtext from '@/components/Iconwithtext';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import useEditorConfig from '@/hooks/useEditorConfig';
import { cn } from '@/lib/utils';

interface TurnIntoDropDownProps {
  blockType: string;
  isHooveringtoolbar?: boolean;
}
export interface BlockType {
  id: string;
  icon: React.ReactNode;
  type: string;
  lable: string;
  shortcut?: string;
}

export default function TurnIntoDropDown({
  blockType,
  isHooveringtoolbar = true,
}: TurnIntoDropDownProps) {
  const editor = useSlateStatic();
  const { editorUtiliy } = useEditorConfig(editor);
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
      id: '13',
      lable: 'Image',
      icon: <Icons.image size={20} />,
      type: 'image',
    },
    {
      id: '14',
      lable: 'Video',
      icon: <Icons.video size={20} />,
      type: 'Video',
    },
    {
      id: '15',
      lable: 'Table',
      icon: <Icons.table size={20} />,
      type: 'table',
    },
    {
      id: '16',
      lable: 'Mention',
      icon: <Icons.mention size={20} />,
      type: 'mention',
    },
    {
      id: '18',
      lable: 'Badge',
      icon: <Icons.badge size={20} />,
      type: 'badge',
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
  const [open, setOpen] = React.useState(false);
  const [selectedBlock, setselectedBlock] = useState('');
  React.useEffect(() => {
    const selectedBlockLabel =
      blockTypes.find((block) => block.type === blockType)?.lable || '';
    setselectedBlock(selectedBlockLabel);
  }, [blockType, blockTypes]);

  return (
    <Fragment>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="py-0">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                onClick={(e) => e.preventDefault()}
                className="mr-2 hover:dark:bg-[#3b3b40 hover:bg-accent"
                asChild
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className={`${
                    isHooveringtoolbar
                      ? 'hover:dark:bg-[#3b3b40] rounded-none mx-0 space-x-1'
                      : 'rounded-md space-x-2'
                  }`}
                >
                  <span> {selectedBlock}</span>
                  {open ? (
                    <Icons.chevronUp size={16} className="translate-y-1" />
                  ) : (
                    <Icons.chevronDown size={16} className="translate-y-1" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[13em]" align="start">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {blockTypes.map((block) => (
                        <CommandItem
                          key={block.id}
                          value={block.type}
                          onMouseDown={() => {
                            editorUtiliy.toggleBlock(editor, block.type);
                            setOpen(false);
                          }}
                        >
                          {blockType === block.type ? (
                            <Iconwithtext
                              icons={block.icon}
                              className="space-x-3"
                              text={block.lable}
                            />
                          ) : null}
                          {blockType !== block.type ? (
                            <Iconwithtext
                              icons={block.icon}
                              className="space-x-3"
                              text={block.lable}
                            />
                          ) : null}
                          <Icons.check
                            className={cn(
                              'ml-auto h-4 w-4',
                              selectedBlock === block.lable
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent className="mb-1">Turn into</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Fragment>
  );
}
