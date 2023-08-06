import prisma from '@/config/databaseConfig';
import { createTaskInput } from '@/types';
import logger from '@/utils/logger';
import { Prisma, Task as PrismaTask } from '@prisma/client';

class Task {
  async createTask(taskData: createTaskInput, userId: string) {
    const newtask = await prisma.task.create({
      data: { ...taskData, user: { connect: { id: userId } } },
    });
    if (newtask) {
      return newtask;
    }
  }

  async getTaskById(id: string, userId: string): Promise<PrismaTask | null> {
    const isTaskExist = await this.isTaskExist(id, userId);
    return isTaskExist;
  }

  async findByIdAndUpdate(
    id: string,
    taskData: createTaskInput,
    userId: string,
  ): Promise<PrismaTask | null> {
    const isTaskExist = await this.isTaskExist(id, userId);
    if (!isTaskExist) return null;
    const updatedTask = await prisma.task.update({
      where: { id: isTaskExist.id },
      data: { ...taskData },
    });
    return updatedTask;
  }

  private async isTaskExist(
    id: string,
    userId: string,
  ): Promise<PrismaTask | null> {
    const taskExist = await prisma.task.findUnique({
      where: { id, userId },
    });
    if (!taskExist) return null;
    return taskExist;
  }

  async findByAndDelete(ids: string[], userId: string) {
    const IsTaskExist = ids.map(async (id) => {
      const isTaskExist = await this.isTaskExist(id, userId);
      return isTaskExist;
    });
    const isTaskExistPromise = await Promise.all(IsTaskExist);
    if (isTaskExistPromise.some((task) => task === null)) {
      return null;
    }
    const DeletdTasks = async (id: string) => {
      return await prisma.task.delete({
        where: { id },
        select: {
          title: true,
        },
      });
    };
    const DeletedTaskPromise = await Promise.all(
      ids.map((id) => DeletdTasks(id)),
    );
    return DeletedTaskPromise;
  }

  async getTask(userId: string, sortIn: object | [], skip: number) {
    const tasks = await prisma.task.findMany({
      take: 20,
      skip,
      where: { userId },
      orderBy: sortIn,
    });
    const totalTasks = await prisma.task.count({
      where: {
        userId,
      },
      orderBy: sortIn,
    });
    const TaskPromise = Promise.all([tasks, totalTasks]);
    return TaskPromise;
  }

  async searchApifilters(
    filterQuery: object,
    sortQuery: object | [],
    skip: number,
  ) {
    const tasks = await prisma.task.findMany({
      take: 20,
      skip,
      where: filterQuery,
      orderBy: sortQuery,
    });
    const totalTasks = await prisma.task.count({
      where: filterQuery,
      orderBy: sortQuery,
    });
    const TaskPromise = Promise.all([tasks, totalTasks]);
    return TaskPromise;
  }
}

export default Task;
