import React from 'react';
import { Skeleton } from './ui/skeleton';


export default function Loading() {
  return (
    <div className="flex items-center space-x-4 my-5">
      <Skeleton className="h-12 w-12 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
