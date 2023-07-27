'use client';

import React, { useEffect, useState } from 'react';
import { Popover, PopoverTrigger } from '../../ui/popover';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ActionTypes } from '@/context/actions';
import FilterPopover from './FilterPopover';

export default function Taskfilter() {
  const { isOpen, popoverOpen, filter } = useAppSelector(
    (state) => state.Filter,
  );
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (popoverOpen) {
      setOpen(false);
    }
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen, popoverOpen]);

  const openChangehandler = () => {
    if (isOpen) {
      dispatch({ type: ActionTypes.openFilter, payload: false });
    }
  };

  const handlefilter = () => {
    if (filter.length > 0) {
      dispatch({ type: ActionTypes.openfilterPopover, payload: true });
    } else {
      dispatch({ type: ActionTypes.openFilter, payload: true });
    }
  };

  return (
    <Popover open={open} onOpenChange={openChangehandler}>
      <PopoverTrigger asChild onClick={handlefilter}>
        <span className="cursor-pointer">filter</span>
      </PopoverTrigger>
      {isOpen && <FilterPopover />}
    </Popover>
  );
}
