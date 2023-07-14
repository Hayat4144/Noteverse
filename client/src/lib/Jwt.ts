import jwt from 'jsonwebtoken';

export async function decodeToken(token: string): Promise<JwtPayload> {
  const decoded = jwt.decode(token) as JwtPayload;
  return decoded;
}

export function isResfreshToken(expirationTime: number): Boolean {
  // if Accesstoken lifespan is 24h we will  refresh it 1 hour before 
  const expireTimeMillisecond = expirationTime * 1000; // Expiration time in milliseconds
  const refreshThreshold = 60 * 60 * 1000; // 1 hour in milliseconds
  const timeRemaining = expireTimeMillisecond - refreshThreshold - Date.now();
  return timeRemaining <= 0 ? true : false;
}
