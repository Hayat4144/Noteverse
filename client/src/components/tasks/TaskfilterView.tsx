'use client';
import React, { useEffect, useState } from 'react';
import TableTask from './view/TableTask';
import BoardTask from './view/BoardTask';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Loading from '../Loading';
import TaskFilter from './TaskFilter';
import { TaskResponse } from '@/types';
import { ActionTypes } from '@/context/actions';

interface taskfilterProps extends TaskResponse {
  isLoading: boolean;
}

export default function TaskfilterView({
  taskData,
}: {
  taskData: taskfilterProps;
}) {
  const sorts = useAppSelector((state) => state.Sort);
  const dispatch = useAppDispatch();
  const { isTasktab } = useAppSelector((state) => state.Tab);
  const { data, isLoading } = useAppSelector((state) => state.Task);

  // update task
  useEffect(() => {
    if (taskData) {
      dispatch({ type: ActionTypes.task, payload: { field: taskData } });
    }
  }, [taskData]);

  return (
    <React.Fragment>
      <TaskFilter />
      {isLoading && <Loading />}
      {data.length > 0 && (
        <section className="task_table my-5">
          {isTasktab ? <TableTask /> : <BoardTask />}
        </section>
      )}
    </React.Fragment>
  );
}
