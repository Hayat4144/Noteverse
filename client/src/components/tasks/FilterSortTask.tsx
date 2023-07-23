'use client';
import React from 'react';
import { Button } from '../ui/button';
import Filtertask from './Filtertask';
import Sorttask from './SortTask';
import SearchTask from './SearchTask';

export default function FilterSortTask() {
  return (
    <div className="flex items-center justify-between space-x-5">
      <Filtertask />
      <Sorttask />
      <SearchTask />
      <Button size={'sm'}>New</Button>
    </div>
  );
}
