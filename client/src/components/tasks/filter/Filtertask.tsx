'use client';

import React, { useEffect, useState } from 'react';
import { Popover, PopoverTrigger } from '../../ui/popover';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ActionTypes } from '@/context/actions';
import dynamic from 'next/dynamic';
const FilterPopover = dynamic(() => import('./FilterPopover'));

export default function Taskfilter() {
  const { filter } = useAppSelector((state) => state.Filter);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filter.length > 0) {
      setOpen(false);
    }
    if (!open) {
      dispatch({ type: ActionTypes.openfilterPopover, payload: false });
    }
  }, [filter, open]);

  const openChangehandler = () => {
    filter.length > 0 ? setOpen(false) : setOpen(!open);
  };

  const handlefilter = () => {
    if (filter.length < 1) {
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
      {open && <FilterPopover />}
    </Popover>
  );
}
