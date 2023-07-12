import { JWT } from 'jsonwebtoken';
import type { User } from 'next-auth';
import { JWTString } from 'next-auth/core/lib/cookie';
import 'next-auth/jwt';
import { Session } from 'next-auth';


declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface User {
    AccessToken: string;
    RefreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    AccessToken: string;
    RefreshToken: string;
  }
}
