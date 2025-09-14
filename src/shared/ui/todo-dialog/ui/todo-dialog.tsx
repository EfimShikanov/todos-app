import { memo, ReactNode, useEffect, useRef } from 'react';
import { DialogName, useDialogStore } from '@/shared/store/dialog.store';

interface TodoDialogProps {
  children: ReactNode;
  dialogName: DialogName;
  toggleDialog?: () => void;
  headline: string;
  description?: string;
  fullscreen?: boolean;
}

export const TodoDialog = memo(function TodoDialog({
  children,
  headline,
  dialogName,
  description,
  fullscreen = false,
}: TodoDialogProps) {
  const activeDialog = useDialogStore((state) => state.activeDialog);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    dialogRef.current?.addEventListener('closed', closeDialog);
  }, []);

  return (
    <mdui-dialog
      ref={dialogRef}
      fullscreen={fullscreen}
      headline={headline}
      description={description}
      open={activeDialog === dialogName}
      close-on-overlay-click
      close-on-esc
    >
      {children}
    </mdui-dialog>
  );
});
