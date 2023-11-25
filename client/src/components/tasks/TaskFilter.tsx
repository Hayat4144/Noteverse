'use client';
import React from 'react';
import { Separator } from '../ui/separator';
import { useAppSelector } from '@/hooks';
import dynamic from 'next/dynamic';

const SortFilterContent = dynamic(() => import('./sort/SortFilterContent'));
const FilterContent = dynamic(() => import('./filter/FilterContent'));

export default function TaskFilter() {
  const { sorts }: { sorts: [] } = useAppSelector((state) => state.Sort);
  const { filter } = useAppSelector((state) => state.Filter);
  return (
    <React.Fragment>
      {(filter.length > 0 || sorts.length > 0) && (
        <section className="flex items-center space-x-4">
          <SortFilterContent />
          {filter.length > 0 && sorts.length > 0 && (
            <Separator orientation="vertical" className="h-6" />
          )}
          <FilterContent />
        </section>
      )}
    </React.Fragment>
  );
}
