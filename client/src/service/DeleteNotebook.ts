import { BASE_URL } from '@/lib/BASE_URL';

const deleteNotebook = async (token: string | undefined, id: string) => {
  const url = `${BASE_URL}/api/delete/id/notebook/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { error, data } = await res.json();
  if (res.status !== 200) {
    return { error };
  }
  return { data };
};

export default deleteNotebook;
