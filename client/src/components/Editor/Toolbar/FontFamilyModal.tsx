import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { FontFamilies } from '@/lib/constants';
import editorUtiliy from '@/lib/editorUtility';
import { useSlate } from 'slate-react';

export default function FontFamilyModal() {
  const [open, setOpen] = React.useState(false);
  const editor = useSlate();
  const [currentFont, setCurrentFont] = useState('Roboto');
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
                <Button variant={'ghost'} size={'sm'} className="space-x-3">
                  <span>{currentFont}</span>
                  {open ? (
                    <Icons.chevronUp size={16} className="translate-y-1" />
                  ) : (
                    <Icons.chevronDown size={16} className="translate-y-1" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit">
                <DropdownMenuItem
                  onMouseDown={(e) => {
                    setOpen(false);
                    setCurrentFont('Roboto');
                    editorUtiliy.toggleMark(editor, 'fontFamily', false);
                  }}
                >
                  Remove fontFamily
                </DropdownMenuItem>
                {FontFamilies.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onMouseDown={() => {
                      setOpen(false);
                      setCurrentFont(item.name);
                      editorUtiliy.toggleMark(
                        editor,
                        'fontFamily',
                        `${item.name},${item.category}`,
                      );
                    }}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent className="mb-1">Fonts</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Fragment>
  );
}
