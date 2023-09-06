import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import editorUtiliy from '@/lib/editorUtility';
import { useSlate } from 'slate-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const FormSchema = z.object({
  link: z.string().url({ message: 'Please enter valid url.' }),
});

interface ImageLinkFormProps {
  setOpen: (value: boolean) => void;
}

export default function ImageLinkForm({ setOpen }: ImageLinkFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const editor = useSlate();
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    editorUtiliy.insertImage(editor, data.link);
    editorUtiliy.InsertNode(editor, {
      type: 'paragraph',
      children: [{ text: '' }],
    });
    setOpen(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Paste your link here"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Insert image
        </Button>
      </form>
    </Form>
  );
}
