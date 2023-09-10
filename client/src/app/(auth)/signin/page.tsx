import Signinform from '@/components/forms/Signinform';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export default function Signin() {
  return (
    <Card className="max-w-lg w-full">
      <CardHeader className="space-y-1">
        <CardTitle>Signin</CardTitle>
        <CardDescription className="">
          choose your preffered signin method
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <OAuthSignin />
        <div className="single-signin relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div> */}
        <Signinform />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          <span className="mr-1 hidden sm:inline-block">
            Don&apos;t have an account?
          </span>
          <Link
            aria-label="Sign up"
            href="/signup"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign up
          </Link>
        </div>
        <Link
          aria-label="Reset password"
          href="/signin/reset-password"
          className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
        >
          Reset password
        </Link>
      </CardFooter>{' '}
    </Card>
  );
}
