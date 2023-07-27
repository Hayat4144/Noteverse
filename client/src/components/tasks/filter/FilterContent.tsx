'use client';
import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getOperators } from '@/lib/utils';
import React, { Fragment } from 'react';
import OperatorComponent from './OperatorComponent';
import DeleteFilter from './DeleteFilter';

export default function FilterContent() {
  const { isOpen, popoverOpen, filter } = useAppSelector(
    (state) => state.Filter,
  );

  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);
  const [fieldOpen, setfieldOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<String>('');

  const handleParentPopoverChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
      dispatch({ type: ActionTypes.openfilterPopover, payload: false });
    }
  };

  React.useEffect(() => {
    setOpen(!isOpen && popoverOpen);
  }, [isOpen, popoverOpen]);

  return (
    <Fragment>
      <section className="my-5">
        <div className="filter-sort">
          {filter.map((item) => {
            const { operators } = getOperators(item.field);
            return (
              <Fragment key={item.id}>
                <div className="cursor-pointer">
                  <Badge
                    variant={'outline'}
                    className="space-x-2 py-2 hover:bg-gray-800 hover:border-none"
                  >
                    <span className="capitalize">{item.field}</span>
                    <div className="operators flex items-center">
                      <span className="">{item.operator}</span>
                      <Icons.chevronDown size={16} className="translate-y-1" />
                    </div>
                  </Badge>
                  {filter.length > 0 && (
                    <Popover
                      open={open}
                      onOpenChange={handleParentPopoverChange}
                    >
                      <PopoverTrigger></PopoverTrigger>
                      <PopoverContent className="my-5">
                        <div className="flex items-center justify-between">
                          <div className="capitalize flex space-x-1 items-center">
                            <h4 className="text-sm">{item.field}</h4>
                            <OperatorComponent
                              item={item}
                              operators={operators}
                            />
                          </div>
                          <DeleteFilter id={item.id} />
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </section>
    </Fragment>
  );
}
