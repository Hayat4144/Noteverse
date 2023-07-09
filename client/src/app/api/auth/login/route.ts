import prisma from '@/lib/DbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest, res: Response) {
  try {
    const { email, password } = await req.json();
    const isUserExist = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!isUserExist)
      return NextResponse.json(
        { error: `${email} does not exist.` },
        { status: 400 },
      );
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordMatch)
      return NextResponse.json(
        { error: `Invalid email/password` },
        { status: 400 },
      );
    return NextResponse.json({ message: 'Login successful.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
