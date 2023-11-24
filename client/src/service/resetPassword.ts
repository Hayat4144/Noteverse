import { BASE_URL } from '@/lib/BASE_URL';

const resetPassword = async (
  password: string,
  token: string,
  authtoken: string | undefined,
) => {
  const response = await fetch(`${BASE_URL}/api/auth/v/resetpassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authtoken}`,
    },
    body: JSON.stringify({ password, token }),
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

export default resetPassword;
