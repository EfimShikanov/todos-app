'use client';

import { useTodoStore } from '@entities/todo';
import { useDialog } from '@shared/lib/use-dialog';
import { Button } from '@shared/ui/button';
import { Dialog } from '@shared/ui/todo-dialog';
import { useCallback, useEffect, useRef } from 'react';
import { useDeleteTodoStore } from '../lib/delete-todo.store';

export function DeleteTodo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { open, close } = useDialog(dialogRef);
  const deleteTodo = useTodoStore((state) => state.removeTodo);
  const { isDialogOpen, selectedTodoId, closeDialog, setSelectedTodo } =
    useDeleteTodoStore();

  useEffect(() => {
    if (isDialogOpen) {
      open();
      return;
    }

    close();
  }, [close, isDialogOpen, open]);

  const handleClose = useCallback(() => {
    closeDialog();
    setSelectedTodo(null);
  }, [closeDialog, setSelectedTodo]);

  const submitHandler = useCallback(() => {
    if (selectedTodoId) {
      deleteTodo(selectedTodoId);
    }
    handleClose();
  }, [deleteTodo, handleClose, selectedTodoId]);

  return (
    <Dialog dialogRef={dialogRef} onClose={handleClose}>
      <Dialog.Heading>Удалить задачу</Dialog.Heading>
      <Dialog.Body>
        <p>
          Вы уверены, что хотите удалить эту задачу? Это действие нельзя
          отменить.
        </p>
      </Dialog.Body>

      <Dialog.Actions>
        <Button onClick={handleClose} variant={'text'} type={'reset'}>
          Отмена
        </Button>
        <Button onClick={submitHandler} variant={'default'} type={'submit'}>
          Продолжить
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
