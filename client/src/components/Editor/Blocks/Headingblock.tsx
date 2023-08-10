import { TypographyH1, TypographyH2, TypographyH3 } from '@/components/ui/Heading';
import React from 'react';
import { RenderElementProps } from 'slate-react';

export const Heading1block = (props: RenderElementProps) => {
  return <TypographyH1 {...props.attributes}>{props.children}</TypographyH1>;
};

export const Heading2block = (props: RenderElementProps) => {
  return <TypographyH2 {...props.attributes}>{props.children}</TypographyH2>;
};

export const Heading3block = (props: RenderElementProps) => {
  return <TypographyH3 {...props.attributes}>{props.children}</TypographyH3>;
};
