import { Input } from '@/components/ui/input';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch } from '@/hooks';
import React from 'react';

interface TitleFilterProps {
  filterId: string;
  field: string;
}

export default function TitlteFilter({ filterId, field }: TitleFilterProps) {
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type: ActionTypes.addFilter,
      payload: { id: filterId, value, field },
    });
  };

  return (
    <Input
      placeholder="Type a value"
      className="my-5"
      onChange={changeHandler}
    />
  );
}
