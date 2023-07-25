'use client';
import React from 'react';
import { Button } from '../ui/button';
import Filtertask from './Filtertask';
import SearchTask from './SearchTask';
import Sort from './sort/Sort';

export default function FilterSortTask() {
  return (
    <div className="flex items-center justify-between space-x-5">
      <Filtertask />
      <Sort />
      <SearchTask />
      <Button size={'sm'}>New</Button>
    </div>
  );
}
