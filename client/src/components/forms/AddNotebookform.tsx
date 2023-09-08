import React, { Fragment, useState } from 'react';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import addNotebookutil from '@/service/addNotebook';
import { useSession } from 'next-auth/react';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import updateNotebook from '@/service/updateNotebooktitle';

interface addNotebookformProps {
  toggleDialog: (value: boolean) => void;
  action: 'add' | 'update';
  titlevalue?: string;
  id?: string;
}

const formSchema = z.object({
  title: z
    .string()
    .min(4, { message: 'title must contain at least 4 character(s)' })
    .max(50, { message: 'title must contain at least 4 character(s)' }),
});

export default function AddNotebookform({
  toggleDialog,
  action,
  id,
  titlevalue,
}: addNotebookformProps) {
  const [isLoading, setisLoading] = useState(false);
  const session = useSession();
  const queryClient = useQueryClient();

  const refetchQuery = () => {
    queryClient.invalidateQueries(['notebook']);
    queryClient.refetchQueries(['noteboook']);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: action === 'update' && titlevalue ? titlevalue : '',
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setisLoading(true);
    const token = session.data?.user.AccessToken;
    const { data, error } =
      action === 'update' && id
        ? await updateNotebook(token, value.title, id)
        : await addNotebookutil(token, value.title);
    if (error) {
      toast({
        title: error,
        variant: 'destructive',
      });
      setisLoading(false);
      return;
    }
    setisLoading(false);
    toast({ title: data });
    refetchQuery();
    form.reset();
    toggleDialog(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoading ? (
            <Fragment>
              <Loader2 size={17} className="animate-spin mr-2" />
              <span>Please wait</span>
            </Fragment>
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </Form>
  );
}
