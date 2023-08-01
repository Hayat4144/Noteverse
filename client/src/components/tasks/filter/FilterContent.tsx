'use client';
import React, { Fragment } from 'react';
import AddFilterBadge from './AddFilterBadge';
import BadgePopover from './BadgePopover';
import { useAppSelector } from '@/hooks';

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
