import jwt from 'jsonwebtoken';

export async function decodeToken(token: string): Promise<JwtPayload> {
  const decoded = jwt.decode(token) as JwtPayload;
  return decoded;
}
