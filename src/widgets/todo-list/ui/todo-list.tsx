import { TodoCard } from '@/entities/todo';
import styles from './todo-list.module.scss';
import { useTodoStore } from '@/entities/todo/model';
import { memo, useMemo } from 'react';
import { getTodoCategory } from '@/shared/lib/todos.utils';
import { Empty } from '@/shared/ui/empty';
import { useDialogStore } from '@/shared/store/dialog.store';
import { useShallow } from 'zustand/shallow';

export const TodoList = memo(function TodoList() {
  const { todos, filter, setFilter } = useTodoStore(
    useShallow((state) => ({
      todos: state.todos,
      filter: state.filter,
      setFilter: state.setFilter,
    })),
  );
  const openDialog = useDialogStore((state) => state.openDialog);

  const filteredTodos = useMemo(() => {
    if (filter === 'ALL') {
      return todos;
    }
    return todos.filter((todo) => getTodoCategory(todo) === filter);
  }, [filter, todos]);

  const todosElements = useMemo(() => {
    if (!filteredTodos.length) {
      return (
        <Empty
          title={'Тут пока ничего нет'}
          actions={
            filter !== 'ALL' ? (
              <mdui-button onClick={() => setFilter('ALL')}>
                Показать все
              </mdui-button>
            ) : (
              <mdui-button onClick={() => openDialog('create')}>
                <span className="material-symbols-rounded" slot={'icon'}>
                  add
                </span>
                Создать
              </mdui-button>
            )
          }
        />
      );
    }

    return filteredTodos.map((todo) => <TodoCard key={todo.id} {...todo} />);
  }, [filter, filteredTodos, openDialog, setFilter]);

  return (
    <article className={styles['todo-section']}>
      <h2>Задачи</h2>
      <article className={styles['todo-section__list']}>
        {todosElements}
      </article>
    </article>
  );
});
