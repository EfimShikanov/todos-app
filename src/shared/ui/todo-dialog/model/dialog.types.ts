import type { ReactNode, RefObject } from 'react';

export type TodoDialogProps = {
  children: ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onOpen?: () => void;
  onClose?: () => void;
};
