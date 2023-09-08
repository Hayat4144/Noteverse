import Editor from '@/components/Editor/Editor';
import { authOptions } from '@/lib/auth';
import getNotebook from '@/service/getNotebook';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/signin');
  }
  const { data } = await getNotebook(session.user.AccessToken, params.id);
  return (
    <div className="w-full h-screen my-2">
      <Editor data={data} />
    </div>
  );
}
