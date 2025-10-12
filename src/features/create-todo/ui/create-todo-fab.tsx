import styles from './create-todo.module.scss';
import { memo } from 'react';
import { useDialogStore } from '@/shared/store/dialog.store';

export const CreateTodoFab = memo(function CreateTodoFab() {
  const openDialog = useDialogStore((state) => state.openDialog);

  return (
    <mdui-fab className={styles['fab']} onClick={() => openDialog('create')}>
      <span className="material-symbols-rounded" slot={'icon'}>
        add
      </span>
    </mdui-fab>
  );
});
