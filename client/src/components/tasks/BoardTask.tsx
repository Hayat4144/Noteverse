import sortTaskByStatus from '@/lib/sortTaskByStatus';
import { TaskResponse, TaskStatus, taskObject } from '@/types';
import React, { Fragment } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Iconwithtext from '../Iconwithtext';
import { Icons } from '../Icons';
import { Separator } from '../ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function BoardTask({ task }: { task: TaskResponse }) {
  const { data, resultPerPage, totalResults } = task;
  const { inProgressTask, completedTask, notStartedTask } =
    sortTaskByStatus(data);

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader className="p-1">
            <CardTitle>
              <Badge className="cursor-pointer">Not started</Badge>
            </CardTitle>
          </CardHeader>
          <TaskContent data={notStartedTask}/>
        </Card>
        <Card>
          <CardHeader className="p-1">
            <CardTitle>
              <Badge className="cursor-pointer">In Progress</Badge>
            </CardTitle>
          </CardHeader>
          <TaskContent data={inProgressTask}/>
        </Card>
        
      </div>
    </Fragment>
  );
}


const TaskContent = ({data}:{data:taskObject[]})=>{
  return (  
    <CardContent className="px-1">
    {data.map((task:any) => (
      <div
        key={task.id}
        className="rounded-md border flex justify-between items-center px-2 py-2 mb-2"
      >
        <Iconwithtext
          icons={<Icons.text size={18} />}
          text={task.title}
        />
        <div className="action_btns flex h-7 items-center space-x-2 px-1 text-sm border rounded-md">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.edit size={15} className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.horizontalThreeDots
                  size={15}
                  className="cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Rename,delete,update and more</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    ))}
  </CardContent>
  )
}
