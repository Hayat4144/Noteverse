import { Response, Request, NextFunction } from 'express';
import { httpStatusCode } from '../types/httpStatusCode';
import prisma from '../config/databaseConfig';
import bcrypt from 'bcrypt';
import { getAccessToken, getRefreshToken } from '../utils/jwt';
import { payload } from '../types';
import asyncHandler from '../utils/asyncHandler';

const Signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });
    if (!isUserExist) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: `${email} does not exist.` });
    }

    const isValidPassword = await bcrypt.compare(
      password as string,
      isUserExist.password,
    );
    if (!isValidPassword)
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'Invalid email/password' });
    const payload: payload = {
      id: isUserExist.id,
      name: isUserExist.name,
      email: isUserExist.email,
      roleId: isUserExist.roleId,
      created_at: isUserExist.created_at,
    };
    const AccessToken = await getAccessToken(payload);
    const RefreshToken = await getRefreshToken(payload);
    return res.status(httpStatusCode.OK).json({ AccessToken, RefreshToken });
  },
);

export default Signin;
