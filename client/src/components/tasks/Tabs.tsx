'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ActionTypes } from '@/context/actions';

export default function Tabs() {
  const { isTasktab } = useAppSelector((state) => state.Tab);
  const dispatch = useAppDispatch();

  const toggleTaskTab = (value: boolean) => {
    dispatch({ type: ActionTypes.toggleTaskTab, payload: value });
  };
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Button
        variant={isTasktab ? 'secondary' : 'ghost'}
        onClick={() => toggleTaskTab(true)}
        className={`${!isTasktab ? 'hover:bg-transparent' : ''}`}
      >
        Tasks
      </Button>
      <Button
        onClick={() => toggleTaskTab(false)}
        variant={isTasktab? 'ghost' : 'secondary'}
      >
        By Board
      </Button>
    </div>
  );
}
