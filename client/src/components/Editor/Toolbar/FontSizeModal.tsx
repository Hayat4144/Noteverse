import React, { Fragment, useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import editorUtiliy from '@/lib/editorUtility';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from '@/components/Icons';
import Iconwithtext from '@/components/Iconwithtext';
import { Input } from '@/components/ui/input';
import { number } from 'zod';
import { fonts } from '@/lib/constants';

interface FontSizeProps {
  format: string;
}

export default function FontSizeModal({ format }: FontSizeProps) {
  const editor = useSlate();
  const [fontSize, setfontSize] = useState<number>(11);
  const [open, setOpen] = React.useState(false);

  const decreaseFontSize = () => {
    if (fontSize > 11) {
      setfontSize((state) => state - 1);
      editorUtiliy.toggleMark(editor, format, `${fontSize - 1}px`);
    }
  };
  const increaseFontSize = () => {
    setfontSize((state) => state + 1);
    editorUtiliy.toggleMark(editor, format, `${fontSize + 1}px`);
  };

  return (
    <Fragment>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'icon'}
              variant={'ghost'}
              className="h-8 disabled:cursor-not-allowed"
              disabled={fontSize === 11 ? true : false}
              onClick={decreaseFontSize}
            >
              <Icons.minus size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Decrease font size</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'} className="h-8">
                  {fontSize}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit">
                {fonts.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    onMouseDown={() => {
                      setOpen(false);
                      editorUtiliy.toggleMark(
                        editor,
                        format,
                        `${item.value}px`,
                      );
                    }}
                  >
                    {item.value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent className="capitalize"> Font size</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={'icon'}
              variant={'ghost'}
              className="h-8"
              onClick={increaseFontSize}
            >
              <Icons.add size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Increase font size</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Fragment>
  );
}
