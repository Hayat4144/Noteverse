'use client';
import React from 'react';
import { authSchma } from '@/lib/validation/auth';
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
import { Icons } from '../Icons';
import { signIn, useSession } from 'next-auth/react';

type Inputs = z.infer<typeof authSchma>;

export default function Signinform() {
  const [isPending, startTransition] = React.useTransition();
  const m = useSession()
  console.log(m)
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchma),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: Inputs) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      // callbackUrl:'/'
    });
    console.log(result)
    if (result?.error) {
      alert(`Error:${result.error}`);
    } else {
      alert(`Success: login successful.`);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter you email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter you password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
