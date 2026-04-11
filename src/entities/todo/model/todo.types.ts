export type BaseTodo = {
  id: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  sendNotification: boolean;
  done: boolean;
  doneAt: Date | null;
};

export type TodoDone = BaseTodo & {
  done: true;
  doneAt: Date;
};

export type TodoNotDone = BaseTodo & {
  done: false;
  doneAt: null;
};

export type Todo = TodoDone | TodoNotDone;

export type TodoCategory = 'TODAY' | 'OVERDUE' | 'SCHEDULED';
