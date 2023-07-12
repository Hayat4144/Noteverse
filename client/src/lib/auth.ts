import { getUser } from './userDetails';
import bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { decodeToken } from '@/lib/Jwt';

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  GitubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_ID as string,
    clientSecret: process.env.FACEBOOK_SECRET as string,
  }),
  CredentialsProvider({
    name: 'Credentials',
    credentials: {},
    async authorize(credentials: any) {
      const result = await fetch(`http://localhost:8000/api/auth/v/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
      });
      const response = await result.json();
      if (result.status !== 200) {
        return Promise.reject(new Error(response.error));
      }
      return response;
    },
  }),
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  callbacks: {
    jwt: async ({ token, user }) => {
      token.AccessToken = user.AccessToken;
      token.RefreshToken = user.RefreshToken;
      console.log(`token : ${token}`);
      return token;
    },
    session: async ({ session, token }) => {
      const accessToken = await decodeToken(token.AccessToken);
      session.user.AccessToken = token.AccessToken;
      session.user.RefreshToken = token.RefreshToken;
      session.user.id = accessToken.id;
      session.user.email = accessToken.email;
      session.user.name = accessToken.name;
      console.log('session', session);
      return session;
    },
  },
};

export const comparepassword = async (
  password: string,
  encodedPassword: string,
): Promise<Boolean> => {
  const hashPassword = await bcrypt.compare(password, encodedPassword);
  if (!hashPassword) return false;
  return true;
};
