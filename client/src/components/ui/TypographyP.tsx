import { cn } from '@/lib/utils';
import React from 'react';

const TypographyP = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
    {...props}
  />
));

TypographyP.displayName = 'Paragraph';

export { TypographyP };
