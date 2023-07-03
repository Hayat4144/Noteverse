import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';
import ErrorMiddleware from './middlewares/ErroMiddleware';
import { CustomError } from './utils/CustomError';

const app = express();
app.use(cookieParser());
dotenv.config(); 
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://frontend-hayat4144.vercel.app",
            "https://dashboard-hayat4144.vercel.app",
          ]
        : ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);



const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  return res.send('hello hayat ilyas');
});


app.use(ErrorMiddleware)
app.listen(port, () => {
  logger.info(`Server is running at port ${port}`)
});
