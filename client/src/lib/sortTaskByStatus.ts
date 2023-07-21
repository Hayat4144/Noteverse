import { taskObject, TaskStatus } from '@/types';

const sortTaskByStatus = (data: taskObject[]) => {
  let notStartedTask: taskObject[] = [];
  let inProgressTask: taskObject[] = [];
  let completedTask: taskObject[] = [];
  data.filter((task) => {
    if (task.status === TaskStatus.Not_Started) {
      notStartedTask.push({ ...task });
    } else if (task.status === TaskStatus.In_Progress) {
      inProgressTask.push({ ...task });
    } else {
      completedTask.push({ ...task });
    }
  });
  return { notStartedTask, inProgressTask, completedTask };
};

export default sortTaskByStatus;
