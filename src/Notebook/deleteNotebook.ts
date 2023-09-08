import prisma from '@/config/databaseConfig';
import { httpStatusCode } from '@/types/httpStatusCode';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';

const deleteNotebook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { notebookId } = req.params;
    if (!notebookId) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'Notebook id is invalid' });
    }
    const IsnoteBook = await prisma.notebook.findFirst({
      where: {
        id: notebookId as string,
        userId: req.user_id,
      },
      select: {
        title: true,
        id: true,
      },
    });
    if (!IsnoteBook) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'Notebook does not exist.' });
    }
    await prisma.notebook.delete({
      where: {
        userId: req.user_id,
        id: IsnoteBook.id,
      },
    });
    return res
      .status(httpStatusCode.OK)
      .json({ data: `${IsnoteBook.title} is deleted successfully.` });
  },
);

export default deleteNotebook;
