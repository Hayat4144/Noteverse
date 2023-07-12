import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '@/lib/userDetails';
import { comparepassword } from '@/lib/auth';
import { NextAuthOptions } from 'next-auth';
import { Session } from 'next-auth';

// export const options: NextAuthOptions = {
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     GitubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID as string,
//       clientSecret: process.env.FACEBOOK_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials: any) => {
//         const { email, password } = credentials;
//         const user = await getUser(email);
//         if (!user) return null;
//         const isValidPassword = await comparepassword(password, user.password);
//         if (!isValidPassword) return null;
//         const { password: _, ...userWithoutPassword } = user;
//         console.log(userWithoutPassword);
//         return userWithoutPassword;
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       if (user) {
//         token.email = user.email;
//         token.name = user.name;
//         token.role = user.roleId;
//         token.id = user.id;
//         console.log(token);
//       }

//       return token;
//     },
//     session: ({ session, token, user }:{}) => {
//       if (token) {
//         session.user.email = token.email;
//         session.user.name = token.userName;
//         session.user.id = token.id;
//         console.log(session);
//       }
//       return session;
//     },
//   },
// };
