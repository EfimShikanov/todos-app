import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().min(3).max(255),
  dueDate: z.iso.date(),
});
