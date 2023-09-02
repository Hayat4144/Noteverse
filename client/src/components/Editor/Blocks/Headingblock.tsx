import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
} from '@/components/ui/Heading';
import { cn } from '@/lib/utils';
import React from 'react';

export const Heading1block = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <TypographyH1 ref={ref} {...props} className={cn('', className)}>
    {props.children}
  </TypographyH1>
));

export const Heading2block = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <TypographyH2 ref={ref} {...props} className={cn('', className)}>
    {props.children}
  </TypographyH2>
));

export const Heading3block = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <TypographyH3 ref={ref} {...props} className={cn('', className)}>
    {props.children}
  </TypographyH3>
));
export const Heading4block = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <TypographyH4 ref={ref} {...props} className={cn('', className)}>
    {props.children}
  </TypographyH4>
));
export const Heading5block = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <TypographyH5 ref={ref} {...props} className={cn('', className)}>
    {props.children}
  </TypographyH5>
));
export const Heading6block = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <TypographyH6 ref={ref} {...props} className={cn('', className)}>
    {props.children}
  </TypographyH6>
));
