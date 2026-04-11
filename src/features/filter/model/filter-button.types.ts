import type { TodoFilter } from '@entities/todo';
import type { ReactNode } from 'react';

export type FilterButtonProps = {
  icon: ReactNode;
  title: string;
  name: TodoFilter;
};
