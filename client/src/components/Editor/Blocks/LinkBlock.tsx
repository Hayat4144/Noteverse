import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RenderElementProps } from 'slate-react';

const LinkBlock = (
  props: RenderElementProps & { style?: React.CSSProperties },
) => {
  const { element } = props;
  return (
    <a
      style={props.style}
      className={cn(
        buttonVariants({ variant: 'link' }),
        'underline cursor-pointer px-0 text-base',
      )}
      {...props.attributes}
      href={(element as any).url}
    >
      {props.children}
    </a>
  );
};

export default LinkBlock;
