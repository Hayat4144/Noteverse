import { InlineCode } from '@/components/ui/Inlinecode';
import React from 'react';
import { RenderElementProps } from 'slate-react';

export default function Codelineblock(
  props: RenderElementProps & { style?: React.CSSProperties },
) {
  return (
    <InlineCode {...props.attributes} style={props.style}>
      {props.children}
    </InlineCode>
  );
}
