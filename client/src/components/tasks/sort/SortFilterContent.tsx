'use client'
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { OrderBY, sortObject, sortsState } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { sortBy } from './SortContentPopver';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SortFilterContent() {
  const { sorts, isOpen, popoverOpen }: sortsState = useAppSelector(
    (state) => state.Sort,
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);
  const [fieldOpen, setfieldOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<String>('');

  const OrderByfieldChange = (value: string, field: string, id: string) => {
    dispatch({ type: ActionTypes.addSort, payload: { id, field, value } });
  };
  const handleParentPopoverChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
      dispatch({ type: ActionTypes.opensortPopover, payload: false });
    }
  };

  React.useEffect(() => {
    setOpen(!isOpen && popoverOpen);
  }, [isOpen, popoverOpen]);
  return (
    <React.Fragment>
      <section className="my-5">
        <div className="filter-sort"></div>
        {popoverOpen && sorts.length > 0 ? (
          <Popover open={open} onOpenChange={handleParentPopoverChange}>
            <PopoverTrigger></PopoverTrigger>
            <PopoverContent align="start" className="space-y-2">
              {sorts.map((item: sortObject) => (
                <div
                  className="flex items-center justify-center space-x-1"
                  key={item.id}
                >
                  <Popover open={fieldOpen} onOpenChange={setfieldOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {item.field}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Sort by..." />
                        <CommandList>
                          <CommandEmpty>No sort field found.</CommandEmpty>
                          <CommandGroup>
                            {sortBy.map((sort) => (
                              <CommandItem
                                className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2"
                                key={sort.field}
                                onSelect={(currentValue) => {
                                  dispatch({
                                    type: ActionTypes.addSort,
                                    payload: {
                                      field: currentValue,
                                      value: OrderBY.ASC,
                                      id: item.id,
                                    },
                                  });
                                  setfieldOpen(false);
                                  setValue(
                                    currentValue === value ? '' : currentValue,
                                  );
                                }}
                              >
                                {value === sort.field ? (
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      value === sort.field
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                ) : (
                                  sort.icons
                                )}
                                <p className="text-sm text-muted-foreground">
                                  {sort.lable}
                                </p>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Select
                    onValueChange={(value) => {
                      OrderByfieldChange(value, item.field, item.id);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ascending" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Ascending</SelectItem>
                      <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        ) : null}
      </section>
    </React.Fragment>
  );
}
