import React from 'react';
import { PopoverContent } from '@/components/ui/popover';
import { useAppDispatch } from '@/hooks';
import { ActionTypes } from '@/context/actions';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { cn, getOperators } from '@/lib/utils';
import { v4 as uuid } from 'uuid';
import { sortBy } from '../sort/SortContentPopver';

interface filterProps {
  filterId?: string | undefined;
}

export default function FilterPopover({ filterId }: filterProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('');
  const id = filterId ? filterId : uuid();

  const addfilter = (field: string) => {
    const result = getOperators(field);
    if (result) {
      const { defaultOperator, operators } = result;
      dispatch({
        type: ActionTypes.addFilter,
        payload: { field, value: '', id, operator: defaultOperator },
      });

      dispatch({ type: ActionTypes.openFilter, payload: true });
      dispatch({ type: ActionTypes.openfilterPopover, payload: false });
      dispatch({
        type: ActionTypes.openPopoverState,
        payload: { filterId: id, isOpen: true },
      });
      setValue(field === value ? '' : field);
    }
  };
  return (
    <PopoverContent className="p-2 mx-4" align="start">
      <Command>
        <CommandInput placeholder="filter by..." />
        <CommandList>
          <CommandEmpty>No filter field found.</CommandEmpty>
          <CommandGroup>
            {sortBy.map((sort) => (
              <CommandItem
                value={sort.field}
                className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2"
                key={sort.field}
                onSelect={(currentValue) => {
                  addfilter(currentValue);
                }}
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
