import { Todo } from '@/entities/todo';
import styles from './todo-card.module.scss';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTodoStore } from '@/shared/store/todos.store';
import { memo } from 'react';
import { useDialogStore } from '@/shared/store/dialog.store';

export const TodoCard = memo(function TodoCard(props: Todo) {
  const toggleTodo = useTodoStore((state) => state.updateTodo);
  const openEditDialog = useDialogStore((state) => state.openDialog);

  return (
    <mdui-card
      className={styles['todo-card']}
      clickable
      onClick={() => openEditDialog('update', props.id)}
    >
      <mdui-checkbox
        onClick={(e) => e.stopPropagation()}
        checked={props.done}
        onChange={() => toggleTodo({ id: props.id, done: !props.done })}
      />
      <section className={styles['todo-card__data']}>
        <p>
          {format(props.dueDate, 'd MMMM yyyy', {
            locale: ru,
          })}
        </p>
        <p>{props.title}</p>
      </section>
    </mdui-card>
  );
});
