import { RenderElementProps } from 'slate-react';

const LinkBlock = (
  props: RenderElementProps & { style?: React.CSSProperties },
) => {
  const { element } = props;
  return (
    <a
      style={props.style}
      {...props.attributes}
      href={(element as any).url}
      className="underline cursor-pointer"
    >
      {props.children}
    </a>
  );
};

export default LinkBlock;
