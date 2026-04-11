import type { CheckboxProps } from '@shared/ui/checkbox/model/checkbox.types';
import styles from '../styles/checkbox.module.css';

export function Checkbox(props: CheckboxProps) {
  return <input {...props} type={'checkbox'} className={styles.checkbox} />;
}
