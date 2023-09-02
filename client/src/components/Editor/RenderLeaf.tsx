import { RenderLeafProps } from 'slate-react';

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

  if (leaf.highlight) {
    const style = { backgroundColor: leaf.highlight };
    children = <span style={style}>{children}</span>;
  }
  if (leaf.fontSize) {
    const style = { fontSize: leaf.fontSize };
    children = <span style={style}>{children}</span>;
  }

  if (leaf.color) {
    const style = { color: leaf.color };
    children = <span style={style}>{children}</span>;
  }

  if (leaf.fontFamily) {
    const style = { fontFamily: leaf.fontFamily };
    children = <span style={style}>{children}</span>;
  }

  if (leaf.strike) {
    children = <s>{children}</s>;
  }

  return <span {...attributes}>{children}</span>;
};

export default renderLeaf;
