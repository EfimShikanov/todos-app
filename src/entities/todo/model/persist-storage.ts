'use client';

import { createJSONStorage, type StateStorage } from 'zustand/middleware';
import { generateId } from '@/shared/lib/generate-id';
import type { Todo } from './todo.types';

const TODO_STORE_STORAGE_KEY = 'todo-storage';
const LEGACY_TODO_STORAGE_KEY = 'todoStorage-v2';

type TodoStorePersistedState = {
  todos: Todo[];
};

type TodoStorePersistedValue = {
  state: TodoStorePersistedState;
  version: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isIsoDateString(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
  );
}

function toDate(value: unknown, fallback = new Date()): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return fallback;
}

function isPersistedState(value: unknown): value is TodoStorePersistedState {
  return isRecord(value) && Array.isArray(value.todos);
}

function normalizeTodo(value: unknown): Todo | null {
  if (!isRecord(value)) {
    return null;
  }

  const createdAt = toDate(value.createdAt);
  const updatedAt = toDate(value.updatedAt, createdAt);
  const dueDate = toDate(value.dueDate, createdAt);
  const done = Boolean(value.done);

  return {
    id: typeof value.id === 'string' ? value.id : generateId(),
    title: typeof value.title === 'string' ? value.title : '',
    createdAt,
    updatedAt,
    dueDate,
    sendNotification: Boolean(value.sendNotification),
    done,
    doneAt: done ? toDate(value.doneAt, updatedAt) : null,
  } as Todo;
}

export function migrateLocalStorageTodosToStoreState(
  value: unknown,
): TodoStorePersistedState | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const todos = value
    .map(normalizeTodo)
    .filter((todo): todo is Todo => todo !== null);

  return {
    todos,
  };
}

export function createTodoStorePersistedValue(
  state: TodoStorePersistedState,
): TodoStorePersistedValue {
  return {
    state,
    version: 0,
  };
}

export function migrateTodoStorageV2ToPersistedValue(
  value: unknown,
): TodoStorePersistedValue | null {
  const migratedState = migrateLocalStorageTodosToStoreState(value);

  if (!migratedState) {
    return null;
  }

  return createTodoStorePersistedValue(migratedState);
}

function serializeState(state: TodoStorePersistedState): string {
  return JSON.stringify(createTodoStorePersistedValue(state));
}

function parsePersistedState(
  value: string | null,
): TodoStorePersistedState | null {
  if (!value) {
    return null;
  }

  const parsedValue = JSON.parse(value) as unknown;

  if (!isRecord(parsedValue) || !isPersistedState(parsedValue.state)) {
    return null;
  }

  return migrateLocalStorageTodosToStoreState(parsedValue.state.todos);
}

function mergeTodos(...todoGroups: Todo[][]): Todo[] {
  const todosMap = new Map<string, Todo>();

  for (const todos of todoGroups) {
    for (const todo of todos) {
      todosMap.set(todo.id, todo);
    }
  }

  return [...todosMap.values()];
}

function migrateFromLegacyStorage(currentValue: string | null): string | null {
  const currentState = parsePersistedState(currentValue);
  const legacyTodoStorage = localStorage.getItem(LEGACY_TODO_STORAGE_KEY);
  let nextState = currentState;

  if (legacyTodoStorage) {
    const migratedState = migrateLocalStorageTodosToStoreState(
      JSON.parse(legacyTodoStorage),
    );

    localStorage.removeItem(LEGACY_TODO_STORAGE_KEY);

    if (migratedState) {
      nextState = {
        todos: mergeTodos(currentState?.todos ?? [], migratedState.todos),
      };
    }
  }

  if (!nextState || nextState === currentState) {
    return currentValue;
  }

  return serializeState(nextState);
}

export function migrateTodoStorageV2InLocalStorage(): boolean {
  const legacyTodoStorage = localStorage.getItem(LEGACY_TODO_STORAGE_KEY);

  if (!legacyTodoStorage) {
    return false;
  }

  const currentState = parsePersistedState(
    localStorage.getItem(TODO_STORE_STORAGE_KEY),
  );
  const migratedValue = migrateTodoStorageV2ToPersistedValue(
    JSON.parse(legacyTodoStorage),
  );

  localStorage.removeItem(LEGACY_TODO_STORAGE_KEY);

  if (!migratedValue) {
    return false;
  }

  const nextState = {
    todos: mergeTodos(currentState?.todos ?? [], migratedValue.state.todos),
  };

  localStorage.setItem(
    TODO_STORE_STORAGE_KEY,
    JSON.stringify(createTodoStorePersistedValue(nextState)),
  );

  return true;
}

export function createTodoStoreStorage() {
  const storage: StateStorage = {
    getItem(name) {
      const currentValue = localStorage.getItem(name);
      if (name !== TODO_STORE_STORAGE_KEY) {
        return currentValue;
      }

      const migratedValue = migrateFromLegacyStorage(currentValue);

      if (migratedValue && migratedValue !== currentValue) {
        localStorage.setItem(name, migratedValue);
      }

      return migratedValue;
    },
    setItem(name, value) {
      localStorage.setItem(name, value);
    },
    removeItem(name) {
      localStorage.removeItem(name);
    },
  };

  return createJSONStorage<TodoStorePersistedState>(() => storage, {
    reviver: (_, value) => (isIsoDateString(value) ? new Date(value) : value),
  });
}
