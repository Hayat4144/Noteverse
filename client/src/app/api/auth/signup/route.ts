import prisma from '@/lib/DbConfig';
import bcrypt from 'bcrypt';
import Error from 'next/error';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const { name, email, password } = await req.json();
    const saltRound = 10;
    const IsUserExist = await prisma.user.findFirst({
      where: { email: email },
    });
    if (IsUserExist)
      return NextResponse.json(
        { error: 'User already exist' },
        { status: 400 },
      );
    const hashPassword = await bcrypt.hash(password, 10);
    let defaultRole = await prisma.role.findFirst({ where: { type: 'OWNER' } });
    if (!defaultRole) {
      defaultRole = await prisma.role.create({ data: { type: 'OWNER' } });
    }

    const createUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
        Role: { connect: { id: defaultRole.id } },
      },
    });

    if (createUser) {
      console.log(createUser);
      return NextResponse.json(
        { message: `${createUser.email} has been created successfully.` },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error:error.message }, { status: 400 });
  }
}
