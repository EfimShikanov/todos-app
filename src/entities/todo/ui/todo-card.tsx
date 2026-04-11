'use client';

import { type Todo, useTodoStore } from '@entities/todo';
import { useDeleteTodoStore } from '@features/delete-todo';
import { useUpdateTodoStore } from '@features/update-todo';
import { Button } from '@shared/ui/button';
import { Checkbox } from '@shared/ui/checkbox';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '../styles/todo-card.module.css';

type TodoCardProps = Todo & {};

export function TodoCard(props: TodoCardProps) {
  const actionsPopoverId = `todo-card-actions-${props.id}`;
  const actionsTriggerId = `todo-card-actions-trigger-${props.id}`;

  const toggleTodo = useTodoStore((state) => state.updateTodo);
  const openUpdateDialog = useUpdateTodoStore((state) => state.openDialog);
  const setUpdateSelectedTodo = useUpdateTodoStore(
    (state) => state.setSelectedTodo,
  );
  const openDeleteDialog = useDeleteTodoStore((state) => state.openDialog);
  const setDeleteSelectedTodo = useDeleteTodoStore(
    (state) => state.setSelectedTodo,
  );

  return (
    <article className={styles['todo-card']}>
      <Checkbox
        id={props.id}
        checked={props.done}
        onChange={(e) => toggleTodo({ id: props.id, done: e.target.checked })}
      />
      <section className={styles['todo-card__data']}>
        <p>
          {format(props.dueDate, 'd MMMM yyyy', {
            locale: ru,
          })}
        </p>
        <p>{props.title}</p>
      </section>
      <div className={styles['todo-card__menu']}>
        <Button
          id={actionsTriggerId}
          variant={'icon'}
          className={styles['todo-card__menu-trigger']}
          aria-label={'Открыть меню действий'}
          aria-haspopup={'menu'}
          aria-controls={actionsPopoverId}
          popoverTarget={actionsPopoverId}
          popoverTargetAction={'toggle'}
        >
          <span className="material-symbols-rounded">more_vert</span>
        </Button>
        <div
          id={actionsPopoverId}
          popover="auto"
          anchor={actionsTriggerId}
          className={styles['todo-card__actions-popover']}
        >
          <div>
            <Button
              variant={'text'}
              onClick={() => {
                setUpdateSelectedTodo(props.id);
                openUpdateDialog();
              }}
              aria-label={'Редактировать задачу'}
              popoverTarget={actionsPopoverId}
              popoverTargetAction={'hide'}
            >
              Редактировать
            </Button>
            <Button
              variant={'text'}
              onClick={() => {
                setDeleteSelectedTodo(props.id);
                openDeleteDialog();
              }}
              aria-label={'Удалить задачу'}
              popoverTarget={actionsPopoverId}
              popoverTargetAction={'hide'}
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
