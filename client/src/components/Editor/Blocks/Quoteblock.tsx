import { BlockQuote } from '@/components/ui/blockQuote';
import React from 'react';
import { RenderElementProps } from 'slate-react';

const Quoteblock = (props: RenderElementProps) => {
  return <BlockQuote {...props}>{props.children}</BlockQuote>;
};

export default Quoteblock;
