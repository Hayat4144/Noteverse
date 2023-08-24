import { Fragment } from 'react';
import { DefaultLeaf, RenderLeafProps } from 'slate-react';

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  if (leaf.strike) {
    children = <s>{children}</s>;
  }

  return <span {...attributes}>{children}</span>;
};

export default renderLeaf;
