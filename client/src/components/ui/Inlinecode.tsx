import React from 'react';
import { cn } from '@/lib/utils';
import { CodeProps } from '@/types';

const InlineCode = React.forwardRef<HTMLPreElement, CodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className,
        )}
        {...props}
      />
    );
  },
);

export { InlineCode };
