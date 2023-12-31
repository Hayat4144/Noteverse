import { z } from 'zod';

export const addtaskSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: 'Title must be atleast 4 character long.',
    })
    .max(200, { message: 'Title must be atleast 4 character long.' }),

  description: z.string().optional(),
  status: z.string().min(3, { message: 'Status must be 3 character long.' }),
  priority: z
    .string()
    .min(3, { message: 'Priority must be 3 character long.' }),
  tags: z.string(),
  assignee: z
    .string()
    .min(4, {
      message: 'Assignee must be 4 character long',
    })
    .max(20, {
      message: 'Assignee does not greater than 8 character.',
    }),
  due_date: z.date({ required_error: 'Due_date is required' }),
  is_standalone: z.boolean().default(true).optional(),
});
