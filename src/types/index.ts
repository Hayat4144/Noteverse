import { JwtPayload } from 'jsonwebtoken';

export interface payload extends JwtPayload {
  roleId: string;
  email: string;
  name: string;
  id: string;
  created_at: Date;
}
