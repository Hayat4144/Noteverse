import { httpStatusCode } from '@/types/httpStatusCode';
import taskObject from '@/utils/TaskObject';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';

const deleteTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskIds }: { taskIds: string[] } = req.body;
    const deletedTask = await taskObject.findByAndDelete(taskIds, req.user_id);
    if (!deletedTask)
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: 'Task does not exist' });

    if (deletedTask.length > 0) {
      return res
        .status(httpStatusCode.OK)
        .json({ message: `Tasks has been deleted successfully.` });
    }
  },
);

export default deleteTask;
