import express from 'express';
import Signin from '../auth/Signin';
import RefreshAccessToken from '../auth/RefreshAccessToken';
import Signup from '../auth/Signup';
import authMiddleware from '@/middlewares/authMiddleware';
import Changepassword from '@/auth/changepassword';
import ResetPasswordRequest from '@/auth/ResetPasswordrequest';
import ResetPassword from '@/auth/ResetPassword';

const Authrouter = express.Router();

Authrouter.post('/api/auth/v/signin', Signin);
Authrouter.post('/api/auth/t/getaccesstoken', RefreshAccessToken);
Authrouter.post('/api/auth/v/signup', Signup);
Authrouter.post('/api/auth/v/changepassword', authMiddleware, Changepassword);
Authrouter.post('/api/auth/v/resetpassword', authMiddleware, ResetPassword);
Authrouter.get(
  '/api/auth/v/resetpassword/request',
  authMiddleware,
  ResetPasswordRequest,
);

export default Authrouter;
