import { addtaskSchema } from '@/lib/validation/task';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { TaskPriority, TaskStatus, taskInput } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Icons } from '../Icons';
import { Calendar } from '../ui/calendar';
import addTask from '@/service/addTask';
import { useSession } from 'next-auth/react';
import { toast } from '../ui/use-toast';
import { UseFormReturn, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Badge } from '../ui/badge';
import { useAppDispatch } from '@/hooks';
import { ActionTypes } from '@/context/actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getTasksId from '@/service/getTaskById';
import { useQuery } from '@tanstack/react-query';
import updateTask from '@/service/updateTask';
import { useToggle } from '@uidotdev/usehooks';
import { Loader2 } from 'lucide-react';

interface RowSelections {
  unSelectRow?: () => void;
}

export default function AddTaskform({ unSelectRow }: RowSelections) {
  const session = useSession();
  const [isKeyReleased, setisKeyReleased] = useState(false);
  const [tasktags, settasktags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [isupdateForm, setisupdateForm] = useState(false);
  const taskId = searchParams.get('id');
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, toggleLoading] = useToggle(false);

  const [defaultValue, setdefaultValue] = useState<taskInput>({
    due_date: new Date(),
    status: TaskStatus.Not_Started,
    priority: TaskPriority.Low,
    title: '',
    tags: '',
    assignee: '',
    is_standalone: false,
    description: '',
  });

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

  const form = useForm<taskInput>({
    resolver: zodResolver(addtaskSchema),
    defaultValues: defaultValue,
  });

  const result = useQuery(
    ['tasksById'],
    () => getTasksId(session.data?.user.AccessToken, searchParams.get('id')),
    {
      enabled: isupdateForm && session.data?.user ? true : false,
    },
  );

  useEffect(() => {
    setisupdateForm(searchParams.has('id'));
  }, [searchParams]);

  useEffect(() => {
    if (isupdateForm && result.data) {
      const { data } = result.data;
      setdefaultValue((prevState) => ({
        ...prevState,
        ...data,
        description: '',
        due_date: new Date(data.due_date),
      }));
      settasktags(data.tags);
      form.reset({
        ...data,
        due_date: new Date(data.due_date),
        description: '',
        tags: '',
      });
    }
  }, [isupdateForm, result.data]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    form: UseFormReturn<taskInput>,
  ) => {
    const { value } = e.target;
    form.setValue('tags', value);
  };

  const deleteTag = (index: number) => {
    settasktags((prevState) => prevState.filter((tag, i) => i !== index));
  };
  const onkeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    form: UseFormReturn<taskInput>,
  ) => {
    const { key } = e;
    const trimedInput = form.getValues('tags').trim();

    if (key === ',' && trimedInput.length && !tasktags.includes(trimedInput)) {
      e.preventDefault();
      settasktags((prevState) => [...prevState, trimedInput]);
      form.setValue('tags', '');
    }

    if (
      key === 'Backspace' &&
      !form.getValues('tags').length &&
      tasktags.length &&
      isKeyReleased
    ) {
      e.preventDefault();
      const tagsCopy = [...tasktags];
      if (tagsCopy.length > 0) {
        const poppedTag = tagsCopy.pop();
        settasktags(tagsCopy);
        form.setValue('tags', poppedTag ? poppedTag : '');
      }
    }

    setisKeyReleased(false);
  };

  const onkeyuphandler = () => {
    setisKeyReleased(true);
  };

  const onSubmit = async (values: taskInput) => {
    let { tags, ...dataValue } = values;
    toggleLoading(true);
    const task = { ...dataValue, tags: tasktags };
    if (isupdateForm) {
      const { error, data } = await updateTask(
        session.data?.user.AccessToken,
        taskId,
        { ...task },
      );
      if (error) {
        toggleLoading(false);
        return toast({ title: error, variant: 'destructive' });
      }
      form.reset();
      dispatch({ type: ActionTypes.updateTask, payload: data });
      router.push(pathname + '?' + createQueryString('id', null));
      if (unSelectRow) {
        unSelectRow();
      }
      toggleLoading(false);
      return toast({ title: 'Task has been updated Successfully.' });
    } else {
      const { error, data } = await addTask(
        { ...task },
        session.data?.user.AccessToken,
      );
      if (error) {
        toggleLoading(false);
        return toast({ title: error, variant: 'destructive' });
      }
      form.reset();
      dispatch({ type: ActionTypes.taskSheetoogle, payload: false });
      toggleLoading(false);
      return toast({ title: data });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>{field.value}</SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TaskStatus).map((status, index) => (
                    <SelectItem value={status} key={index}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>{field.value}</SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TaskPriority).map((status, index) => (
                    <SelectItem value={status} key={index}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        ' pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="border rounded-md px-2 py-1">
                  <div className="badges w-full space-x-1 space-y-1">
                    {tasktags.map((tag, index) => (
                      <Badge
                        variant={'secondary'}
                        key={index}
                        className="rounded-sm px-2 space-x-1
                       hover:bg-none"
                      >
                        <span>{tag}</span>
                        <Icons.close
                          size={15}
                          className="cursor-pointer"
                          onClick={() => deleteTag(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Task tags"
                    className="border-none outline-none focus:border-none focus:outline-none
                    focus-visible:ring-transparent"
                    {...field}
                    onChange={(e) => onChangeHandler(e, form)}
                    onKeyDown={(e) => onkeyDownHandler(e, form)}
                    onKeyUp={onkeyuphandler}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Note:Press comma (,) to create tag
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignee</FormLabel>
              <FormControl>
                <Input placeholder="Task assigne" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <Fragment>
              <Loader2 size={17} className='mr-2 animate-spin' />
              Please wait
            </Fragment>
          ) : isupdateForm ? (
            'Update Task'
          ) : (
            'Add Task'
          )}
        </Button>
      </form>
    </Form>
  );
}
