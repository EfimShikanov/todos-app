export interface Todo {
  id: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  sendNotification: boolean;
  done: boolean;
}

export interface TodoStore {
  todos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
}
