'use client';
import { Icons } from '@/components/Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch } from '@/hooks';
import React, { Fragment, useState } from 'react';

interface deleteFilterProps {
  id: string;
}

export default function DeleteFilter({ id }: deleteFilterProps) {
  const dispatch = useAppDispatch();
  const deleteFilter = () => {
    dispatch({ type: ActionTypes.removeFilter, payload: id });
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Icons.horizontalThreeDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={deleteFilter}
              className="text-red-600 cursor-pointer"
            >
              <Icons.trash size={18} className="mr-2" />
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}
