import AsideNav from '@/components/Navbar/AsideNav';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function Home() {
  return (
    <main className="flex">
      <AsideNav className="h-screen w-[15rem]" />
      <div>hello</div>
    </main>
  );
}
