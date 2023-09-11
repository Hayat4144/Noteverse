import bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { decodeToken, isResfreshToken } from '@/lib/Jwt';
import { BASE_URL } from './BASE_URL';

const RefreshAccessToken = async (
  accessToken: string,
  refreshtoken: string,
) => {
  try {
    const tokenResponse = await fetch(`${BASE_URL}/api/auth/t/getaccesstoken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshtoken }),
    });
    const { AccessToken, Refreshtoken, error } = await tokenResponse.json();
    if (tokenResponse.status !== 200) {
      return Promise.reject(new Error(error));
    }
    return { AccessToken, Refreshtoken };
  } catch (error: any) {
    return {
      AccessToken: accessToken,
      Refreshtoken: refreshtoken,
      error: 'RefreshAccessTokenError',
    };
  }
};

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
      const result = await fetch(`${BASE_URL}/api/auth/v/signin`, {
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  callbacks: {
    jwt: async ({ token, user, session }) => {
      /* Token is stored data after the successfull login
         user is return variable from the providers.the user is undefined initially.
        it is only avaible at login time at successful login 
      */

      if (user) {
        // This will only be executed at login. Each next invocation will skip this part.
        const AccessToken = await decodeToken(user.AccessToken);
        token.AccessToken = user.AccessToken;
        token.AccessTokenExpiry = AccessToken.exp;
        token.RefreshToken = user.RefreshToken;
      }

      const shouldRefreshTime = isResfreshToken(token.AccessTokenExpiry);
      if (!shouldRefreshTime) {
        return token;
      }
      const refreshTokenData = await RefreshAccessToken(
        token.AccessToken,
        token.RefreshToken,
      );

      if (refreshTokenData.error) {
        // clear all data token session add the provide like thing in the client side to check
        // if there is any error occured in the session or token logout the user and redirect
        // to the signin page.
        token.error = refreshTokenData.error;
        return token;
      }

      const { exp } = await decodeToken(refreshTokenData.AccessToken);
      return {
        ...token,
        AccessToken: refreshTokenData.AccessToken,
        RefreshToken: refreshTokenData.Refreshtoken,
        AccessTokenExpiry: exp,
      };
    },
    session: async ({ session, token }) => {
      if (token) {
        const accessToken = await decodeToken(token.AccessToken);
        session.user.AccessToken = token.AccessToken;
        session.user.RefreshToken = token.RefreshToken;
        session.user.id = accessToken.id;
        session.user.email = accessToken.email;
        session.user.name = accessToken.name;
        session.error = token.error;
      }

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
