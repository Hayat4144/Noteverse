import React, { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import Iconwithtext from '@/components/Iconwithtext';
import { useSlate } from 'slate-react';
import editorUtiliy from '@/lib/editorUtility';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const colorArray: ColorsBackground[] = [
  {
    id: '1',
    icon: <Icons.color size={20} color="red" />,
    value: 'red',
  },
  {
    id: '2',
    icon: <Icons.color size={20} color="yellow" />,
    value: 'yellow',
  },
  {
    id: '3',
    icon: <Icons.color size={20} color="indigo" />,
    value: 'Indigo',
  },
  {
    id: '4',
    icon: <Icons.color size={20} color="orange" />,
    value: 'orange',
  },
  {
    id: '5',
    icon: <Icons.color size={20} color="gray" />,
    value: 'gray',
  },
  {
    id: '6',
    icon: <Icons.color size={20} color="purple" />,
    value: 'purple',
  },
  {
    id: '7',
    icon: <Icons.color size={20} color="green" />,
    value: 'green',
  },
  {
    id: '8',
    icon: <Icons.color size={20} color="brown" />,
    value: 'brown',
  },
  {
    id: '9',
    icon: <Icons.color size={20} color="pink" />,
    value: 'pink',
  },
  {
    id: '10',
    icon: <Icons.color size={20} color="blue" />,
    value: 'blue',
  },
];

export interface ColorsBackground {
  id: string;
  icon: React.ReactNode;
  value: string;
}

export default function ColorModal() {
  const [open, setOpen] = React.useState(false);
  const editor = useSlate();
  return (
    <Fragment>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                onClick={(e) => e.preventDefault()}
                className="mr-2 hover:dark:bg-[#3b3b40 hover:bg-accent"
                asChild
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className="hover:dark:bg-[#3b3b40] rounded-none mx-0"
                >
                  <Icons.color size={17} />
                  <Icons.chevronDown size={17} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[15em]" align="start">
                <ScrollArea className="h-72">
                  <DropdownMenuLabel>Color</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      editorUtiliy.toggleMark(editor, 'color', false);
                      setOpen(false);
                    }}
                  >
                    <Iconwithtext
                      icons={<Icons.text size={20} />}
                      text="Default"
                    />
                  </DropdownMenuItem>
                  {colorArray.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onMouseDown={() => {
                        setOpen(false);
                        editorUtiliy.toggleMark(editor, 'color', item.value);
                      }}
                    >
                      <Iconwithtext
                        icons={item.icon}
                        className="space-x-3 capitalize"
                        text={item.value}
                      />
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Background Color</DropdownMenuLabel>
                  <DropdownMenuItem
                    onMouseDown={(e) => {
                      editorUtiliy.toggleMark(editor, 'highlight', false);
                      setOpen(false);
                    }}
                  >
                    <Iconwithtext
                      icons={<Icons.text size={20} />}
                      text="Default"
                    />
                  </DropdownMenuItem>
                  {colorArray.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onMouseDown={() => {
                        setOpen(false);
                        editorUtiliy.toggleMark(
                          editor,
                          'highlight',
                          item.value,
                        );
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
          <TooltipContent>Text Color</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Fragment>
  );
}
