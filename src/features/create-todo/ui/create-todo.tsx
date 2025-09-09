import styles from './create-todo.module.scss';
import '@mdui/icons/add.js';
import { FormEvent, memo, RefObject } from 'react';
import { useForm } from '@tanstack/react-form';
import { TodoSchema } from '@/entities/todo/model';
import { useTodoStore } from '@/shared/store/todos.store';

interface CreateTodoProps {
  dialogRef: RefObject<HTMLElement | null>;
  toggleDialog: () => void;
}

export const CreateTodo = memo(function CreateTodo({
  dialogRef,
  toggleDialog,
}: CreateTodoProps) {
  const addTodo = useTodoStore((state) => state.addTodo);

  const form = useForm({
    defaultValues: {
      title: '',
      dueDate: new Date().toDateString(),
    },
    onSubmit: ({ value }) => {
      addTodo({ ...value, dueDate: new Date(value.dueDate) });
    },
    validators: {
      onChange: TodoSchema,
    },
  });

  return (
    <>
      <mdui-dialog
        ref={dialogRef}
        close-on-overlay-click
        headline={'Создать задачу'}
        fullscreen
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className={styles['form']}
          id={'todoForm'}
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
          variant="outlined"
          slot="action"
          onClick={toggleDialog}
          type="reset"
          form={'todoForm'}
        >
          Отмена
        </mdui-button>
        <mdui-button
          slot="action"
          onClick={toggleDialog}
          type="submit"
          form={'todoForm'}
        >
          Создать
        </mdui-button>
      </mdui-dialog>
      <mdui-fab className={styles['fab']} onClick={toggleDialog}>
        <span className="material-symbols-rounded" slot={'icon'}>
          add
        </span>
      </mdui-fab>
    </>
  );
});
