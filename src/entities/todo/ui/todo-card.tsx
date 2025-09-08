import { Todo } from '@/entities/todo';
import styles from './todo-card.module.scss';
import { formatDate } from 'date-fns/format';
import { ru } from 'date-fns/locale';

interface Props extends Todo {
  onChange: () => void;
}

export function TodoCard(props: Props) {
  return (
    <mdui-card className={styles['todo-card']} clickable>
      <mdui-checkbox checked={props.done} onChange={() => props.onChange()} />
      <section className={styles['todo-card__data']}>
        <p>
          {formatDate(props.dueDate, 'd MMMM yyyy', {
            locale: ru,
          })}
        </p>
        <p>{props.title}</p>
      </section>
    </mdui-card>
  );
}
