import { BASE_URL } from '@/lib/BASE_URL';
import { Descendant } from 'slate';

const recentNotebook = async (token: string, type: string) => {
  const response = await fetch(`${BASE_URL}/api/recent/notebook/${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  const { error, data } = result;
  if (response.status !== 200) {
    return { error };
  }
  return { data };
};

export default recentNotebook;
