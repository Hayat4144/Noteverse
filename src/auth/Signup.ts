import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import prisma from '../config/databaseConfig';
import { httpStatusCode } from '../types/httpStatusCode';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { DefaultNotebookContent } from '@/utils/constant';

const Signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = await req.body;
    const saltRound = 10;
    const IsUserExist = await prisma.user.findFirst({
      where: { email: email },
    });
    if (IsUserExist) {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'User already exit.' });
    }
    const hashPassword = await bcrypt.hash(password, saltRound);
    let defaultRole = await prisma.role.findFirst({ where: { type: 'OWNER' } });
    if (!defaultRole) {
      defaultRole = await prisma.role.create({
        data: { type: 'OWNER' } as Prisma.RoleCreateInput,
      });
    }
    const createNewuser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        Role: { connect: { id: defaultRole.id } },
      },
    });
    if (createNewuser) {
      const newNotebook = await prisma.notebook.create({
        data: {
          title: 'Document',
          User: { connect: { id: createNewuser.id } },
          content: DefaultNotebookContent,
        },
      });
      return res.status(httpStatusCode.OK).json({
        data: `${createNewuser.email} has been created successfully.`,
      });
    }
  },
);

export default Signup;
