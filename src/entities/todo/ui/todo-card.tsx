'use client';

import { type Todo, useTodoStore } from '@entities/todo';
import { useDeleteTodoStore } from '@features/delete-todo';
import { useUpdateTodoStore } from '@features/update-todo';
import { Button } from '@shared/ui/button';
import { Checkbox } from '@shared/ui/checkbox';
import { DropdownMenu } from '@shared/ui/dropdown-menu';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { type ChangeEventHandler, useCallback } from 'react';
import styles from '../styles/todo-card.module.css';

type TodoCardProps = Todo & {};

export function TodoCard({ id, dueDate, title, done }: TodoCardProps) {
  const actionsPopoverId = `todo-card-actions-${id}`;
  const actionsTriggerId = `todo-card-actions-trigger-${id}`;

  const toggleTodo = useTodoStore((state) => state.updateTodo);
  const [openUpdateDialog, setUpdateSelectedTodo] = useUpdateTodoStore(
    (state) => [state.openDialog, state.setSelectedTodo],
  );
  const [openDeleteDialog, setDeleteSelectedTodo] = useDeleteTodoStore(
    (state) => [state.openDialog, state.setSelectedTodo],
  );

  const handleToggleTodo: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = useCallback(
    (e) => {
      toggleTodo({ id: id, done: e.target.checked });
    },
    [id, toggleTodo],
  );

  const handleDeleteTodo = useCallback(() => {
    setDeleteSelectedTodo(id);
    openDeleteDialog();
  }, [openDeleteDialog, id, setDeleteSelectedTodo]);

  const handleUpdateTodo = useCallback(() => {
    setUpdateSelectedTodo(id);
    openUpdateDialog();
  }, [openUpdateDialog, id, setUpdateSelectedTodo]);

  return (
    <li className={styles['todo-card']}>
      <Checkbox
        id={id}
        checked={done}
        onChange={handleToggleTodo}
        aria-labelledby={`todo-title-${id}`}
        aria-describedby={`todo-date-${id}`}
      />
      <div className={styles['todo-card__data']}>
        <time dateTime={format(dueDate, 'yyyy-MM-dd')} id={`todo-date-${id}`}>
          {format(dueDate, 'd MMMM yyyy', {
            locale: ru,
          })}
        </time>
        <p id={`todo-title-${id}`}>{title}</p>
      </div>
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
          <span aria-hidden={'true'} className="material-symbols-rounded">
            more_vert
          </span>
        </Button>
        <DropdownMenu
          items={[
            {
              key: 'edit',
              label: 'Редактировать',
              popoverTarget: actionsPopoverId,
              onClick: handleUpdateTodo,
            },
            {
              key: 'delete',
              label: 'Удалить',
              popoverTarget: actionsPopoverId,
              onClick: handleDeleteTodo,
            },
          ]}
          id={actionsPopoverId}
          anchor={actionsTriggerId}
        />
      </div>
    </li>
  );
}
