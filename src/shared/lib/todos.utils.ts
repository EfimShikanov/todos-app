import { Todo } from '@/entities/todo';

export type TodoCategory = 'TODAY' | 'OVERDUE' | 'SCHEDULED';

export function getTodoCategory(todo: Todo): TodoCategory | null {
  const today = new Date();
  const dueDate = new Date(todo.dueDate);

  today.setHours(0, 0, 0, 0);

  if (dueDate.toDateString() === today.toDateString()) {
    return 'TODAY';
  }

  if (dueDate < today && !todo.done) {
    return 'OVERDUE';
  }

  if (dueDate >= today) {
    return 'SCHEDULED';
  }

  return null;
}
