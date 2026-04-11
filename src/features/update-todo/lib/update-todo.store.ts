import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type UpdateTodoStoreState = {
  isDialogOpen: boolean;
  selectedTodoId: string | null;
};

type UpdateTodoStoreActions = {
  openDialog: () => void;
  closeDialog: () => void;
  setSelectedTodo: (todoId: string | null) => void;
};

type UpdateTodoStore = UpdateTodoStoreState & UpdateTodoStoreActions;

export const useUpdateTodoStore = createWithEqualityFn<UpdateTodoStore>()(
  (set) => ({
    isDialogOpen: false,
    selectedTodoId: null,
    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false }),
    setSelectedTodo: (todoId) => set({ selectedTodoId: todoId }),
  }),
  shallow,
);
