import { memo, ReactNode } from 'react';
import { DialogName, useDialogStore } from '@/shared/store/dialog.store';

interface TodoDialogProps {
  children: ReactNode;
  dialogName: DialogName;
  toggleDialog?: () => void;
  headline: string;
  fullscreen?: boolean;
}

export const TodoDialog = memo(function TodoDialog({
  children,
  headline,
  dialogName,
  fullscreen = false,
}: TodoDialogProps) {
  const activeDialog = useDialogStore((state) => state.activeDialog);

  return (
    <mdui-dialog
      fullscreen={fullscreen}
      headline={headline}
      open={activeDialog === dialogName}
      close-on-overlay-click
      close-on-esc
    >
      {children}
    </mdui-dialog>
  );
});
