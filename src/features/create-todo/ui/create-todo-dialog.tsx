import styles from './create-todo.module.scss';
import { FormEvent, memo } from 'react';
import { useForm } from '@tanstack/react-form';
import { TodoSchema } from '@/entities/todo/model';
import { useTodoStore } from '@/shared/store/todos.store';
import { TodoDialog } from '@/shared/ui/todo-dialog';
import { useDialogStore } from '@/shared/store/dialog.store';

export const CreateTodoDialog = memo(function CreateTodo() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const form = useForm({
    defaultValues: {
      title: '',
      dueDate: new Date().toDateString(),
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
    <TodoDialog headline={'Создать задачу'} dialogName={'create'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className={styles['form']}
        id={'createTodoForm'}
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
        form={'createTodoForm'}
      >
        Отмена
      </mdui-button>
      <mdui-button slot="action" type="submit" form={'createTodoForm'}>
        Создать
      </mdui-button>
    </TodoDialog>
  );
});
