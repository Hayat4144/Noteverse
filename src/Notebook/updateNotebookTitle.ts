import prisma from '@/config/databaseConfig';
import { httpStatusCode } from '@/types/httpStatusCode';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';

const updateNotebook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, id } = req.body;
    if (!title || !id) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'title and id is required' });
    }
    const isNotebookExist = await prisma.notebook.findFirst({
      where: {
        id,
        userId: req.user_id,
      },
    });
    if (!isNotebookExist) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: `Notebook does not exist.` });
    }
    const updatedNotebook = await prisma.notebook.update({
      where: {
        userId: req.user_id,
        id,
      },
      data: { title },
    });
    if (updatedNotebook) {
      return res
        .status(httpStatusCode.OK)
        .json({ data: `Notebook has been updated successfully.` });
    }
  },
);

export default updateNotebook;
