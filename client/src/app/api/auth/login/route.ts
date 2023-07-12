import prisma from '@/lib/DbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/Jwt';

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
    const payload = {
      id: isUserExist.id,
      name: isUserExist.name,
      email: isUserExist.email,
    };
    const token = await generateToken(payload);
    return NextResponse.json(
      { message: 'Login successful.' },
      { status: 200, headers: { 'Set-Cookie': `token=${token}` } },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
