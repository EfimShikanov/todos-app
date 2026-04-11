import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type DeleteTodoStoreState = {
  isDialogOpen: boolean;
  selectedTodoId: string | null;
};

type DeleteTodoStoreActions = {
  openDialog: () => void;
  closeDialog: () => void;
  setSelectedTodo: (todoId: string | null) => void;
};

type DeleteTodoStore = DeleteTodoStoreState & DeleteTodoStoreActions;

export const useDeleteTodoStore = createWithEqualityFn<DeleteTodoStore>()(
  (set) => ({
    isDialogOpen: false,
    selectedTodoId: null,
    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false }),
    setSelectedTodo: (todoId) => set({ selectedTodoId: todoId }),
  }),
  shallow,
);
