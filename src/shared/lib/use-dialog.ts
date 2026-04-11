'use client';

import { type RefObject, useCallback } from 'react';

type UseDialogResult = {
  open: () => void;
  close: () => void;
};

export function useDialog(
  dialogRef: RefObject<HTMLDialogElement | null>,
): UseDialogResult {
  const open = useCallback(() => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();
  }, [dialogRef]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }
  }, [dialogRef]);

  return {
    open,
    close,
  };
}
