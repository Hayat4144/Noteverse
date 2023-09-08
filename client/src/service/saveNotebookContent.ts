import { BASE_URL } from '@/lib/BASE_URL';

const saveNoteBookContent = async (
  token: string | undefined,
  id: string,
  content: any,
) => {
  const url = `${BASE_URL}/api/update/notebook/content`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, id }),
  });
  const { error, data } = await res.json();
  if (res.status !== 200) {
    return { error };
  }
  return { data };
};

export default saveNoteBookContent;
