import { TypographyP } from '@/components/ui/TypographyP';
import React from 'react';
import { RenderElementProps } from 'slate-react';

const Paragraphblock = (props: RenderElementProps) => {
  return <TypographyP {...props}>{props.children}</TypographyP>;
};

export default Paragraphblock;
