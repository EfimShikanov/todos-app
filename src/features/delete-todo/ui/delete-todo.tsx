import { memo, useCallback } from 'react';
import { TodoDialog } from '@/shared/ui/todo-dialog';
import { useDialogStore } from '@/shared/store/dialog.store';
import { useTodoStore } from '@/shared/store/todos.store';

export const DeleteTodoDialog = memo(function DeleteTodoDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const todoId = useDialogStore((state) => state.selectedTodoId);
  const deleteTodo = useTodoStore((state) => state.removeTodo);

  const submitHandler = useCallback(() => {
    if (todoId) {
      deleteTodo(todoId);
    }
    closeDialog();
  }, [todoId, deleteTodo, closeDialog]);

  return (
    <TodoDialog
      dialogName={'delete'}
      headline={'Удалить задачу'}
      description={'Вы уверены, что хотите удалить эту задачу?'}
    >
      <mdui-button variant="text" slot="action" onClick={closeDialog}>
        Отмена
      </mdui-button>
      <mdui-button slot="action" onClick={submitHandler}>
        Продолжить
      </mdui-button>
    </TodoDialog>
  );
});
