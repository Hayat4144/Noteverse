'use client';

import React, { Fragment } from 'react';
import { resetPasswordSchema } from '@/lib/validation/auth';
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
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import resetPassword from '@/service/resetPassword';

type Inputs = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordform() {
  const [isLoading, setisLoading] = useToggle(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const session = useSession();
  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      confirmpassword: '',
      password: '',
    },
  });
  const onSubmit = async (values: Inputs) => {
    setisLoading(true);
    const { data, error } = await resetPassword(
      values.password,
      token,
      session.data.user.AccessToken,
    );
    setisLoading(false);
    if (error) return toast({ title: error, variant: 'destructive' });
    form.reset();
    toast({ title: data });
    router.push('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="password"
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
            <span>Reset password</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
