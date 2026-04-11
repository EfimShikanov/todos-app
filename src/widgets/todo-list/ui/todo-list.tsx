'use client';

import { type Todo, TodoCard, useFilteredTodos } from '@entities/todo';
import { useCreateTodoStore } from '@features/create-todo';
import { useFilterStore } from '@features/filter';
import { Button } from '@shared/ui/button';
import { Empty } from '@shared/ui/empty';
import { useMemo } from 'react';
import styles from '../styles/todo-list.module.css';

export function TodoList() {
  const { filter, setFilter } = useFilterStore();
  const openCreateDialog = useCreateTodoStore((state) => state.openDialog);

  const todos = useFilteredTodos(filter);

  const todosElements = useMemo(() => {
    if (!todos.length) {
      return (
        <Empty
          title={'Тут пока ничего нет'}
          actions={
            filter !== 'ALL' ? (
              <Button onClick={() => setFilter('ALL')}>Показать все</Button>
            ) : (
              <Button onClick={openCreateDialog}>
                <span className="material-symbols-rounded" slot={'icon'}>
                  add
                </span>
                Создать
              </Button>
            )
          }
        />
      );
    }

    return todos.map((todo: Todo) => <TodoCard key={todo.id} {...todo} />);
  }, [filter, openCreateDialog, setFilter, todos]);

  return (
    <article className={styles['todo-section']}>
      <h2>Задачи</h2>
      <section className={styles['todo-section__list']}>
        {todosElements}
      </section>
    </article>
  );
}
