import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';
import ErrorMiddleware from './middlewares/ErroMiddleware';
import { CustomError } from './utils/CustomError';
import Authrouter from './routes/authRoutes';

const app = express();
app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://frontend-hayat4144.vercel.app',
            'https://dashboard-hayat4144.vercel.app',
          ]
        : ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json())

const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  return res.send('hello hayat ilyas');
});

app.use(Authrouter);

app.use(ErrorMiddleware);
app.listen(port, () => {
  logger.info(`Server is running at port ${port}`);
});
