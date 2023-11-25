import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { Fragment, useEffect, useState } from 'react';
import { ActionTypes } from '@/context/actions';
import dynamic from 'next/dynamic';

const FilterPopover = dynamic(() => import('./FilterPopover'));

export default function AddFilterBadge() {
  const { popoverOpen } = useAppSelector((state) => state.Filter);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!popoverOpen) {
      setOpen(false);
    }
  }, [popoverOpen]);

  const openChangehandler = () => {
    if (popoverOpen) {
      setOpen(!open);
    }
  };

  const handleOpenPopover = () => {
    if (!popoverOpen) {
      dispatch({ type: ActionTypes.openfilterPopover, payload: true });
    }
    setOpen(!open);
  };

  return (
    <Fragment>
      <div className="flex items-center space-x-1">
        <Badge
          onClick={() => handleOpenPopover()}
          variant={'outline'}
          className="space-x-1 py-2 hover:bg-gray-800 hover:border-none cursor-pointer"
        >
          <span className="capitalize">Add filter</span>
          <Icons.add size={16} />
        </Badge>
      </div>
      <Popover open={open} onOpenChange={openChangehandler}>
        <PopoverTrigger></PopoverTrigger>
        {open && <FilterPopover />}
      </Popover>
    </Fragment>
  );
}
