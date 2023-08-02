'use client';
import React, { useEffect, useState } from 'react';
import TableTask from './view/TableTask';
import BoardTask from './view/BoardTask';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Loading from '../Loading';
import TaskFilter from './TaskFilter';
import { TaskResponse } from '@/types';
import { ActionTypes } from '@/context/actions';
import { TaskUrl } from '@/lib/TaskUrl';
import { useQuery } from '@tanstack/react-query';
import getTasks from '@/service/getTask';
import { useSession } from 'next-auth/react';

interface taskfilterProps extends TaskResponse {
  isLoading: boolean;
}

export default function TaskfilterView({
  taskData,
}: {
  taskData: taskfilterProps;
}) {
  const { sorts }: { sorts: [] } = useAppSelector((state) => state.Sort);
  const dispatch = useAppDispatch();
  const { isTasktab } = useAppSelector((state) => state.Tab);
  const { data, isLoading } = useAppSelector((state) => state.Task);
  const { filter } = useAppSelector((state) => state.Filter);
  const session = useSession();
  const url = TaskUrl(sorts, filter);
  const [fetchQuery, setfetchQuery] = useState(false);

  useEffect(() => {
    if (sorts.length > 0 || filter.length > 0) {
      setfetchQuery(true);
    } else [setfetchQuery(false)];
  }, [sorts, filter]);

  const result = useQuery(
    ['tasks'],
    () => getTasks(session.data?.user.AccessToken, url),
    {
      enabled: fetchQuery,
    },
  );

  // Manually refetch the query when sorts or filter change
  useEffect(() => {
    if (sorts.length > 0 || filter.length > 0) {
      result.refetch();
    }
  }, [sorts, filter, result]);

  useEffect(() => {
    if (result.data) {
      const resultData = { ...result.data };
      dispatch({
        type: ActionTypes.task,
        payload: { field: { ...resultData, isLoading: result.isLoading } },
      });
    }
  }, [result.data, result.isLoading, dispatch]);

  // update task
  useEffect(() => {
    if (taskData) {
      dispatch({ type: ActionTypes.task, payload: { field: taskData } });
    }
  }, [taskData, dispatch]);

  return (
    <React.Fragment>
      <TaskFilter />
      {isLoading && <Loading />}
      {data.length > 0 && (
        <section className="task_table my-2">
          {isTasktab ? <TableTask /> : <BoardTask />}
        </section>
      )}
    </React.Fragment>
  );
}
