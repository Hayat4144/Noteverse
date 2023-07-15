import express from 'express';
import Signin from '../auth/Signin';
import RefreshAccessToken from '../auth/RefreshAccessToken';
import Signup from '../auth/Signup';

const Authrouter = express.Router();

Authrouter.post('/api/auth/v/signin', Signin);
Authrouter.post('/api/auth/t/getaccesstoken',RefreshAccessToken)
Authrouter.post('/api/auth/v/signup',Signup)

export default Authrouter;
