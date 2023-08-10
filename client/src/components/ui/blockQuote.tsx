import React, { HtmlHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BlockquoteProps extends React.HtmlHTMLAttributes<HTMLQuoteElement> {
  asChild?: boolean;
}

const BlockQuote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn('border-l-2 pl-6 my-3 italic', className)}
        {...props}
      />
    );
  },
);

export { BlockQuote };
