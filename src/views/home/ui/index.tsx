import styles from './home.module.scss';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Filter } from '@/features/filter';
import { TodoList } from '@/widgets/todo-list';
import { CreateTodoDialog, CreateTodoFab } from '@/features/create-todo';
import { useCallback, useRef } from 'react';
import { UpdateTodoDialog } from '@/features/update-todo';
import { DeleteTodoDialog } from '@/features/delete-todo';

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
        <CreateTodoDialog />
        <CreateTodoFab />
        <UpdateTodoDialog />
        <DeleteTodoDialog />
      </mdui-layout-main>
    </>
  );
}
