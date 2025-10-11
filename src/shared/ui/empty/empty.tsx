import { memo, ReactNode } from 'react';
import styles from './empty.module.scss';

interface EmptyProps {
  title: string;
  actions?: ReactNode;
}

export const Empty = memo(function Empty({ title, actions }: EmptyProps) {
  return (
    <mdui-card className={styles['empty']}>
      <span className={`${styles['empty__icon']} material-symbols-rounded`}>
        inbox
      </span>
      <h3 className={styles['empty__title']}>{title}</h3>
      {actions}
    </mdui-card>
  );
});
