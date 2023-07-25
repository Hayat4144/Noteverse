'use client'
import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from '../../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Icons } from '../../Icons';

export default function Taskview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer hover:bg-muted hover:rounded-md py-1 px-2">
          <h1>Tasks</h1>
          <Icons.chevronDown
            size={16}
            className="text-muted-foreground translate-y-2"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-2 mx-4" align="start">
        conllsdkjfklsdjf
        <Command>
          <CommandInput placeholder="Select new role..." />
          <CommandList>
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup>
              <CommandItem className="teamaspace-y-3 flex flex-col items-start px-4 py-2">
                <p>Viewer</p>
                <p className="text-sm text-muted-foreground">
                  Can view and comment.
                </p>
              </CommandItem>
              <CommandItem className="teamaspace-y-3 flex flex-col items-start px-4 py-2">
                <p>Developer</p>
                <p className="text-sm text-muted-foreground">
                  Can view, comment and edit.
                </p>
              </CommandItem>
              <CommandItem className="teamaspace-y-3 flex flex-col items-start px-4 py-2">
                <p>Billing</p>
                <p className="text-sm text-muted-foreground">
                  Can view, comment and manage billing.
                </p>
              </CommandItem>
              <CommandItem className="teamaspace-y-3 flex flex-col items-start px-4 py-2">
                <p>Owner</p>
                <p className="text-sm text-muted-foreground">
                  Admin-level access to all resources.
                </p>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
