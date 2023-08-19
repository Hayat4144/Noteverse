import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useEditorConfig from '@/hooks/useEditorConfig';
import { cn, isValidUrl } from '@/lib/utils';
import React, { Fragment } from 'react';
import { useSlate } from 'slate-react';

export default function Toolbar() {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  const fileuploadChange = (files: FileList) => {
    if (files && files.length > 0) {
      editorUtiliy.updloadImagehandler(editor, files);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center space-x-3 flex-wrap">
        <MarkButton format="bold"></MarkButton>
        <MarkButton format="italic"></MarkButton>
        <MarkButton format="underline"></MarkButton>
        <MarkButton format="subscript"></MarkButton>
        <MarkButton format="supscript"></MarkButton>
        <BlockButton format="heading"></BlockButton>
        <BlockButton format="paragraph"></BlockButton>
        <BlockButton format="headingTwo"></BlockButton>
        <BlockButton format="bulletedList"></BlockButton>
        <BlockButton format="numberList"></BlockButton>
        <Button onClick={() => editorUtiliy.toggleLink(editor, 'link')}>
          Link
        </Button>

        <Button
          onClick={(e) => {
            e.preventDefault();
            const userUrl = prompt('Enter your image url');
            if (userUrl && !isValidUrl(userUrl)) {
              alert('it is not valid url');
              return;
            }
            userUrl && editorUtiliy.insertImage(editor, userUrl);
          }}
        >
          <Icons.image size={19} />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Share</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[520px]">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-semibold">Share preset</h3>
              <p className="text-sm text-muted-foreground">
                Anyone who has this link and an OpenAI account will be able to
                view this.
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <Label
                htmlFor="file"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'cursor-pointer w-full',
                )}
              >
                Upload file
              </Label>
              <input
                type="file"
                multiple
                hidden
                id="file"
                onChange={(e) => {
                  e.preventDefault();
                  e.target.files && fileuploadChange(e.target.files);
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Fragment>
  );
}

const MarkButton = ({ format }: { format: string }) => {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <Button
      variant={
        editorUtiliy.isMarkActive(editor, format) ? 'secondary' : 'outline'
      }
      onMouseDown={(event) => {
        event.preventDefault();
        editorUtiliy.toggleMark(editor, format);
      }}
    >
      {format}
    </Button>
  );
};

const BlockButton = ({ format }: { format: string }) => {
  const editor = useSlate();
  const { editorUtiliy } = useEditorConfig(editor);
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        editorUtiliy.toggleBlock(editor, format);
      }}
    >
      {format}
    </Button>
  );
};
