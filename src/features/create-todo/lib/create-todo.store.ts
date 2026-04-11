import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type CreateTodoStoreState = {
  isDialogOpen: boolean;
};

type CreateTodoStoreActions = {
  openDialog: () => void;
  closeDialog: () => void;
};

type CreateTodoStore = CreateTodoStoreState & CreateTodoStoreActions;

export const useCreateTodoStore = createWithEqualityFn<CreateTodoStore>()(
  (set) => ({
    isDialogOpen: false,
    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false }),
  }),
  shallow,
);
