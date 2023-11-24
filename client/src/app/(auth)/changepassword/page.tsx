import React from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { ChangePassword } from '@/components/forms/ChangePassword';

export default function page() {
  return (
    <Card className="max-w-lg w-full">
      <CardHeader className="space-y-1">
        <CardTitle>Change your password</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ChangePassword />
      </CardContent>
    </Card>
  );
}
