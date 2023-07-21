'use client';
import React,  {useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Taskview from './Taskview';
import TaskfilteSort from './TaskfilteSort';
import { Button } from '../ui/button';


export default function TaskfilterView() {
  const [activetab, setActivetab] = useState('Task')

  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="view_tabs">
        <div className="md:hidden">
          <Taskview />
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Button variant={activetab === 'Task' ? 'secondary' :'ghost'}
          onClick={()=>setActivetab('Task')}
          className={`${activetab !== 'Task' ? 'text-muted-foreground hover:bg-transparent' : ''}`}
          >
            Tasks
          </Button>
          <Button variant={activetab === 'By Board' ? 'secondary' :'ghost'} 
          onClick={()=>setActivetab('By Board')}
          className={`${activetab !== 'By Board' ? 'text-muted-foreground hover:bg-transparent' : ''}`}>
            By Board
          </Button>
        </div>
      </div>
      <TaskfilteSort />
    </div>
  );
}
