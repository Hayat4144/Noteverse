'use client';
import React, { useState } from 'react';
import Taskview from './Taskview';
import TaskfilteSort from './TaskfilteSort';
import { Button } from '../ui/button';
import { TaskResponse } from '@/types';
import TableTask from './TableTask';
import BoardTask from './BoardTask';
import { BASE_URL } from '@/lib/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const getTasks = async (token: string | undefined ) => {
  const res = await fetch(`${BASE_URL}/api/search/task`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result: TaskResponse = await res.json();
  if (res.status !== 200) {
    throw new Error(result.error);
  }
  //  ------------------- make the human readable date formate and push in the existing data --------- //
  const data = result.data.map((item) => {
    const dueDate = new Date(item.due_date);
    const createdDate = new Date(item.createdAt);
    const updatedDate = new Date(item.updatedAt);

    const due_date = dueDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const createdAt = createdDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const updatedAt = updatedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return { ...item, due_date, createdAt, updatedAt };
  });
  return { ...result, data };
};

export default function TaskfilterView() {
  const [activetab, setActivetab] = useState('Task');
  const session = useSession();
  const user = session.data?.user;
  const token = user?.AccessToken;

  const {data,isLoading} = useQuery({
    queryKey:["tasks",token],
    queryFn:()=>getTasks(token),
    enabled:!!token
  })

  return (
    <React.Fragment>
      <div className="mt-5 flex items-center justify-between">
        <div className="view_tabs">
          <div className="md:hidden">
            <Taskview />
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant={activetab === 'Task' ? 'secondary' : 'ghost'}
              onClick={() => setActivetab('Task')}
              className={`${
                activetab !== 'Task'
                  ? 'text-muted-foreground hover:bg-transparent'
                  : ''
              }`}
            >
              Tasks
            </Button>
            <Button
              variant={activetab === 'By Board' ? 'secondary' : 'ghost'}
              onClick={() => setActivetab('By Board')}
              className={`${
                activetab !== 'By Board'
                  ? 'text-muted-foreground hover:bg-transparent'
                  : ''
              }`}
            >
              By Board
            </Button>
          </div>
        </div>
        <TaskfilteSort />
      </div>
      {isLoading && (
        <div className=''>
          loading <span className='animate-bounce'>...</span>
        </div>
      )}
      {data && 
        <section className="task_table my-5">
          {activetab === 'Task' && (
            <TableTask task={data} loading={isLoading} />
          )}
          {activetab !== 'Task' && <BoardTask task={data} />}
        </section>
}
    </React.Fragment>
  );
}
