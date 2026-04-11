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
    >
      <span className="material-symbols-rounded" slot={'icon'}>
        add
      </span>
    </Button>
  );
}
