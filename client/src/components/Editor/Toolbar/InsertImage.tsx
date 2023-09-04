import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ImageContent from '../ImageContent';

export default function InsertImage() {
  const [open, setopen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Popover open={open} onOpenChange={setopen}>
            <PopoverTrigger asChild>
              <Button className="h-8" size={'icon'} variant={'ghost'}>
                <Icons.image size={15} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-fit">
              <ImageContent setOpen={setopen} />
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>Insert Image</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
