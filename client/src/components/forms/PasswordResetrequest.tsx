'use client';
import React, { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import { BASE_URL } from '@/lib/BASE_URL';
import { toast } from '../ui/use-toast';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';

export default function PasswordResetrequest() {
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState('');
  const [open, setOpen] = useState(false);

  const submitHandler = async () => {
    setisLoading(true);
    const response = await fetch(
      `${BASE_URL}/api/auth/v/resetpassword/request?email=${email}`,
      {
        method: 'GET',
      },
    );
    const { data, error } = await response.json();
    setisLoading(false);
    if (error) {
      return toast({ title: error, variant: 'destructive' });
    }
    toast({ title: data });
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="link">reset password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password request</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Fragment>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                please wait...
              </Fragment>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
