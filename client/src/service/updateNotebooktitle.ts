import { BASE_URL } from '@/lib/BASE_URL';

const updateNotebook = async (
  token: string | undefined,
  title: string,
  id: string,
) => {
  const url = `${BASE_URL}/api/update/notebook`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, id }),
  });
  const { error, data } = await res.json();
  if (res.status !== 200) {
    return { error };
  }
  return { data };
};

export default updateNotebook;
