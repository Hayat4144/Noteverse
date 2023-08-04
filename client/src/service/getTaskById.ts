import { BASE_URL } from '@/lib/BASE_URL';

const getTasksId = async (
  token: string | undefined,
  id: string | null,
  url?: string,
) => {
  const currenturl = url ? url : `${BASE_URL}/api/read/task/${id}`;
  const res = await fetch(currenturl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const { error, data } = await res.json();
  if (res.status !== 200) {
    return { error };
  }
  return { data };
};

export default getTasksId;
