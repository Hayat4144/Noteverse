'use client'
import React from 'react';
import { Icons } from '../../Icons';
import Iconwithtext from '../../Iconwithtext';
import { TaskResponse, taskObject } from '@/types';
import { Badge } from '../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';

export default function TableTask({ task }: { task: TaskResponse | undefined}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Iconwithtext icons={<Icons.text size={18} />} text={'Title'} />
          </TableHead>
          <TableHead>
            <Iconwithtext icons={<Icons.loader size={18} />} text={'Status'} />
          </TableHead>
          <TableHead>
            <Iconwithtext icons={<Icons.user size={18} />} text={'Assignee'} />
          </TableHead>
          <TableHead>
            <Iconwithtext
              icons={<Icons.downCircle size={18} />}
              text={'Priority'}
            />
          </TableHead>
          <TableHead>
            <Iconwithtext
              icons={<Icons.calendar size={18} />}
              text={'Due date'}
            />
          </TableHead>
          <TableHead>
            <Iconwithtext icons={<Icons.tag size={18} />} text={'Tags'} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {task?.data.map((item) => (
          <TableRow key={item?.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.assignee} </TableCell>
            <TableCell className="">{item.priority}</TableCell>
            <TableCell className="">{item.due_date}</TableCell>
            <TableCell className="md:space-x-1 space-y-1 ">
              {item.tags.map((tag, index) => (
                <Badge key={index} className="cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
