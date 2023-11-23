import { BASE_URL } from '@/lib/BASE_URL';
import { taskInput } from '@/types';

const addTask = async (taskData: any, token: string | undefined) => {
  const taskresponse = await fetch(`${BASE_URL}/api/create/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...taskData }),
  });
  const result = await taskresponse.json();
  const { error, data } = result;
  if (taskresponse.status !== 200) {
    return { error };
  }
  return { data: 'Task has been added successfully.', responseData: data };
};

export default addTask;

