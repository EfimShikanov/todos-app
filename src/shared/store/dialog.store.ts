import { create } from 'zustand';

export type DialogName = 'create' | 'update' | 'delete';

interface DialogStore {
  activeDialog: DialogName | null;
  selectedTodoId: string | null;

  // Если тип диалога update, то необходимо передать selectedTodoId, для получения данных для редактирования
  openDialog(dialog: 'update', selectedTodoId: string): void;

  // В остальных случаях просто передаем dialog
  openDialog(
    dialog: Exclude<DialogName, 'update'>,
    selectedTodoId?: string | null,
  ): void;

  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>()((set) => ({
  activeDialog: null,
  selectedTodoId: null,
  openDialog(dialog, selectedTodoId) {
    set({ activeDialog: dialog, selectedTodoId: selectedTodoId || null });
  },
  closeDialog() {
    set({ activeDialog: null });
  },
}));
