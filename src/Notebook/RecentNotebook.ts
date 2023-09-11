import prisma from '@/config/databaseConfig';
import { httpStatusCode } from '@/types/httpStatusCode';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';

const recentNotebook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.params;
    if (type === 'recent') {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const notebooks = await prisma.notebook.findMany({
        where: {
          userId: req.user_id,
          updatedAt: {
            gte: twoDaysAgo,
          },
        },
      });
      return res.status(httpStatusCode.OK).json({ data: notebooks });
    }
    const allNotebook = await prisma.notebook.findMany({
      where: {
        userId: req.user_id,
      },
    });
    return res.status(httpStatusCode.OK).json({ data: allNotebook });
  },
);

export default recentNotebook;
