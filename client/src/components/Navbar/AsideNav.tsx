'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Icons } from '../Icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AsideNav({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNoteCollapsed, setisNoteCollapsed] = useState(true);
  const pathname = usePathname();
  return (
    <nav className={cn('border-r', className)}>
      <div className="space-y-4 pt-4 pb-2 flex flex-col h-full w-full">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Noteverse
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === '/' ? 'secondary' : 'link'}
              asChild
              className="w-full justify-start hover:no-underline hover:bg-accent"
            >
              <Link href={'/'} className="space-x-2">
                <Icons.home size={17} />
                <span className={` ${isCollapsed ? 'hidden' : ''}`}>Home</span>
              </Link>
            </Button>
            <Button
              variant={pathname === '/tasks' ? 'secondary' : 'link'}
              asChild
              className="w-full justify-start hover:no-underline hover:bg-accent"
            >
              <Link href={'/tasks'} className="space-x-2">
                <Icons.task size={17} />
                <span className={` ${isCollapsed ? 'hidden' : ''}`}>Tasks</span>
              </Link>
            </Button>
            <Button
              variant={pathname === '/reminder' ? 'secondary' : 'link'}
              asChild
              className="w-full justify-start hover:no-underline hover:bg-accent"
            >
              <Link href={'/reminder'} className="space-x-2">
                <Icons.bell size={17} />
                <span className={` ${isCollapsed ? 'hidden' : ''}`}>
                  Reminders
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-1 flex-1">
          <div className="space-y-1 flex flex-col overflow-y-auto">
            <h2
              className="mb-1 px-4 text-lg font-semibold tracking-tight 
            flex items-center justify-between cursor-pointer"
              onClick={() => setisNoteCollapsed(!isNoteCollapsed)}
            >
              <span>Notebook</span>
              {isNoteCollapsed ? (
                <Icons.chevronUp size={18} />
              ) : (
                <Icons.chevronDown size={18} />
              )}
            </h2>
            {isNoteCollapsed && (
              <div className="pl-6 space-y-1">
                <h3>Note 1</h3>
                <h3>Note 2</h3>
                <h3>Note 3</h3>
              </div>
            )}
          </div>
        </div>
        <div className="py-2 px-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full justify-start space-x-2 h-12 py-3"
                variant={'outline'}
              >
                <Avatar>
                  <AvatarImage
                    src="http://github.com/hayat4144.png"
                    alt="@Hayat4144"
                  />
                  <AvatarFallback>Cn</AvatarFallback>
                </Avatar>
                <h3 className="flex items-center justify-between space-x-8">
                  <span>Hayat ilyas</span>
                  <Icons.horizontalThreeDots size={18} />
                </h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[13.8rem]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={'profile'}>
                    <Icons.user className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={'/notification'}>
                    <Icons.notification className="mr-2 h-4 w-4" />
                    <span>Notification</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={'/settings'}>
                    <Icons.settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  <Icons.logout className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
