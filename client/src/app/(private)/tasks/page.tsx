import HeaderTask from '@/components/tasks/HeaderTask';
import TaskfilterView from '@/components/tasks/TaskfilterView';
import { authOptions } from '@/lib/auth';
import getTasks from '@/service/getTask';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Fragment } from 'react';

export default async function Task() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/signin');
  }
  const tasks = await getTasks(session.user.AccessToken)
  return (
    <Fragment>
      <div className="mx-2 md:w-[80%] md:mx-auto md:my-5">
        <HeaderTask />
        <TaskfilterView taskData={{...tasks,isLoading:false}}/>
      </div>
    </Fragment>
  );
}
