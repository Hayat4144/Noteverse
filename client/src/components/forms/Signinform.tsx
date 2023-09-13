'use client';
import React, { Fragment } from 'react';
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
import { signIn } from 'next-auth/react';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useToggle } from '@uidotdev/usehooks';
import { Loader2 } from 'lucide-react';

type Inputs = z.infer<typeof authSchma>;

export default function Signinform() {
  const [isLoading, setisLoading] = useToggle(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchma),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const onSubmit = async (values: Inputs) => {
    setisLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.error) {
      setisLoading(false);
      toast({ title: result.error, variant: 'destructive' });
    } else {
      setisLoading(false);
      toast({ title: 'You are successfully signin.' });
      router.push('/');
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
        <Button disabled={isLoading}>
          {isLoading ? (
            <Fragment>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Please wait</span>
            </Fragment>
          ) : (
            <span>Signin</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
