import { BASE_URL } from "@/lib/BASE_URL";
import { TaskResponse } from "@/types";


const getTasks = async (token: string | undefined ) => {
  const res = await fetch(`${BASE_URL}/api/search/task`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result: TaskResponse = await res.json();
  if (res.status !== 200) {
    throw new Error(result.error);
  }
  //  ------------------- make the human readable date formate and push in the existing data --------- //
  const data = result.data.map((item) => {
    const dueDate = new Date(item.due_date);
    const createdDate = new Date(item.createdAt);
    const updatedDate = new Date(item.updatedAt);

    const due_date = dueDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const createdAt = createdDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const updatedAt = updatedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return { ...item, due_date, createdAt, updatedAt };
  });
  return { ...result, data };
};


export default getTasks;