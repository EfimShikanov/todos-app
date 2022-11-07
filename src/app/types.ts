export interface Todo {
  id: number;
  value: string;
  isDone: boolean;
  isEditing: boolean;
}

export interface UpdatedTodo {
  id: number;
  value: string;
}

export type Filter = "all" | "active" | "done";

export interface ApplicationState {
  todosList: Todo[];
  filter: Filter;
}
