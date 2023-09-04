import React from 'react';
import { Button } from '@/components/ui/button';
import editorUtiliy from '@/lib/editorUtility';
import { useSlate } from 'slate-react';
import { Icons } from '@/components/Icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function InsertLink() {
  const editor = useSlate();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() =>
              editorUtiliy.toggleLink(
                editor,
                'http://www.google.com',
                'click here',
              )
            }
          >
            <Icons.link size={15} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Insert Link</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
