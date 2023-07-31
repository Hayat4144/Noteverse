import { taskField } from '@/types';
import React, { Fragment } from 'react';
import TitlteFilter from './TitlteFilter';
import StatusFilter from './StatusFilter';
import Priority from './Priority';
import TagsFilter from './TagsFilter';
import DueDateFilter from './DueDateFilter';

interface SpecificFilterProps {
  field: string;
  id: string;
}

export default function SpecificFilter({ field, id }: SpecificFilterProps) {
  return (
    <Fragment>
      {taskField.title === field && (
        <TitlteFilter filterId={id} field={field} />
      )}
      {taskField.status === field && (
        <StatusFilter filterId={id} field={field} />
      )}
      {taskField.priority === field && (
          <Priority  filterId={id} field={field} />
      )}
      {taskField.tags === field && (
        <TagsFilter filterId={id} field={field} />
      )} 

      {taskField.due_date === field && (
        <DueDateFilter field={field} filterId={id}/>
      )}
    </Fragment>
  );
}
