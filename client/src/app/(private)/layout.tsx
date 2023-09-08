import AsideNav from '@/components/Navbar/AsideNav';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <main className="flex">
      <AsideNav className="w-[18rem] h-screen sticky top-0" />
      {children}
    </main>
  );
}
