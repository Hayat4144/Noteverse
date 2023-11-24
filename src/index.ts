import 'module-alias/register';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './utils/logger';
import ErrorMiddleware from './middlewares/ErroMiddleware';
import Authrouter from './routes/authRoutes';
import taskRouter from './routes/taskRoutes';
import noteBookRoutes from './routes/noteBookRoutes';
import CloudinaryConfiguration from './config/CloudinayConfig';
import responsetime from 'response-time';
import cluster from 'cluster';
import os from 'os';

let cpuCore = os.cpus().length;

if (cluster.isPrimary) {
  logger.info(`The primary process id is ${process.pid}`);
  for (let index = 0; index < cpuCore; index++) {
    cluster.fork();
  }

  cluster.on('exit', () => cluster.fork());
} else {
  logger.info(`The worker process id is ${process.pid}`);

  const app = express();
  app.use(responsetime());
  CloudinaryConfiguration();
  dotenv.config();

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'production'
          ? [process.env.FRONTEND_URL as string]
          : ['http://localhost:3000'],
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );
  app.use(express.json());

  const port = process.env.PORT || 8000;

  app.get('/', (req: Request, res: Response) => {
    return res.send('hello hayat ilyas');
  });

  app.use(Authrouter);
  app.use(taskRouter);
  app.use(noteBookRoutes);

  app.use(ErrorMiddleware);
  app.listen(port, () => {
    logger.info(`Server is running at port ${port}`);
  });
}
