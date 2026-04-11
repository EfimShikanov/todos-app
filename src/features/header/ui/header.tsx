import { format, setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '../styles/header.module.css';

setDefaultOptions({ locale: ru });

export function Header() {
  const dateNow = new Date();
  const dayOfWeek = format(dateNow, 'iiii');
  const dayAndMonth = format(dateNow, 'd MMMM');

  return (
    <header className={styles.heading}>
      <h1 className={styles.h1}>{dayOfWeek}</h1>
      <h2 className={styles.h2}>{dayAndMonth}</h2>
    </header>
  );
}
