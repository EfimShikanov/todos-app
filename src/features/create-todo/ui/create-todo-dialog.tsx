'use client';

import { TodoSchema, useTodoStore } from '@entities/todo';
import { useDialog } from '@shared/lib/use-dialog';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Dialog } from '@shared/ui/todo-dialog';
import { useForm } from '@tanstack/react-form';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { useCreateTodoStore } from '../lib/create-todo.store';
import styles from '../styles/create-todo.module.css';

export function CreateTodoDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { open, close } = useDialog(dialogRef);
  const addTodo = useTodoStore((state) => state.addTodo);
  const { isDialogOpen, closeDialog } = useCreateTodoStore();

  useEffect(() => {
    if (isDialogOpen) {
      open();
      return;
    }

    close();
  }, [close, isDialogOpen, open]);

  const form = useForm({
    defaultValues: {
      title: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
    },
    onSubmit: ({ value }) => {
      addTodo({ ...value, dueDate: new Date(value.dueDate) });
      form.reset();
      closeDialog();
    },
    validators: {
      onChange: TodoSchema,
    },
  });

  return (
    <Dialog dialogRef={dialogRef} onClose={closeDialog}>
      <Dialog.Heading>Создать задачу</Dialog.Heading>
      <Dialog.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className={styles.form}
          id={'createTodoForm'}
          method={'dialog'}
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
                autoFocus
              ></Input>
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
              ></Input>
            )}
          </form.Field>
        </form>
      </Dialog.Body>
      <Dialog.Actions>
        <Button
          variant={'text'}
          form={'createTodoForm'}
          type={'reset'}
          onClick={closeDialog}
        >
          Отмена
        </Button>
        <Button variant={'default'} type={'submit'} form={'createTodoForm'}>
          Создать
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
