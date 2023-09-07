import { BASE_URL } from '@/lib/BASE_URL';

const uploadImage = async (token: string | undefined, formData: FormData) => {
  const url = `${BASE_URL}/api/notebook/image/upload`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const { error, data } = await res.json();
  if (res.status !== 200) {
    return { error };
  }
  return { data };
};

export default uploadImage;
