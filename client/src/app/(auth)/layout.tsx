import React from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface AuthlayoutProps {
  children: React.ReactNode;
}

export default function Authlayout({ children }: AuthlayoutProps) {
  return (
    <main className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={'/image/auth-layout.jpg'}
          alt="note image"
          priority
          fill
          className="absolute inset-0 object-cover"
        />
      </AspectRatio>
      <section className="container absolute top-1/2 col-span-1 flex  -translate-y-1/2 items-center justify-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </section>
    </main>
  );
}
