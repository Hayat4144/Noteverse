import { BASE_URL } from '@/lib/BASE_URL';

const addNotebookutil = async (token: string | undefined, title: string) => {
  const url = `${BASE_URL}/api/add/notebook`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const { error, data } = await res.json();
  if (res.status !== 200) {
    return { error };
  }
  return { data };
};

export default addNotebookutil;
