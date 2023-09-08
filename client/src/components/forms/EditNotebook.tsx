import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToggle } from '@uidotdev/usehooks';
import { Icons } from '../Icons';
import AddNotebookform from './AddNotebookform';

interface EditNotebookProps {
  id: string;
  title: string;
}

export default function EditNotebook({ id, title }: EditNotebookProps) {
  const [open, toggleDialog] = useToggle(false);
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger>
        <Icons.edit size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Notebook</DialogTitle>
          <AddNotebookform
            toggleDialog={toggleDialog}
            action={'update'}
            id={id}
            titlevalue={title}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
