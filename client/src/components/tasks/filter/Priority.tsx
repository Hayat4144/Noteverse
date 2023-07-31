import { Icons } from '@/components/Icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch } from '@/hooks';
import { cn } from '@/lib/utils';
import { TaskPriority } from '@/types';
import React, { Fragment, useState } from 'react';

interface PriorityProps {
  filterId: string;
  field: string;
}

export default function Priority({ filterId, field }: PriorityProps) {
  const [seletectedPriority, setseletectedPriority] = useState<string | null>(
    null,
  );
  const dispatch = useAppDispatch();

  const handlePriorityChange = (priority: string) => {
    dispatch({
      type: ActionTypes.addFilter,
      payload: { id: filterId, field, value: priority },
    });
  };

  return (
    <Fragment>
      <Command>
        <CommandInput placeholder="Priority" />
        <CommandList>
          <CommandEmpty>No option is found</CommandEmpty>
          <CommandGroup>
            <CommandItem
              key={TaskPriority.Low}
              onSelect={(value) => {
                const state = value.charAt(0).toUpperCase() + value.slice(1);
                setseletectedPriority(state);
                handlePriorityChange(state);
              }}
            >
              <div
                className={cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  seletectedPriority === TaskPriority.Low
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )}
              >
                <Icons.check className={cn('h-4 w-4')} />
              </div>
              <Icons.chevronDown
                size={20}
                className="mr-2 h-4 w-4 text-muted-foreground font-bold"
              />
              {TaskPriority.Low}
            </CommandItem>
            <CommandItem
              key={TaskPriority.Medium}
              onSelect={(value) => {
                const state = value.charAt(0).toUpperCase() + value.slice(1);
                setseletectedPriority(state);
                handlePriorityChange(state);
              }}
            >
              <div
                className={cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  seletectedPriority === TaskPriority.Medium
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )}
              >
                <Icons.check className={cn('h-4 w-4')} />
              </div>
              <Icons.chevronRight
                size={18}
                className="mr-2 h-4 w-4 text-muted-foreground"
              />
              {TaskPriority.Medium}
            </CommandItem>
            <CommandItem
              key={TaskPriority.High}
              onSelect={(value) => {
                const state = value.charAt(0).toUpperCase() + value.slice(1);
                setseletectedPriority(state);
                handlePriorityChange(state);
              }}
            >
              <div
                className={cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  seletectedPriority === TaskPriority.High
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )}
              >
                <Icons.check className={cn('h-4 w-4')} />
              </div>
              <Icons.chevronUp
                size={18}
                className="mr-2 h-4 w-4 text-muted-foreground"
              />
              {TaskPriority.High}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Fragment>
  );
}
