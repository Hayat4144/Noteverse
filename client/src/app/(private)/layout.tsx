import AsideNav from '@/components/Navbar/AsideNav';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <main className="flex">
      <AsideNav className="w-[14rem] h-screen fixed left-0 bottom-0 top-0" />
      {children}
    </main>
  );
}
