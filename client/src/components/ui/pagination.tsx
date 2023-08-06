'use client';

import React, { Fragment } from 'react';
import { Button } from './button';
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Paignation = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}: PaginationProps) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  return (
    <Fragment>
      <div className={cn('', className)} {...props}>
        <ul className="flex items-center space-x-2">
          <Button
            variant={'outline'}
            size={'sm'}
            disabled={currentPage === 1 ? true : false}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Icons.chevronLeft size={18} /> Previous
          </Button>
          {pageNumbers.map((pageNumber, index) => (
            <li key={index}>
              <Button
                variant={pageNumber === currentPage ? 'secondary' : 'outline'}
                size={'sm'}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            </li>
          ))}
          <Button
            variant={'outline'}
            size={'sm'}
            disabled={currentPage === totalPages ? true : false}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Icons.chevronRight size={18} /> Next
          </Button>
        </ul>
      </div>
    </Fragment>
  );
};

export { Paignation };
