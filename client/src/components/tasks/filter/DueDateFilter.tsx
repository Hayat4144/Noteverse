import { Calendar } from '@/components/ui/calendar';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch } from '@/hooks';
import React, { Fragment, useEffect } from 'react';

interface DueDateProps {
  field: string;
  filterId: string;
}
export default function DueDateFilter({ field, filterId }: DueDateProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (date) {
    const dateValue = JSON.stringify({date })
    const value = JSON.parse(dateValue)
      dispatch({
        type: ActionTypes.addFilter,
        payload: { id: filterId, field, value: Object.values(value)[0]},
      });
    }
  }, [date]);
  return (
    <Fragment>
      <div className="my-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="px-0"
        />
      </div>
    </Fragment>
  );
}
