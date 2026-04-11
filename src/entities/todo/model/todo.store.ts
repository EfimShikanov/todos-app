'use client';

import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { getTodoCategory, type Todo, type TodoNotDone } from '@/entities/todo';
import { generateId } from '@/shared/lib/generate-id';
import { createTodoStoreStorage } from './persist-storage';

export type TodoFilter = 'ALL' | 'TODAY' | 'OVERDUE' | 'SCHEDULED';

type TodoStoreState = {
  todos: Todo[];
};

type TodoStoreActions = {
  getTodosCounts: () => Record<TodoFilter, number>;
  getTodo: (id: string) => Todo | null;
  getTodos: (filter: TodoFilter) => Todo[];
  addTodo: (newTodo: Pick<Todo, 'title' | 'dueDate'>) => void;
  removeTodo: (id: string) => void;
  updateTodo: (
    newTodo: Pick<Todo, 'id'> &
      Partial<Pick<Todo, 'title' | 'dueDate' | 'done'>>,
  ) => void;
};

type TodoStore = TodoStoreState & TodoStoreActions;

export const useTodoStore = createWithEqualityFn<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      getTodos(filter) {
        const { todos } = get();
        return todos.filter((todo) => getTodoCategory(todo) === filter);
      },
      addTodo(data) {
        const dateNow = new Date();
        const newTodo: TodoNotDone = {
          ...data,
          id: generateId(),
          createdAt: dateNow,
          updatedAt: dateNow,
          done: false,
          doneAt: null,
          sendNotification: false,
        };
        const updatedTodos = [...get().todos, { ...newTodo }];

        set(() => ({
          todos: updatedTodos,
        }));
      },
      removeTodo(id: string) {
        const updatedTodos = get().todos.filter((todo) => todo.id !== id);

        set(() => ({
          todos: updatedTodos,
        }));
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
              } as Todo)
            : todo,
        );

        set(() => ({
          todos: updatedTodos,
        }));
      },
      getTodo(id) {
        return get().todos.find((todo) => todo.id === id) || null;
      },
      getTodosCounts() {
        const result: Record<TodoFilter, number> = {
          ALL: 0,
          TODAY: 0,
          OVERDUE: 0,
          SCHEDULED: 0,
        };

        get().todos.forEach((todo) => {
          const category = getTodoCategory(todo);
          if (category) {
            result[category]++;
          }
        });

        return result;
      },
    }),
    {
      name: 'todo-storage',
      storage: createTodoStoreStorage(),
    },
  ),
  shallow,
);

export const useTodosCounts = () =>
  useTodoStore((state) => {
    const counts: Record<TodoFilter, number> = {
      ALL: state.todos.length,
      TODAY: 0,
      SCHEDULED: 0,
      OVERDUE: 0,
    };

    for (const todo of state.todos) {
      const category = getTodoCategory(todo);
      if (category) {
        counts[category]++;
      }
    }

    return counts;
  });

export const useFilteredTodos = (filter: TodoFilter) =>
  useTodoStore(({ todos }) =>
    filter === 'ALL'
      ? todos
      : todos.filter((todo) => getTodoCategory(todo) === filter),
  );
