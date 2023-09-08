import prisma from '@/config/databaseConfig';
import { httpStatusCode } from '@/types/httpStatusCode';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';

const readNotebook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const noteBooks = await prisma.notebook.findMany({
      where: {
        userId: req.user_id,
      },
      select: {
        title: true,
        id: true,
      },
    });
    res.status(httpStatusCode.OK).json({ data: noteBooks });
  },
);

export default readNotebook;
