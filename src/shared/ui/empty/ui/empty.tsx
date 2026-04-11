import { memo, type ReactNode } from 'react';
import styles from '../styles/empty.module.css';

interface EmptyProps {
  title: string;
  actions?: ReactNode;
}

export const Empty = memo(function Empty({ title, actions }: EmptyProps) {
  return (
    <div className={styles.empty}>
      <span className={`${styles.empty__icon} material-symbols-rounded`}>
        inbox
      </span>
      <h3 className={styles.empty__title}>{title}</h3>
      {actions}
    </div>
  );
});
