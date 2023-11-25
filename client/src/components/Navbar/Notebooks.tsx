import fetchNotebook from '@/service/fetchNotebook';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, Fragment } from 'react';
import { toast } from '../ui/use-toast';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useToggle } from '@uidotdev/usehooks';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import dynamic from 'next/dynamic';

const DeleteModal = dynamic(() => import('./DeleteModal'));
const EditNotebook = dynamic(() => import('../forms/EditNotebook'));

export default function Notebooks() {
  const session = useSession();
  const [notebook, setNotebook] = useState([]);
  const [isFetch, toggleFetch] = useToggle(false);

  const result = useQuery(
    ['noteboook'],
    () => {
      return fetchNotebook(session.data?.user.AccessToken);
    },
    { enabled: isFetch },
  );

  useEffect(() => {
    if (session.data?.user.AccessToken) {
      toggleFetch(true);
      return;
    }
  }, [session]);

  useEffect(() => {
    if (result.data) {
      const { data, error } = result.data as any;
      if (error) {
        toast({ title: error, variant: 'destructive' });
        return;
      }
      setNotebook(data);
    }
  }, [result.data, result.isLoading]);

  return (
    <Fragment>
      {result.isLoading ? (
        <div className="space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[50%]" />
        </div>
      ) : (
        notebook.map((item: any) => (
          <div key={item.id}>
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: 'justify-between w-full',
                }),
                'py-1 h-8',
              )}
            >
              <Link href={`/notebook/${item.id}`}>
                {item.title.length < 11
                  ? item.title
                  : `${item.title.substring(0, 10)}...`}
              </Link>
              <div className={`flex items-center space-x-2`}>
                <EditNotebook id={item.id} title={item.title} />
                <DeleteModal id={item.id} />
              </div>
            </div>
          </div>
        ))
      )}
    </Fragment>
  );
}
