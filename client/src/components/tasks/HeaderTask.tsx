import React from 'react';
import Tabs from './Tabs';
import FilterSortTask from './FilterSortTask';


export default function HeaderTask() {
  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold text-white">Tasks </h1>
      <span className="text-muted-foreground">
        Here is the list of your tasks
      </span>
      <div className="mt-5 flex items-center justify-between border-b pb-2">
        <div className="view_tabs">
          <div className="md:hidden">{/* <Taskview /> */}</div>
          <Tabs />
        </div>
        <FilterSortTask />
      </div>
    </React.Fragment>
  );
}
