import { Icons } from '@/components/Icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useEditorConfig from '@/hooks/useEditorConfig';
import Image from 'next/image';
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react';

const ImageBlock = (props: RenderElementProps) => {
  const { element } = props;
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { editorUtiliy } = useEditorConfig(editor);
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      contentEditable={false}
      {...props.attributes}
      className="mx-2 relative"
    >
      {props.children}
      <AspectRatio ratio={16 / 7} className="my-5">
        {props.children}
        <Image
          src={element.url}
          fill
          alt="Gray by Drew Beamer"
          className={`object-fill rounded-md`}
        />
        {selected && focused && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onMouseDown={(e) => e.preventDefault()}
                asChild
                onClick={(e) => {
                  e.preventDefault();
                  console.log('removed');
                  editorUtiliy.removeImage(editor, path);
                }}
              >
                <Button
                  variant={'secondary'}
                  size={'icon'}
                  className="absolute top-2 left-3 text-red-800 hover:text-red-900"
                >
                  <Icons.trash size={17} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </AspectRatio>
    </div>
  );
};

export default ImageBlock;
