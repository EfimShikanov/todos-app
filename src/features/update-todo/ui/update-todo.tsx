'use client';

import { TodoSchema, useTodoStore } from '@entities/todo';
import { useDialog } from '@shared/lib/use-dialog';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Dialog } from '@shared/ui/todo-dialog';
import { useForm } from '@tanstack/react-form';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import styles from '../../create-todo/styles/create-todo.module.css';
import { useUpdateTodoStore } from '../lib/update-todo.store';

export function UpdateTodo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { open, close } = useDialog(dialogRef);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const getTodo = useTodoStore((state) => state.getTodo);
  const { isDialogOpen, selectedTodoId, closeDialog, setSelectedTodo } =
    useUpdateTodoStore();

  useEffect(() => {
    if (isDialogOpen) {
      open();
      return;
    }

    close();
  }, [close, isDialogOpen, open]);

  const handleClose = () => {
    closeDialog();
    setSelectedTodo(null);
  };

  const form = useForm({
    defaultValues: {
      title: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
    },
    validators: {
      onChange: TodoSchema,
    },
    onSubmit({ value }) {
      if (selectedTodoId) {
        updateTodo({
          ...value,
          dueDate: new Date(value.dueDate),
          id: selectedTodoId,
        });
        handleClose();
      }
    },
  });

  useEffect(() => {
    if (selectedTodoId) {
      const todo = getTodo(selectedTodoId);
      if (todo) {
        form.setFieldValue('title', todo.title);
        form.setFieldValue(
          'dueDate',
          format(new Date(todo.dueDate), 'yyyy-MM-dd'),
        );
      }
    }
  }, [form, getTodo, selectedTodoId]);

  return (
    <Dialog dialogRef={dialogRef} onClose={handleClose}>
      <Dialog.Heading>Редактировать задачу</Dialog.Heading>
      <Dialog.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className={styles.form}
          id={'updateTodoForm'}
        >
          <form.Field name={'title'}>
            {(field) => (
              <Input
                label={'Название'}
                placeholder={'Название'}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
            )}
          </form.Field>
          <form.Field name={'dueDate'}>
            {(field) => (
              <Input
                label={'Дата'}
                placeholder={'Дата'}
                type="date"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </form>
      </Dialog.Body>
      <Dialog.Actions>
        <Button
          variant={'text'}
          form={'updateTodoForm'}
          type={'reset'}
          onClick={closeDialog}
        >
          Отмена
        </Button>
        <Button variant={'default'} type={'submit'} form={'updateTodoForm'}>
          Сохранить
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
