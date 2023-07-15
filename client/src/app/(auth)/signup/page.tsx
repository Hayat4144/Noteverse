import SignupForm from '@/components/forms/SignupForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export default function Signup() {
  return (
    <Card className="max-w-lg w-full">
      <CardHeader className="space-y-1">
        <CardTitle>Unlock Your Potential: Register Today!</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SignupForm />
      </CardContent>
      <CardFooter className="grid gap-4">
      <div className="single-signin relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 tex-2xl">
              Do you have an account?
            </span>
          </div>
        </div>
        <Button variant={'secondary'}>
          <Link href={'/signin'}>Signin</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
