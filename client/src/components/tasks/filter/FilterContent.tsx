'use client';
import React, { Fragment } from 'react';
import { useAppSelector } from '@/hooks';
import dynamic from 'next/dynamic';
const BadgePopover = dynamic(() => import('./BadgePopover'));
const AddFilterBadge = dynamic(() => import('./AddFilterBadge'));

export default function FilterContent() {
  const { filter, isOpen } = useAppSelector((state) => state.Filter);
  return (
    <Fragment>
      {filter.length > 0 && isOpen && (
        <section className="my-5 flex items-center space-x-2">
          <BadgePopover />
          <AddFilterBadge />
        </section>
      )}
    </Fragment>
  );
}
