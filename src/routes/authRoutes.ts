import express from 'express';
import Signin from '../auth/Signin';
import RefreshAccessToken from '../auth/RefreshAccessToken';

const Authrouter = express.Router();

Authrouter.post('/api/auth/v/signin', Signin);
Authrouter.post('/api/auth/t/getaccesstoken',RefreshAccessToken)

export default Authrouter;
