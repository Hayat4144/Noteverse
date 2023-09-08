import React, { Fragment } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Icons } from '../Icons';
import deleteNotebook from '@/service/DeleteNotebook';
import { useSession } from 'next-auth/react';
import { toast } from '../ui/use-toast';
import { useToggle } from '@uidotdev/usehooks';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface DeleteModalProps {
  id: string;
}

export default function DeleteModal({ id }: DeleteModalProps) {
  const session = useSession();
  const [open, toggleDialog] = useToggle(false);
  const [isLoading, loadingtoggle] = useToggle(false);
  const queryClient = useQueryClient();

  const refetchQuery = () => {
    queryClient.invalidateQueries(['notebook']);
    queryClient.refetchQueries(['noteboook']);
  };

  const DeletenoteBook = async () => {
    loadingtoggle(true);
    const { data, error } = await deleteNotebook(
      session.data?.user.AccessToken,
      id,
    );
    if (error) {
      loadingtoggle(false);
      toast({ title: error, variant: 'destructive' });
      return;
    }
    loadingtoggle(false);
    toggleDialog(false);
    toast({ title: data });
    refetchQuery();
  };
  return (
    <AlertDialog open={open} onOpenChange={toggleDialog}>
      <AlertDialogTrigger>
        <Icons.trash size={16} className="text-red-600 hover:text-red-700" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => DeletenoteBook()}
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <Fragment>
                <Loader2 size={17} className="animate-spin mr-2" />
                <span>Please wait</span>
              </Fragment>
            ) : (
              'Continue'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
