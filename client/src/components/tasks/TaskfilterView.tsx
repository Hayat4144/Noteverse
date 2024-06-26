'use client';
import React, { useEffect, useState } from 'react';
import TableTask from './view/TableTask';
import BoardTask from './view/BoardTask';
import { useAppDispatch, useAppSelector } from '@/hooks';
import TaskFilter from './TaskFilter';
import { TaskResponse } from '@/types';
import { ActionTypes } from '@/context/actions';
import { TaskUrl } from '@/lib/TaskUrl';
import { useQuery } from '@tanstack/react-query';
import getTasks from '@/service/getTask';
import { useSession } from 'next-auth/react';
import { columns } from './view/columns';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('../Loading'));

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
  const { data, isLoading, totalResults, resultPerPage } = useAppSelector(
    (state) => state.Task,
  );
  const { filter } = useAppSelector((state) => state.Filter);
  const session = useSession();
  const url = TaskUrl(sorts, filter);
  const [fetchQuery, setfetchQuery] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (sorts.length > 0 || filter.length > 0 || pageNumber > 0) {
      return setfetchQuery(true);
    }
    setfetchQuery(false);
  }, [sorts, filter, pageNumber]);

  useEffect(() => {
    if (searchParams.has('page')) {
      setpageNumber(Number(searchParams.get('page')));
    }
  }, [searchParams]);

  const result = useQuery(
    ['tasks'],
    () => {
      return getTasks(
        session.data?.user.AccessToken,
        url.concat(
          sorts.length > 0 || filter.length > 0
            ? `&page=${pageNumber}`
            : `?page=${pageNumber}`,
        ),
      );
    },
    {
      enabled: fetchQuery,
    },
  );

  // Manually refetch the query when sorts or filter change
  useEffect(() => {
    if (sorts.length > 0 || filter.length > 0 || pageNumber > 0) {
      result.refetch();
    }
  }, [sorts, filter, result, searchParams, pageNumber]);

  useEffect(() => {
    if (result.data) {
      const resultData = { ...result.data };
      dispatch({
        type: ActionTypes.task,
        payload: { field: { ...resultData, isLoading: result.isLoading } },
      });
    }
  }, [result.data, result.isLoading, dispatch]);

  useEffect(() => {
    if (taskData) {
      dispatch({ type: ActionTypes.task, payload: { field: taskData } });
    }
  }, [taskData, dispatch]);

  return (
    <React.Fragment>
      <TaskFilter />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="task_table my-2">
          {isTasktab ? (
            <TableTask
              columns={columns}
              data={data}
              totalResults={totalResults}
              resultPerPage={resultPerPage}
            />
          ) : (
            <BoardTask />
          )}
        </section>
      )}
    </React.Fragment>
  );
}
