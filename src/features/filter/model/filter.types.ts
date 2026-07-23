import type { TodoFilter } from '@entities/todo';
import type { ReactNode } from 'react';

export type FilterCard = {
  label: string;
  value: TodoFilter;
  icon: ReactNode;
  name: string;
  count: number;
};
