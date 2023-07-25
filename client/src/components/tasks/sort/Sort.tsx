import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { sortsState } from '@/types';
import React, { useEffect } from 'react';
import SortContentPopver from './SortContentPopver';

export default function Sort() {
  const { isOpen, popoverOpen, sorts }: sortsState = useAppSelector(
    (state) => state.Sort,
  );
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (popoverOpen) {
      setOpen(false);
    }
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen, popoverOpen]);

  const handlesort = () => {
    if (sorts.length > 0) {
      dispatch({ type: ActionTypes.opensortPopover, payload: true });
    } else {
      dispatch({ type: ActionTypes.openSort, payload: true });
    }
  };

  const openChangehandler = () => {
    if (isOpen) {
      dispatch({ type: ActionTypes.openSort, payload: false });
    }
  };
  return (
    <Popover open={open} onOpenChange={openChangehandler}>
      <PopoverTrigger asChild onClick={handlesort}>
        <span className="cursor-pointer">sort</span>
      </PopoverTrigger>
      {isOpen && <SortContentPopver />}
    </Popover>
  );
}
