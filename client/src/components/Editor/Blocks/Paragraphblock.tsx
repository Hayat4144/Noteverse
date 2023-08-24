import { TypographyP } from '@/components/ui/TypographyP';
import React from 'react';
import { RenderElementProps } from 'slate-react';

const Paragraphblock = (
  props: RenderElementProps & { style?: React.CSSProperties },
) => {
  return (
    <TypographyP {...props} style={props.style}>
      {props.children}
    </TypographyP>
  );
};

export default Paragraphblock;
