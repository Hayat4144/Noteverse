import { cn } from '@/lib/utils';
import React from 'react';

interface IconswithTextProps extends React.HTMLAttributes<HTMLDivElement> {
  icons: React.ReactNode;
  text: string;
}
export default function Iconwithtext({
  icons,
  text,
  className,
  ...props
}: IconswithTextProps) {
  const classNames = cn('flex items-center space-x-1', className);
  return (
    <div className={classNames} {...props}>
      {icons}
      <span className="text-sm">{text}</span>
    </div>
  );
}
