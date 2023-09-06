import React from 'react';
import { Button } from '@/components/ui/button';
import editorUtiliy from '@/lib/editorUtility';
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
import { colorArray } from './ColorModal';
import Iconwithtext from '@/components/Iconwithtext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TextColorHighlightProps {
  format: string;
  icon: React.ReactNode;
  tooltipContent: string;
}

export default function TextColorHighlight({
  format,
  icon,
  tooltipContent,
}: TextColorHighlightProps) {
  const editor = useSlate();
  const [open, setOpen] = React.useState(false);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={
                  editorUtiliy.isMarkActive(editor, format)
                    ? 'secondary'
                    : 'ghost'
                }
                size={'icon'}
                className="h-8"
              >
                {icon}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <ScrollArea className="h-72">
                <DropdownMenuLabel className="capitalize">
                  {format}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="capitalize"
                  onMouseDown={(e) => {
                    setOpen(false);
                    editorUtiliy.toggleMark(editor, format, false);
                  }}
                >
                  Remove {format}
                </DropdownMenuItem>
                {colorArray.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onMouseDown={() => {
                      setOpen(false);
                      editorUtiliy.toggleMark(editor, format, item.value);
                    }}
                  >
                    <Iconwithtext
                      icons={item.icon}
                      className="space-x-3 capitalize"
                      text={item.value}
                    />
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent className="capitalize">{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
