import { useId } from 'react';
import type { InputProps } from '../model/input.types';
import styles from '../styles/input.module.css';

export function Input({ label, id, ...inputProps }: InputProps) {
  const fallbackId = useId();

  return (
    <div className={styles.input}>
      {label && (
        <label htmlFor={id || fallbackId} className={styles.input__label}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        id={id || fallbackId}
        className={styles.input__field}
      />
    </div>
  );
}
