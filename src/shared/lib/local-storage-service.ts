'use client';

import { Todo } from '@/entities/todo';

interface LegacyTodo {
  id: number;
  isDone: boolean;
  isEditing: boolean;
  value: string;
}

class LocalStorageService {
  constructor() {
    this.migrateToV2();
  }

  /**
   * Получает значение из localStorage по ключу.
   * @param key Ключ, по которому хранятся данные.
   * @returns Значение или null, если данных нет или произошла ошибка.
   */
  public get<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(
        `Error getting item from localStorage with key "${key}":`,
        error,
      );
      return null;
    }
  }

  /**
   * Сохраняет значение в localStorage по ключу.
   * @param key Ключ для хранения.
   * @param value Значение для сохранения.
   */
  public set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error setting item to localStorage with key "${key}":`,
        error,
      );
    }
  }

  /**
   * Удаляет значение из localStorage по ключу.
   * @param key Ключ, по которому хранятся данные.
   */
  public remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error removing item from localStorage with key "${key}":`,
        error,
      );
    }
  }

  /**
   * Выполняет миграцию со старой версии приложения
   */
  public migrateToV2(): void {
    try {
      const legacyStorage = this.get<LegacyTodo[]>('todosStorage');

      if (legacyStorage) {
        const migratedTodos: Todo[] = legacyStorage.map(
          (legacyTodo: LegacyTodo) => {
            return {
              id: crypto.randomUUID(),
              title: legacyTodo.value,
              done: legacyTodo.isDone,
              createdAt: new Date(),
              updatedAt: new Date(),
              dueDate: new Date(),
              sendNotification: false,
            };
          },
        );

        this.set('todoStorage-v2', migratedTodos);
        this.remove('todosStorage');
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const localStorageService = new LocalStorageService();
