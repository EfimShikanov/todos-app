'use client';

import { Button } from '@shared/ui/button';
import { useCreateTodoStore } from '../lib/create-todo.store';

export function CreateTodoFab() {
  const openDialog = useCreateTodoStore((state) => state.openDialog);

  return (
    <Button
      fab
      position={{ bottom: '1rem', right: '1rem' }}
      variant={'icon'}
      onClick={openDialog}
      aria-label={'Создать задачу'}
    >
      <span
        className="material-symbols-rounded"
        slot={'icon'}
        aria-hidden={'true'}
      >
        add
      </span>
    </Button>
  );
}
