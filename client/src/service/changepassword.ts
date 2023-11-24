import { BASE_URL } from '@/lib/BASE_URL';

const changePassword = async (passwordData: any, token: string | undefined) => {
  const response = await fetch(`${BASE_URL}/api/auth/v/changepassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...passwordData }),
  });
  const result = await response.json();
  const { error, data } = result;
  if (response.status !== 200) {
    return { error };
  }
  return {
    data,
  };
};

export default changePassword;
