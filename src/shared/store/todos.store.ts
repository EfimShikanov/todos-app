'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Todo } from '@/entities/todo';
import { localStorageService } from '@/shared/lib/local-storage-service';
import { v4 as uuid } from 'uuid';
import { TodoDone, TodoNotDone } from '@/entities/todo/model';

export type TodoFilter = 'ALL' | 'TODAY' | 'OVERDUE' | 'SCHEDULED';

interface TodoStore {
  todos: Todo[];
  addTodo: (newTodo: Pick<Todo, 'title' | 'dueDate'>) => void;
  removeTodo: (id: string) => void;
  updateTodo: (
    newTodo: Pick<Todo, 'id'> &
      Partial<Pick<Todo, 'title' | 'dueDate' | 'done'>>,
  ) => void;
  getTodo: (id: string) => Todo | null;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
}

const TODO_STORAGE_KEY = 'todoStorage-v2';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: localStorageService.get<Todo[]>(TODO_STORAGE_KEY) || [],
      filter: 'ALL',
      setFilter(filter) {
        return set({ filter });
      },
      addTodo(newTodo) {
        const dateNow = new Date();
        const updatedTodos = [
          ...get().todos,
          {
            ...newTodo,
            id: uuid(),
            createdAt: dateNow,
            updatedAt: dateNow,
            done: false,
            doneAt: null,
            sendNotification: false,
          } as TodoNotDone,
        ];

        set(() => ({
          todos: updatedTodos,
        }));
        localStorageService.set(TODO_STORAGE_KEY, updatedTodos);
      },
      removeTodo(id: string) {
        const updatedTodos = get().todos.filter((todo) => todo.id !== id);

        set(() => ({
          todos: updatedTodos,
        }));
        localStorageService.set(TODO_STORAGE_KEY, updatedTodos);
      },
      updateTodo(newTodo) {
        const dateNow = new Date();
        const updatedTodos = get().todos.map((todo) =>
          todo.id === newTodo.id
            ? ({
                ...todo,
                ...newTodo,
                updatedAt: dateNow,
                doneAt: newTodo.done ? dateNow : null,
              } as TodoDone | TodoNotDone)
            : todo,
        );

        set(() => ({
          todos: updatedTodos,
        }));
        localStorageService.set(TODO_STORAGE_KEY, updatedTodos);
      },
      getTodo(id) {
        return get().todos.find((todo) => todo.id === id) || null;
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
