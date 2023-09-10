'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Icons } from '../Icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToggle } from '@uidotdev/usehooks';
import AddNotebookform from '../forms/AddNotebookform';
import Notebooks from './Notebooks';
import { ScrollArea } from '../ui/scroll-area';
import Themedropdown from './Theme-dropdown';
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AsideNav({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNoteCollapsed, setisNoteCollapsed] = useState(true);
  const pathname = usePathname();
  const [isDialogOpen, toggleDialog] = useToggle(false);

  return (
    <nav className={cn('border-r', className)}>
      <div className="space-y-2 pt-4 pb-2 flex flex-col h-full w-full">
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
            <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
              <DialogTrigger asChild>
                <Button
                  variant={'ghost'}
                  className="w-full justify-start space-x-1 hover:no-underline hover:bg-accent"
                >
                  <Icons.add size={17} />
                  <span className={` ${isCollapsed ? 'hidden' : ''}`}>
                    New Notebook
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new Notebook</DialogTitle>
                  <AddNotebookform toggleDialog={toggleDialog} action="add" />
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
              <ScrollArea className="pl-2 h-80">
                <Notebooks />
              </ScrollArea>
            )}
          </div>
        </div>
        <div className="px-3 w-full">
          <Themedropdown />
        </div>
      </div>
    </nav>
  );
}
