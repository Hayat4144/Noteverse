import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import editorUtiliy from '@/lib/editorUtility';
import { useSlate } from 'slate-react';
import ImageLinkForm from '../forms/ImageLinkForm';

interface ImageLinkProps {
  setOpen: (value: boolean) => void;
}

export default function ImageContent({ setOpen }: ImageLinkProps) {
  const editor = useSlate();

  const Imageupload = (files: FileList) => {
    if (files && files.length > 0) {
      editorUtiliy.updloadImagehandler(editor, files);
      setOpen(false);
    }
  };

  return (
    <Tabs defaultValue="upload" className="w-[320px]">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="embed-link">Embed Link</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
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
              e.target.files && Imageupload(e.target.files);
            }}
          />
        </div>
        <small className="text-sm font-medium text-muted-foreground">
          The Maximum size per image is 2Mb.{' '}
        </small>
      </TabsContent>
      <TabsContent value="embed-link">
        <ImageLinkForm setOpen={setOpen} />
      </TabsContent>
    </Tabs>
  );
}
