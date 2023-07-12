import { User } from '@prisma/client';
import prisma from './DbConfig';

export const getUser = async (email: string) => {
  const isUserExist: User | null = await prisma.user.findUnique({
    where: { email },
  });
  return isUserExist;
};
