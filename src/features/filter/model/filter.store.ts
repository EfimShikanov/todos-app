import type { TodoFilter } from '@entities/todo';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type FilterStoreState = {
  filter: TodoFilter;
};

type FilterStoreActions = {
  setFilter: (filter: TodoFilter) => void;
};

type FilterStore = FilterStoreState & FilterStoreActions;

export const useFilterStore = createWithEqualityFn<FilterStore>()(
  (set) => ({
    filter: 'ALL',
    setFilter(newFilter) {
      set({ filter: newFilter });
    },
  }),
  shallow,
);
