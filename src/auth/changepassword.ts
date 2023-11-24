import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';
import { httpStatusCode } from '../types/httpStatusCode';
import prisma from '../config/databaseConfig';
import bcrypt from 'bcrypt';
import logger from '@/utils/logger';

const Changepassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { newpassword, password, confirmpassword } = req.body;
    logger.info(req.body);
    const user = await prisma.user.findUnique({
      where: {
        id: req.user_id,
      },
    });
    if (!user)
      return res
        .status(httpStatusCode.UNAUTHORIZED)
        .json({ error: 'you are unauthorized.' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (!isValidPassword)
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'Invalid password,please try again' });
    const hashPassword = await bcrypt.hash(newpassword, 10);
    await prisma.user.update({
      where: {
        id: req.user_id,
      },
      data: { password: hashPassword },
    });
    return res
      .status(httpStatusCode.OK)
      .json({ data: 'Password has been changed successfully.' });
  },
);

export default Changepassword;
