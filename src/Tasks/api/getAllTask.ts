import asyncHandler from '@/utils/asyncHandler';
import { NextFunction, Request, Response } from 'express';
import Task from '../Task';
import User from '@/utils/User';
import { httpStatusCode } from '@/types/httpStatusCode';

const taskObject = new Task();

const getAllTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isUserExist = await new User(req.user_id).isUserExist();
    if (!isUserExist)
      return res
        .status(httpStatusCode.FORBIDDEN)
        .json({ error: 'you are not allowed to see private resources.' });
    const tasks = await taskObject.getTask(isUserExist.id, {}, 10);
    if (!tasks)
      return res
        .status(httpStatusCode.OK)
        .json({ message: "you dont't added any task yet." });
    return res.status(httpStatusCode.OK).json({ data: tasks });
  },
);

export default getAllTask;
