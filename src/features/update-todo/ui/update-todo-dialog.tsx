import { FormEvent, memo, useEffect } from 'react';
import { TodoDialog } from '@/shared/ui/todo-dialog';
import styles from '@/features/create-todo/ui/create-todo.module.scss';
import { useForm } from '@tanstack/react-form';
import { TodoSchema } from '@/entities/todo/model';
import { useTodoStore } from '@/shared/store/todos.store';
import { useDialogStore } from '@/shared/store/dialog.store';
import { format } from 'date-fns';

export const UpdateTodoDialog = memo(function UpdateTodo() {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const getTodo = useTodoStore((state) => state.getTodo);
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const selectedTodoId = useDialogStore((state) => state.selectedTodoId);

  const form = useForm({
    defaultValues: {
      title: '',
      dueDate: new Date().toDateString(),
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
        closeDialog();
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
  }, [form, form.state, getTodo, selectedTodoId]);

  return (
    <TodoDialog dialogName={'update'} headline={'Редактировать задачу'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className={styles['form']}
        id={'updateTodoForm'}
      >
        <form.Field name={'title'}>
          {(field) => (
            <mdui-text-field
              variant="outlined"
              label="Название"
              tabIndex={1}
              name={field.name}
              value={field.state.value}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                field.handleChange((e.target as HTMLInputElement).value);
              }}
              autoFocus
            ></mdui-text-field>
          )}
        </form.Field>
        <form.Field name={'dueDate'}>
          {(field) => (
            <mdui-text-field
              variant="outlined"
              label="Дата"
              type="date"
              tabIndex={1}
              name={field.name}
              value={field.state.value}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                field.handleChange((e.target as HTMLInputElement).value)
              }
              autoFocus
            ></mdui-text-field>
          )}
        </form.Field>
      </form>

      <mdui-button
        variant="text"
        slot="action"
        onClick={closeDialog}
        type="reset"
        form={'updateTodoForm'}
      >
        Отмена
      </mdui-button>
      <mdui-button slot="action" type="submit" form={'updateTodoForm'}>
        Сохранить
      </mdui-button>
    </TodoDialog>
  );
});
