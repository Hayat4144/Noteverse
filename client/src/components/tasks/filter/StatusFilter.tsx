import React, { Fragment, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { TaskStatus } from '@/types';
import { useAppDispatch } from '@/hooks';
import { ActionTypes } from '@/context/actions';

interface SpecificFilterProps {
  field: string;
  filterId: string;
}

export default function StatusFilter({ field, filterId }: SpecificFilterProps) {
  const [seletectedStatus, setseletectedStatus] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleStatusChange = (status: string) => {
    setseletectedStatus(status);
    dispatch({
      type: ActionTypes.addFilter,
      payload: { id: filterId, field, value: status },
    });
  };
  return (
    <Fragment>
      <div className="my-5">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="NotStarted"
            name="status"
            checked={seletectedStatus === TaskStatus.Not_Started}
            onCheckedChange={() => handleStatusChange(TaskStatus.Not_Started)}
          />
          <label
            htmlFor="NotStarted"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Badge className="mx-2 my-2 rounded-sm bg-gray-200 h-6 cursor-pointer hover:bg-gray-300">
              Not started
            </Badge>
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="IndProgress"
            name="status"
            checked={seletectedStatus === TaskStatus.In_Progress}
            onCheckedChange={() => handleStatusChange(TaskStatus.In_Progress)}
          />
          <label
            htmlFor="IndProgress"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Badge className="mx-2 my-2 rounded-sm bg-blue-200 h-6 cursor-pointer hover:bg-blue-300">
              In Progress
            </Badge>
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Completed"
            name="status"
            checked={seletectedStatus === TaskStatus.Completed}
            onCheckedChange={() => handleStatusChange(TaskStatus.Completed)}
          />
          <label
            htmlFor="Completed"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Badge className="mx-2 my-2 rounded-sm bg-green-200 h-6 cursor-pointer hover:bg-green-300">
              Completed
            </Badge>
          </label>
        </div>
      </div>
    </Fragment>
  );
}
