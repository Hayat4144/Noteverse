'use client';
import React  from 'react';
import { Button } from '@/components/ui/button';
import AddTaskform from '../forms/AddTaskform';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ActionTypes } from '@/context/actions';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Addtask() {
  const { isOpen } = useAppSelector((state) => state.TaskSheet);
  const dispatch = useAppDispatch();
 
  const openChangehandler = () => {
    if (isOpen) {
      dispatch({ type: ActionTypes.taskSheetoogle, payload: false });
    }
  };


  return (
    <Sheet open={isOpen} onOpenChange={openChangehandler}>
      <SheetTrigger asChild>
        <Button
          variant={'secondary'}
          onClick={() =>
            dispatch({ type: ActionTypes.taskSheetoogle, payload: true })
          }
        >
          New
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Add Task</SheetTitle>
        </SheetHeader>
        <AddTaskform />
      </SheetContent>
    </Sheet>
  );
}
