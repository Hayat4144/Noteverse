import sortTaskByStatus from '@/lib/sortTaskByStatus';
import { taskObject } from '@/types';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import Iconwithtext from '../../Iconwithtext';
import { Icons } from '../../Icons';
import { Separator } from '../../ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Paignation } from '@/components/ui/pagination';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AddTaskform from '@/components/forms/AddTaskform';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import deleteTasks from '@/service/DeletedTasks';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { ActionTypes } from '@/context/actions';
import { Button } from '@/components/ui/button';

export default function BoardTask() {
  const { data, resultPerPage, totalResults } = useAppSelector(
    (state) => state.Task,
  );
  const [currentPage, setcurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalResults / resultPerPage);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setisOpen] = useState(false);
  const { inProgressTask, completedTask, notStartedTask } =
    sortTaskByStatus(data);

  const PageChangeHanlder = (pageNumber: number) => {
    setcurrentPage(pageNumber);
  };

  useEffect(() => {
    if (searchParams.has('page')) {
      setcurrentPage(Number(searchParams.get('page')));
    }
    setisOpen(searchParams.has('id'));
  }, [searchParams]);

  useEffect(() => {
    if (totalPages > 1) {
      router.push(pathname + '?' + createQueryString('page', `${currentPage}`));
    }
  }, [currentPage]);

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
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
  const updateSheetChangeHandler = () => {
    router.push(pathname + '?' + createQueryString('id', null));
  };

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card className="h-fit">
          <CardHeader className="p-1">
            <CardTitle className="px-2">
              <Badge className="cursor-pointer">Not started</Badge>
            </CardTitle>
          </CardHeader>
          <TaskContent
            data={notStartedTask}
            createQueryString={createQueryString}
          />
        </Card>
        <Card className="h-fit">
          <CardHeader className="p-1">
            <CardTitle className="px-2">
              <Badge className="cursor-pointer">In Progress</Badge>
            </CardTitle>
          </CardHeader>
          <TaskContent
            data={inProgressTask}
            createQueryString={createQueryString}
          />
        </Card>
        <Card className="h-fit">
          <CardHeader className="p-1">
            <CardTitle className="px-2">
              <Badge className="cursor-pointer">Completed</Badge>
            </CardTitle>
          </CardHeader>
          <TaskContent
            data={completedTask}
            createQueryString={createQueryString}
          />
        </Card>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Paignation
            className="my-5"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={PageChangeHanlder}
          />
        </div>
      )}
      <Sheet open={isOpen} onOpenChange={updateSheetChangeHandler}>
        <SheetTrigger></SheetTrigger>
        <SheetContent side={'left'} className="overflow-auto">
          <AddTaskform />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

interface TaskContentProps {
  data: taskObject[];
  createQueryString: (name: string, value: string | null) => string;
}

const TaskContent = ({ data, createQueryString }: TaskContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const dispatch = useAppDispatch();
  const [dialOpen, setdialOpen] = useState(false);
  const [deleteId, setdeleteId] = useState<string | null>(null);

  const editHandler = (id: string) => {
    router.push(pathname + '?' + createQueryString('id', id));
  };

  const onDialogOpenChangehandler = () => {
    setdeleteId(null);
    setdialOpen(false);
  };

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
    setdeleteId(null);
    setdialOpen(false);
    return toast({ title: message });
  };

  return (
    <CardContent className="px-3 my-2">
      {data.length > 0 ? (
        data.map((task: taskObject) => (
          <div
            key={task.id}
            className="rounded-md border flex justify-between items-center px-2 py-2 mb-2"
          >
            <Iconwithtext icons={<Icons.text size={18} />} text={task.title} />
            <div className="action_btns flex h-7 items-center space-x-2 px-1 text-sm border rounded-md">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => editHandler(task.id)}>
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
                  <TooltipTrigger
                    className="text-red-600"
                    onClick={() => {
                      setdialOpen(true);
                      setdeleteId(task.id);
                    }}
                  >
                    <Icons.trash size={15} className="cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))
      ) : (
        <p>No task has been found in this category </p>
      )}
      {dialOpen && (
        <Dialog open={dialOpen} onOpenChange={onDialogOpenChangehandler}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>Do you really want to delete the task?</DialogHeader>
            <DialogDescription>
              This action cannot be undone. This preset will no longer be
              accessible by you or others you've shared it with
            </DialogDescription>
            <DialogFooter>
              <Button variant={'outline'} onClick={onDialogOpenChangehandler}>
                Cancel
              </Button>
              <Button
                variant={'destructive'}
                onClick={() => {
                  if (deleteId) {
                    DeleteTasks([deleteId]);
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </CardContent>
  );
};
