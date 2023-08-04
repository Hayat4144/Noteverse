'use client';

import { Icons } from '@/components/Icons';
import Iconwithtext from '@/components/Iconwithtext';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { taskObject } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<taskObject>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: () => (
      <Iconwithtext icons={<Icons.text size={18} />} text={'Title'} />
    ),
  },
  {
    accessorKey: 'status',
    header: () => (
      <Iconwithtext icons={<Icons.loader size={18} />} text={'Status'} />
    ),
  },
  {
    accessorKey: 'assignee',
    header: () => (
      <Iconwithtext icons={<Icons.user size={18} />} text={'Assignee'} />
    ),
  },
  {
    accessorKey: 'priority',
    header: () => (
      <Iconwithtext icons={<Icons.downCircle size={18} />} text={'Priority'} />
    ),
  },
  {
    accessorKey: 'due_date',
    header: () => (
      <Iconwithtext icons={<Icons.downCircle size={18} />} text={'Due Date'} />
    ),
  },
  {
    accessorKey: 'tags',
    header: () => <Iconwithtext icons={<Icons.tag size={18} />} text={'Tag'} />,
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      return (
        <div className="md:space-x-1">
          {tags.map((tags, index) => {
            return (
              <Badge variant={'default'} key={index}>
                {tags}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
];
