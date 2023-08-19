import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useEditorConfig from '@/hooks/useEditorConfig';
import { Marks } from './HoveringToolbar';
import { useSlate } from 'slate-react';

interface MarkButtonsProps {
  item: Marks;
}

export default function MarkButtons({ item }: MarkButtonsProps) {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          
          onClick={() => editorUtiliy.toggleMark(editor, item.mark)}
        >
          <Button
            variant={'ghost'}
            size={'sm'}
            className="hover:dark:bg-[#3b3b40] rounded-none"
          >
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
  );
}
