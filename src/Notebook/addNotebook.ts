import prisma from '@/config/databaseConfig';
import { httpStatusCode } from '@/types/httpStatusCode';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';

const addNotebook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const isNotebookExist = await prisma.notebook.findMany({
      where: {
        title,
        userId: req.user_id,
      },
    });
    if (isNotebookExist.length > 0) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: `${isNotebookExist[0].title} already exist.` });
    }
    const newNotebook = await prisma.notebook.create({
      data: {
        title: title,
        User: { connect: { id: req.user_id } },
      },
    });
    if (newNotebook) {
      return res
        .status(httpStatusCode.OK)
        .json({ data: `Notebook has been created successfully.` });
    }
  },
);

export default addNotebook;
