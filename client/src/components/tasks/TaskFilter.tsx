import React from 'react';
import SortFilterContent from './sort/SortFilterContent';
import FilterContent from './filter/FilterContent';

export default function TaskFilter() {
  return (
    <React.Fragment>
      <SortFilterContent />
      <FilterContent />
    </React.Fragment>
  );
}
