import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const TypographyH1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          className,
        )}
        {...props}
      />
    );
  },
);
const TypographyH2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'scroll-m-20 text-3xl font-semibold tracking-tight',
          className,
        )}
        {...props}
      />
    );
  },
);
const TypographyH3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          className,
        )}
        {...props}
      />
    );
  },
);
const TypographyH4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight',
          className,
        )}
        {...props}
      />
    );
  },
);
const TypographyH5 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn('scroll-m-20 tracking-tight text-xl', className)}
        {...props}
      />
    );
  },
);
const TypographyH6 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h6
        ref={ref}
        className={cn('scroll-m-20 tracking-tight text-base', className)}
        {...props}
      />
    );
  },
);

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
};
