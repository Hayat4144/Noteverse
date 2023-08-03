import { Calendar } from '@/components/ui/calendar';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { taskField } from '@/types';
import React, { Fragment, useEffect } from 'react';

interface DueDateProps {
  field: string;
  filterId: string;
}
export default function DueDateFilter({ field, filterId }: DueDateProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { filter } = useAppSelector((state) => state.Filter);
  const dispatch = useAppDispatch();

  // set the due date to store
  useEffect(() => {
    if (date) {
      const dateValue = JSON.stringify({ date });
      const value = JSON.parse(dateValue);
      dispatch({
        type: ActionTypes.addFilter,
        payload: { id: filterId, field, value: Object.values(value)[0] },
      });
    }
  }, [date]);

  // set the date if the due is exist in the store
  useEffect(() => {
    if (filter.length > 0) {
      filter.map((item) => {
        if (
          item.field === taskField.due_date &&
          item.value.length > 0 &&
          typeof item.value === 'string'
        ) {
          console.log(item.value);
          setDate(new Date(item.value));
        }
      });
    }
  }, []);
  return (
    <Fragment>
      <div className="my-5">
        <Calendar
          initialFocus
          mode="single"
          selected={date}
          onSelect={setDate}
          className="px-0"
        />
      </div>
    </Fragment>
  );
}
