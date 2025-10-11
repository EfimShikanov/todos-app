import { Todo } from '@/entities/todo';
import styles from './todo-card.module.scss';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTodoStore } from '@/entities/todo/model';
import { memo } from 'react';
import { useDialogStore } from '@/shared/store/dialog.store';

export const TodoCard = memo(function TodoCard(props: Todo) {
  const toggleTodo = useTodoStore((state) => state.updateTodo);
  const openDialog = useDialogStore((state) => state.openDialog);

  return (
    <mdui-card
      className={styles['todo-card']}
      // onClick={() => openEditDialog('update', props.id)}
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
      <mdui-dropdown className={styles['todo-card__dropdown-trigger']}>
        <mdui-button-icon slot="trigger">
          <span className="material-symbols-rounded">more_vert</span>
        </mdui-button-icon>
        <mdui-menu>
          <mdui-menu-item onClick={() => openDialog('update', props.id)}>
            <span className="material-symbols-rounded" slot={'icon'}>
              edit
            </span>
            Редактировать
          </mdui-menu-item>
          <mdui-menu-item onClick={() => openDialog('delete', props.id)}>
            <span className="material-symbols-rounded" slot={'icon'}>
              delete
            </span>
            Удалить
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
    </mdui-card>
  );
});
