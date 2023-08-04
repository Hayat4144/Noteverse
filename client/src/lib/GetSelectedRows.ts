import { SelectionRow, taskObject } from '@/types';

const GetSelectedRow = (selectedRow: SelectionRow, tasks: taskObject[]) => {
  const taskIds: string[] = [];
  Object.keys(selectedRow).forEach((element) => {
    tasks.filter((task, index) => {
      if (Number(element) === index) {
        taskIds.push(task.id);
      }
    });
  });
  return taskIds;
};

export default GetSelectedRow;
