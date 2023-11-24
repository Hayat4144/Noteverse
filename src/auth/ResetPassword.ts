import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';
import { httpStatusCode } from '../types/httpStatusCode';
import prisma from '../config/databaseConfig';
import bcrypt from 'bcrypt';

const isValidDate = (createdTime: Date) => {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - createdTime.getTime();
  const fiveMinutesInMillisecond = 5 * 60 * 1000;
  return timeDifference <= fiveMinutesInMillisecond;
};

const ResetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, password } = req.body;
    const isTokenexist = await prisma.token.findFirst({
      where: {
        token,
        userId: req.user_id,
      },
    });

    if (!isTokenexist)
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: `Invalid token or link, please check it` });
    const isTokenValid = isValidDate(isTokenexist.createdAt);
    if (!isTokenValid) {
      await prisma.token.delete({
        where: { id: isTokenexist.id },
      });
      return res.status(httpStatusCode.BAD_REQUEST).json({
        error: 'Token has been expired.Try to make a reset password request.',
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: req.user_id,
      },
      data: {
        password: hashPassword,
      },
    });
    await prisma.token.delete({
      where: { id: isTokenexist.id },
    });
    return res
      .status(httpStatusCode.OK)
      .json({ data: 'your password has been reset successfully.' });
  },
);

export default ResetPassword;
