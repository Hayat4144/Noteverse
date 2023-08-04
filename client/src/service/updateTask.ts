import { BASE_URL } from '@/lib/BASE_URL';
import { taskInput } from '@/types';

const updateTask = async (
  token: string | undefined,
  id: string | null,
  taskdata: {},
  url?: string,
) => {
  const currenturl = url ? url : `${BASE_URL}/api/update/task`;
  const res = await fetch(currenturl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, data: taskdata }),
  });
  const { error, data } = await res.json();
  if (res.status !== 200) {
    return { error };
  }
  return { data };
};

export default updateTask;
