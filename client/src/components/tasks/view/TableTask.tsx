'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { SelectionRow } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import ActionComponent from './ActionComponent';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AddTaskform from '@/components/forms/AddTaskform';
import { Paignation } from '@/components/ui/pagination';
import { number, string } from 'zod';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalResults: number;
  resultPerPage: number;
}

export default function TableTask<TData, TValue>({
  columns,
  data,
  totalResults,
  resultPerPage,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<SelectionRow>({});
  const searchParams = useSearchParams();
  const [isOpen, setisOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setcurrentPage] = useState<number>(1);
  console.log(totalResults, resultPerPage);
  const totalPages = Math.ceil(totalResults / resultPerPage);
  console.log(totalPages);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const PageChangeHanlder = (pageNumber: number) => {
    setcurrentPage(pageNumber);
  };

  useEffect(() => {
    if (totalPages > 1) {
      router.push(pathname + '?' + createQueryString('page', `${currentPage}`));
    }
  }, [currentPage]);

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams();
      searchParams.forEach((paramValue, paramName) => {
        // Append all existing parameters except the one we want to remove
        if (paramName !== name) {
          params.append(paramName, paramValue);
        }
      });

      // Append the new value if it's not null
      if (value !== null) {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    setisOpen(searchParams.has('id'));
  }, [searchParams]);

  const updateSheetChangeHandler = () => {
    router.push(pathname + '?' + createQueryString('id', null));
  };

  const unSelectRow = () => {
    setRowSelection({});
  };

  return (
    <Fragment>
      <ActionComponent selectionRow={rowSelection} unSelectRow={unSelectRow} />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Task has been found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex">
        <div className="flex-2 text-sm text-muted-foreground my-5">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {totalResults > 20 && (
          <Paignation
            className="m-auto"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={PageChangeHanlder}
          />
        )}
      </div>
      <Sheet open={isOpen} onOpenChange={updateSheetChangeHandler}>
        <SheetTrigger></SheetTrigger>
        <SheetContent side={'left'} className="overflow-auto">
          <AddTaskform unSelectRow={unSelectRow} />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
