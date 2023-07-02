import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config(); 

const app = express();
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  return res.send('hello hayat ilyas');
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
