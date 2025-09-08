import styles from './home.module.scss';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Filter } from '@/features/filter';
import { TodoList } from '@/widgets/todo-list';
import { CreateTodo } from '@/features/create-todo';
import { useCallback, useRef } from 'react';

export default function HomePage() {
  const dialogRef = useRef<HTMLElement>(null);
  const dateNow = new Date();
  const dayOfWeek = format(dateNow, 'iiii', { locale: ru });
  const dayAndMonth = format(dateNow, 'd MMMM', { locale: ru });

  const toggleDialog = useCallback(() => {
    if (dialogRef.current && 'open' in dialogRef.current) {
      dialogRef.current.open = !dialogRef.current.open;
    }
  }, []);

  return (
    <>
      <mdui-layout-main className={styles['main']}>
        <header className={styles['heading']}>
          <h1>{dayOfWeek}</h1>
          <p>{dayAndMonth}</p>
        </header>
        <Filter />
        <TodoList toggleDialog={toggleDialog} />
        <CreateTodo dialogRef={dialogRef} toggleDialog={toggleDialog} />
      </mdui-layout-main>
    </>
  );
}
