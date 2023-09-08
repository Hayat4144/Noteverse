import prisma from '@/config/databaseConfig';
import { httpStatusCode } from '@/types/httpStatusCode';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';

const noteBookById = asyncHandler(
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
        content: true,
        id: true,
      },
    });
    if (!IsnoteBook) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'Notebook does not exist.' });
    }
    return res.status(httpStatusCode.OK).json({ data: IsnoteBook });
  },
);

export default noteBookById;
