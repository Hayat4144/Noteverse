import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';
import { payload } from '../types';
import { CustomError } from './CustomError';

const SignOptions: SignOptions = {
  algorithm: 'ES256',
  expiresIn: '1h',
};

const getPrivateKeySecret = (): Buffer => {
  const filePath = join(process.cwd(), 'private.ec.key');
  const secretKey = readFileSync(filePath);
  return secretKey;
};

const getPublicKeySecret = (): Buffer => {
  const filePath = join(process.cwd(), 'public.pem');
  const secretKey = readFileSync(filePath);
  return secretKey;
};

const getAccessToken = async (payload: any): Promise<string> => {
  const secret = getPrivateKeySecret();
  const token = await jwt.sign(payload, secret, SignOptions);
  return token;
};

const getRefreshToken = async (paylod: payload): Promise<string> => {
  const secret = getPrivateKeySecret();
  const token = await jwt.sign(paylod, secret, {
    ...SignOptions,
    expiresIn: '10d',
  });
  return token;
};

const verifyToken = async (token: string): Promise<payload> => {
  const options: VerifyOptions = {
    algorithms: ['ES256'],
  };
  const secret = getPublicKeySecret();
  const decodedToken = (await jwt.verify(token, secret, options)) as payload;

  const { exp } = decodedToken;

  if (!exp || typeof exp !== 'number') {
    throw new CustomError('Invalid token expiration', 400);
  }

  const expirationTime = exp * 1000; // Convert exp (seconds) to milliseconds
  const expirationIn30Days = Date.now() + 20 * 24 * 60 * 60 * 1000; // 20 days in milliseconds

  if (expirationTime >= expirationIn30Days) {
    throw new CustomError('Token has expired', 400);
  }

  return decodedToken;
};

export {
  getAccessToken,
  verifyToken,
  getRefreshToken,
  getPublicKeySecret,
  getPrivateKeySecret,
};
