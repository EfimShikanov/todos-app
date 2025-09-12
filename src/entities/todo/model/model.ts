export interface BaseTodo {
  id: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  sendNotification: boolean;
  done: boolean;
  doneAt: Date | null;
}

interface TodoDone extends BaseTodo {
  done: true;
  doneAt: Date;
}

interface TodoNotDone extends BaseTodo {
  done: false;
  doneAt: null;
}

export type Todo = TodoDone | TodoNotDone;

export interface TodoStore {
  todos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
}
