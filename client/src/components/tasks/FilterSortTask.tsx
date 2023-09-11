'use client';
import React from 'react';
import Filtertask from './filter/Filtertask';
import Sort from './sort/Sort';
import Addtask from './Addtask';

export default function FilterSortTask() {
  return (
    <div className="flex items-center justify-between space-x-5">
      <Filtertask />
      <Sort />
      <Addtask />
    </div>
  );
}
