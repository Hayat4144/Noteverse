import TaskfilterView from '@/components/tasks/TaskfilterView';
import { BASE_URL } from '@/lib/BASE_URL';
import { authOptions } from '@/lib/auth';
import { TaskResponse } from '@/types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Fragment } from 'react';

export default async function Task() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/signin');
  }

  return (
    <Fragment>
      <div className="mx-2 md:w-[80%] md:mx-auto md:my-5">
        <div className="headers">
          <h1 className="text-2xl font-bold text-white">Tasks </h1>
          <span className="text-muted-foreground">
            Here is the list of your tasks
          </span>
        </div>
        <TaskfilterView/>
      </div>
    </Fragment>
  );
}
