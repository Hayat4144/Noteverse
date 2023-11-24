import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ResetPasswordform from '@/components/forms/ResetPasswordform';

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { token } = searchParams;
  return (
    <Card className="max-w-lg w-full">
      <CardHeader className="space-y-1">
        <CardTitle>Reset your password</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {token ? (
          <ResetPasswordform />
        ) : (
          <div>Your link is broken. Please check again</div>
        )}
      </CardContent>
    </Card>
  );
}
