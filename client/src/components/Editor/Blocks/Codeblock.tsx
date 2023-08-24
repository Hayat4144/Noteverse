import React from 'react';
import { RenderElementProps } from 'slate-react';

const Codeblock = (
  props: RenderElementProps & { style?: React.CSSProperties },
) => {
  return (
    <pre
      className="mt-2 w-full  rounded-md bg-slate-950 p-4 border"
      style={props.style}
      {...props.attributes}
    >
      <code className="text-white">{props.children}</code>
    </pre>
  );
};

export default Codeblock;
