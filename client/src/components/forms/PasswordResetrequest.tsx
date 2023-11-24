'use client';
import React, { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { BASE_URL } from '@/lib/BASE_URL';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '../ui/use-toast';

export default function PasswordResetrequest() {
  const [isLoading, setisLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [message, setmessage] = useState('');
  const sesssion = useSession();

  const submitHandler = async () => {
    setisLoading(true);
    const token = sesssion.data.user.AccessToken;
    const response = await fetch(
      `${BASE_URL}/api/auth/v/resetpassword/request`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const { data, error } = await response.json();
    setisLoading(false);
    if (error) {
      return toast({ title: error, variant: 'destructive' });
    }
    setmessage(data);
    setopen(true);
    setTimeout(() => {
      setopen(false);
      setmessage('');
    }, 5000);
  };
  return (
    <Fragment>
      <AlertDialog open={open} onOpenChange={setopen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        aria-label="Reset password"
        variant="link"
        onClick={submitHandler}
        disabled={isLoading}
      >
        {isLoading ? (
          <p>
            Please wait <span className="animate-bounce">...</span>
          </p>
        ) : (
          'Reset password'
        )}
      </Button>
    </Fragment>
  );
}
