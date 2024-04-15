import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';
import { httpStatusCode } from '../types/httpStatusCode';
import prisma from '../config/databaseConfig';
import jwt from 'jsonwebtoken';
import { fork } from 'child_process';
import path from 'path';
import logger from '@/utils/logger';

const ResetPasswordRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
        const {email} = req.query;
    const IsTokenExist = await prisma.token.findFirst({
      where: {
                email:email as email
      },
      select: {
        User: {
          select: {
            email: true,
          },
        },
      },
    });
    if (IsTokenExist) {
      return res.status(httpStatusCode.OK).json({
        data: `Reset password link has been already send to your email ${IsTokenExist.User?.email}`,
      });
    }
    let tokenData = {
      email: req.email,
      id: req.user_id,
    };
    let secret = process.env.JWT_SECRET as string;
    let token = jwt.sign(tokenData, secret, {
      algorithm: 'HS256',
      expiresIn: '10m',
    });
    await prisma.token.create({
      data: {
        token,
        User: { connect: { id: req.user_id } },
      },
    });
    const filepath = process.cwd() + '/src/utils/sendmail.ts';
    const productionpath = process.cwd() + '/dist/utils/sendmail.js';
    const childfilepath =
      process.env.NODE_ENV === 'production' ? productionpath : filepath;
    const sendMail = fork(childfilepath);
    const message = {
      token,
      user: {
        email: req.email,
        id: req.user_id,
      },
      link: `${req.headers.origin}/resetpassword?token=${token}`,
    };
    sendMail.send(message);
    sendMail.on('message', (msg) => {
      const { error, data } = msg as any;
      if (error)
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ error: error.response });
      return res.status(httpStatusCode.OK).json({
        data: `Reset password email has been send to ${data.accepted[0]}`,
      });
    });
  },
);

export default ResetPasswordRequest;
