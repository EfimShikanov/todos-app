'use client';

import type { ReactNode } from 'react';
import type { TodoDialogProps } from '../model/dialog.types';
import styles from '../styles/todo-dialog.module.css';

export function Dialog({ children, dialogRef, onClose }: TodoDialogProps) {
  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      {children}
    </dialog>
  );
}

Dialog.Heading = function Heading({ children }: { children: ReactNode }) {
  return (
    <header className={styles.header}>
      <h2 className={styles.headline}>{children}</h2>
    </header>
  );
};

Dialog.Body = function Body({ children }: { children: ReactNode }) {
  return <section className={styles.body}>{children}</section>;
};

Dialog.Actions = function Actions({ children }: { children: ReactNode }) {
  return <footer className={styles.actions}>{children}</footer>;
};
