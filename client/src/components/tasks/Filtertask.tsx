'use client'

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
    CommandItem,
  } from '../ui/command';
import { Icons } from '../Icons';


export default function Taskfilter() {
  return (
    <Popover>
    <PopoverTrigger asChild>
      <span className='cursor-pointer'>filter</span>
    </PopoverTrigger>
    <PopoverContent className="p-2 mx-4" align="start">
      <Command>
        <CommandInput placeholder="filter by..." />
        <CommandList>
          <CommandEmpty>No filter field found.</CommandEmpty>
          <CommandGroup>
            <CommandItem className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2">
              <Icons.text size={18}/> 
              <p className="text-sm text-muted-foreground">
              Task title
              </p>
            </CommandItem>
            <CommandItem className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2">
              <Icons.downCircle size={18}/> 
              <p className="text-sm text-muted-foreground">
               Priority
              </p>
            </CommandItem>
            <CommandItem className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2">
              <Icons.loader size={18}/>
              <p className="text-sm text-muted-foreground">
                Status
              </p>
            </CommandItem>
            <CommandItem className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2">
             <Icons.calendar size={18}/>
              <p className="text-sm text-muted-foreground">
               Due date
              </p>
            </CommandItem>
            <CommandItem className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2">
              <Icons.user size={18}/>
              <p className="text-sm text-muted-foreground">
               Assignee
              </p>
            </CommandItem>
            <CommandItem className="teamaspace-y-3 flex items-center space-x-3 px-4 py-2">
              <Icons.tag size={18}/>
              <p className="text-sm text-muted-foreground">
               Tags
              </p>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
  )
}
