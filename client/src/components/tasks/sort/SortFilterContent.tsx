'use client';
import { Button } from '@/components/ui/button';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { OrderBY, sortObject, sortsState } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import SortContentPopver, { sortBy } from './SortContentPopver';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

type FieldOpenState = {
  [key: string]: boolean;
};

export default function SortFilterContent() {
  const { sorts, isOpen, popoverOpen }: sortsState = useAppSelector(
    (state) => state.Sort,
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);
  const [fieldOpen, setfieldOpen] = React.useState<FieldOpenState>({});
  const [value, setValue] = React.useState<String>('');
  const [childrenPopover, setchildrenPopover] = React.useState(false);

  const OrderByfieldChange = (value: string, field: string, id: string) => {
    dispatch({ type: ActionTypes.addSort, payload: { id, field, value } });
  };

  //  Handle the ParentPopover change when ever the user clicked out of popover
  const handleParentPopoverChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
      dispatch({ type: ActionTypes.opensortPopover, payload: false });
    }
  };

  // Handle specific field popover state change storing the id of the field as
  // key and value as boolean to check the triggered field
  const fieldOpenStateChange = (value: boolean, id: string) => {
    setfieldOpen((prevState) => ({ ...prevState, [id]: value }));
  };

  // Sort field state change handler when the user changed the field this function will trigerred.
  const fieldChange = (currentValue: string, id: string) => {
    dispatch({
      type: ActionTypes.addSort,
      payload: {
        id,
        value: OrderBY.ASC,
        field: currentValue,
      },
    });
    setfieldOpen((prevState) => ({ ...prevState, [id]: false }));
    setValue(currentValue === value ? '' : currentValue);
  };

  React.useEffect(() => {
    setOpen(!isOpen && popoverOpen);
  }, [isOpen, popoverOpen]);

  const handleClosePopover = (state: boolean) => {
    setchildrenPopover(state);
  };

  // Delete particular sorts by id from store
  const deleteSort = (id: string) => {
    dispatch({ type: ActionTypes.removeSort, payload: id });
  };

  // Delete all sorts from store
  const deleteAllSorts = () => {
    dispatch({ type: ActionTypes.removeSort });
  };

  // open parent sort popover 
  const OpenParentPopover = () => {
    dispatch({ type: ActionTypes.opensortPopover, payload: true });
  };

  return (
    <React.Fragment>
      <section className="my-5">
        {sorts.length > 0 && (
          <Badge
            onClick={OpenParentPopover}
            variant={'outline'}
            className="space-x-2 py-1 hover:bg-gray-800 hover:border-none cursor-pointer
            flex items-center w-fit"
          >
            <div className="updownarrow">
              <Icons.updown size={16} />
            </div>
            <div className="space-x-1 flex items-center text-sm">
              <span>{sorts.length}</span>
              <span className="capitalize">sorts</span>
              <Icons.chevronDown size={16} />
            </div>
          </Badge>
        )}
        {popoverOpen && sorts.length > 0 ? (
          <Popover open={open} onOpenChange={handleParentPopoverChange}>
            <PopoverTrigger></PopoverTrigger>
            <PopoverContent align="start" className="space-y-2 w-[20em]">
              {sorts.map((item: sortObject) => {
                const isfieldOpen = fieldOpen[item.id] || false;
                return (
                  <div
                    className="flex items-center justify-center space-x-1"
                    key={item.id}
                  >
                    <Popover
                      open={isfieldOpen}
                      onOpenChange={(value) =>
                        fieldOpenStateChange(value, item.id)
                      }
                    >
                      <PopoverTrigger
                        asChild
                        onClick={() =>
                          fieldOpenStateChange(isfieldOpen, item.id)
                        }
                      >
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {item.field}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        <Command>
                          <CommandInput placeholder="Sort by..." />
                          <CommandList>
                            <CommandEmpty>No sort field found.</CommandEmpty>
                            <CommandGroup>
                              {sortBy.map((sort) => (
                                <CommandItem
                                  className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2"
                                  key={sort.field}
                                  onSelect={(currentValue) =>
                                    fieldChange(currentValue, item.id)
                                  }
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
                    <Icons.close
                      size={30}
                      className="font-extrabold cursor-pointer"
                      onClick={() => deleteSort(item.id)}
                    />
                  </div>
                );
              })}
              {childrenPopover ? (
                <Popover
                  open={childrenPopover}
                  onOpenChange={setchildrenPopover}
                >
                  <PopoverTrigger></PopoverTrigger>
                  <SortContentPopver
                    onClosePopoverChange={handleClosePopover}
                  />
                </Popover>
              ) : null}
              {childrenPopover}
              <div className="actions space-y-2">
                <div
                  className="addSort flex items-center space-x-2 cursor-pointer
                rounded-sm h-8 px-2 py-1 hover:bg-accent"
                  onClick={() => setchildrenPopover(true)}
                >
                  <Icons.add size={18} /> <p className="text-sm">Add sort</p>
                </div>
                <div
                  onClick={deleteAllSorts}
                  className="deleteSort  flex items-center space-x-2 cursor-pointer
                rounded-sm h-8 px-2 py-1 hover:bg-accent text-red-700 hover:text-red-500"
                >
                  <Icons.trash size={18} />{' '}
                  <p className="text-sm">Delete sorts</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : null}
      </section>
    </React.Fragment>
  );
}
