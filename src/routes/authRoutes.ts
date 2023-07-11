import express from 'express';
import Signin from '../auth/Signin';

const Authrouter = express.Router();

Authrouter.post('/api/auth/v/signin', Signin);

export default Authrouter;
