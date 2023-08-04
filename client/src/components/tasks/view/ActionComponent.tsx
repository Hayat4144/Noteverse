import { SelectionRow } from '@/types';
import React, { Fragment, useCallback } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import Iconwithtext from '@/components/Iconwithtext';
import { Icons } from '@/components/Icons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import GetSelectedRow from '@/lib/GetSelectedRows';
import deleteTasks from '@/service/DeletedTasks';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { ActionTypes } from '@/context/actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface RowSelections {
  selectionRow: SelectionRow;
  unSelectRow: () => void;
}

export default function ActionComponent({
  selectionRow,
  unSelectRow,
}: RowSelections) {
  const areRowsSelected = Object.keys(selectionRow).length > 0;
  const { data } = useAppSelector((state) => state.Task);
  const session = useSession();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      searchParams.forEach((paramValue, paramName) => {
        // Append all existing parameters except the one we want to remove
        if (paramName !== name) {
          params.append(paramName, paramValue);
        }
      });

      // Append the new value if it's not null
      if (value !== null) {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const DeleteTasks = async (taskIds: string[]) => {
    const { error, message } = await deleteTasks(
      taskIds,
      session.data?.user.AccessToken,
    );
    if (error) {
      toast({ variant: 'destructive', title: error });
    }
    taskIds.map((id) => {
      dispatch({ type: ActionTypes.removeTask, id });
    });
    unSelectRow();
    return toast({ title: message });
  };

  return (
    <Fragment>
      {areRowsSelected && (
        <div className="mt-5 flex h-10 items-center space-x-2 px-2 text-sm border rounded-md w-fit">
          <h3 className="">
            <span className="no-of-rows">
              {Object.keys(selectionRow).length}
            </span>
            <span> Selected</span>
          </h3>
          <Separator orientation="vertical" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => {
                  const taskIds: string[] = GetSelectedRow(selectionRow, data);
                  DeleteTasks(taskIds);
                }}
              >
                <Iconwithtext
                  icons={<Icons.trash size={16} />}
                  text="Delete"
                  className="text-red-600"
                />
              </TooltipTrigger>
              <TooltipContent>Delete Task</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {Object.keys(selectionRow).length === 1 && (
            <>
              <Separator orientation="vertical" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => {
                      const taskIds: string[] = GetSelectedRow(
                        selectionRow,
                        data,
                      );
                      router.push(
                        pathname + '?' + createQueryString('id', taskIds[0]),
                      );
                    }}
                  >
                    <Iconwithtext
                      icons={<Icons.edit size={16} />}
                      text="Edit"
                    />
                  </TooltipTrigger>
                  <TooltipContent>Edit Task</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      )}
    </Fragment>
  );
}
