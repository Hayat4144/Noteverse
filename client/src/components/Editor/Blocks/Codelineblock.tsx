import { InlineCode } from '@/components/ui/Inlinecode';
import React from 'react';
import { RenderElementProps } from 'slate-react';

export default function Codelineblock(props: RenderElementProps) {
  return <InlineCode {...props.attributes}>{props.children}</InlineCode>;
}
