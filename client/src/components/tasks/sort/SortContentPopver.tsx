'use client';

import React from 'react';
import { PopoverContent } from '../../ui/popover';
import { OrderBY } from '@/types';
import { Icons } from '../../Icons';
import { useAppDispatch} from '@/hooks';
import { ActionTypes } from '@/context/actions';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from '../../ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { v4 as uuid } from 'uuid';

export const sortBy = [
  {
    field: 'title',
    lable: 'Task title',
    icons: <Icons.text size={18} />,
  },
  {
    field: 'due_date',
    lable: 'Due Date',
    icons: <Icons.calendar size={18} />,
  },
  {
    field: 'priority',
    lable: 'Priority',
    icons: <Icons.downCircle size={18} />,
  },
  {
    field: 'status',
    lable: 'Status',
    icons: <Icons.loader size={18} />,
  },
  {
    field: 'tags',
    lable: 'Tags',
    icons: <Icons.tag size={18} />,
  },
];

interface SortContentPopverProps {
  sortId?: string | undefined;
}

export default function SortContentPopver({ sortId }: SortContentPopverProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('');
  const id = sortId ? sortId : uuid();

  const addSort = (field: string) => {
    dispatch({
      type: ActionTypes.addSort,
      payload: { field, value: OrderBY.ASC, id },
    });
    dispatch({type:ActionTypes.openSort,payload:false})
    dispatch({type:ActionTypes.opensortPopover,payload:true})
    setValue(field === value ? '' : field);
  };

  return (
    <PopoverContent className="p-2 mx-4" align="start">
      <Command>
        <CommandInput placeholder="Sort by..." />
        <CommandList>
          <CommandEmpty>No sort field found.</CommandEmpty>
          <CommandGroup>
            {sortBy.map((sort) => (
              <CommandItem
                className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2"
                key={sort.field}
                onSelect={(currentValue) => {addSort(currentValue)}}
              >
                {value === sort.field ? (
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === sort.field ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ) : (
                  sort.icons
                )}
                <p className="text-sm text-muted-foreground">{sort.lable}</p>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
}
