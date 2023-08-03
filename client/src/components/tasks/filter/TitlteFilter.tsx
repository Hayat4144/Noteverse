import { Input } from '@/components/ui/input';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { taskField } from '@/types';
import React, { useEffect, useState } from 'react';

interface TitleFilterProps {
  filterId: string;
  field: string;
}

export default function TitlteFilter({ filterId, field }: TitleFilterProps) {
  const dispatch = useAppDispatch();
  const [inputValue, setinputValue] = useState('');
  const { filter } = useAppSelector((state) => state.Filter);

  useEffect(() => {
    filter.map((item) => {
      if (
        item.field === taskField.title &&
        item.value.length > 0 &&
        typeof item.value === 'string'
      ) {
        setinputValue(item.value);
      }
    });
  }, [filter]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type: ActionTypes.addFilter,
      payload: { id: filterId, value, field },
    });
    setinputValue(value);
  };

  return (
    <Input
      placeholder="Type a value"
      className="my-5"
      value={inputValue}
      onChange={changeHandler}
    />
  );
}
