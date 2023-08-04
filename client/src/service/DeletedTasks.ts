import { BASE_URL } from '@/lib/BASE_URL';

const deleteTasks = async (taskIds: string[], token: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/api/delete/task`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskIds }),
    });
    const { error, message } = await response.json();
    if (response.status !== 200) {
      return {error} ;
    }
    return {message};
  } catch (error) {
    throw error;
  }
};

export default deleteTasks;
