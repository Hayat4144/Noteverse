import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '../Icons';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { toast } from '../ui/use-toast';

export default function Themedropdown() {
  const { setTheme } = useTheme();
  const session = useSession();

  const logout = () => {
    signOut({ redirect: true, callbackUrl: '/signin' });
    toast({ title: 'you are successfully logout.' });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'} className="w-full">
          {session.data?.user?.name || 'Username'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full min-w-[13.5rem] mb-2"
        align="start"
      >
        <DropdownMenuItem className="cursor-pointer" onSelect={() => logout()}>
          <Icons.logout size={18} className="mr-2 h-4 w-4" />
          <span> Logout</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="m-1">
              <DropdownMenuItem onSelect={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme('dark')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme('dark')}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
