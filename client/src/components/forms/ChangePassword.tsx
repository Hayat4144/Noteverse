'use client';
import React, { Fragment, useState } from 'react';
import { changePasswordSchema } from '@/lib/validation/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { useToggle } from '@uidotdev/usehooks';
import { Loader2 } from 'lucide-react';
import changePassword from '@/service/changepassword';
import { useSession } from 'next-auth/react';

type Inputs = z.infer<typeof changePasswordSchema>;

export const ChangePassword = (props: {}) => {
  const [isLoading, setisLoading] = useToggle(false);
  const session = useSession();

  const form = useForm<Inputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      confirmpassword: '',
      password: '',
    },
  });
  const onSubmit = async (values: Inputs) => {
    setisLoading(true);
    const { data, error } = await changePassword(
      values,
      session.data.user.AccessToken,
    );
    setisLoading(false);
    if (error) return toast({ title: error, variant: 'destructive' });
    form.reset();
    toast({ title: data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your old password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="newpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Re-enter you password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button disabled={isLoading}>
          {isLoading ? (
            <Fragment>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Please wait</span>
            </Fragment>
          ) : (
            <span>Change password</span>
          )}
        </Button>
      </form>
    </Form>
  );
};
