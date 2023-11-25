import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getOperators } from '@/lib/utils';
import { Popover } from '@radix-ui/react-popover';
import React, { Fragment } from 'react';
import { ActionTypes } from '@/context/actions';
import dynamic from 'next/dynamic';

const DeleteFilter = dynamic(() => import('./DeleteFilter'));
const OperatorComponent = dynamic(() => import('./OperatorComponent'));
const SpecificFilter = dynamic(() => import('./SpecificFilter'));

export default function BadgePopover() {
  const { openPopoverState, filter } = useAppSelector((state) => state.Filter);
  const dispatch = useAppDispatch();

  const handleFilterPopover = (id: string, isOpen: boolean) => {
    dispatch({
      type: ActionTypes.openPopoverState,
      payload: { filterId: id, isOpen },
    });
  };

  return (
    <Fragment>
      {filter.map((item) => {
        const { operators } = getOperators(item.field);
        const isOpen = openPopoverState[item.id] || false;
        return (
          <Fragment key={item.id}>
            <div className="cursor-pointer">
              <Badge
                onClick={() => handleFilterPopover(item.id, !isOpen)}
                variant={'outline'}
                className="space-x-2 py-2 hover:bg-gray-800 hover:border-none"
              >
                <span className="capitalize">{item.field}</span>
                <div className="operators flex items-center">
                  <span className="">{item.operator}</span>
                  <Icons.chevronDown size={16} className="translate-y-1" />
                </div>
              </Badge>
              {isOpen && (
                <Popover
                  open={true}
                  onOpenChange={(isOpen) => {
                    dispatch({
                      type: ActionTypes.openPopoverState,
                      payload: { filterId: item.id, isOpen },
                    });
                  }}
                >
                  <PopoverTrigger></PopoverTrigger>
                  <PopoverContent className="my-5">
                    <div className="flex items-center justify-between">
                      <div className="capitalize flex space-x-1 items-center">
                        <h4 className="text-sm">{item.field}</h4>
                        <OperatorComponent item={item} operators={operators} />
                      </div>
                      <DeleteFilter id={item.id} />
                    </div>
                    <SpecificFilter field={item.field} id={item.id} />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
}
