'use client';

import { useTodosCounts } from '@entities/todo';
import { useFilterStore } from '../model/filter.store';
import type { FilterCard } from '../model/filter.types';
import styles from '../styles/filter-button.module.css';

export function FilterButton({ label, icon, value }: FilterCard) {
  const { filter, setFilter } = useFilterStore();
  const counts = useTodosCounts();
  const className =
    `${styles['filter-button']} ${filter === value ? styles['filter-button--active'] : ''}`.trim();

  return (
    <button
      className={className}
      type={'button'}
      onClick={() => setFilter(value)}
    >
      <div className={styles['filter-button__icon']}>{icon}</div>
      <div className={styles['filter-button__content']}>
        <span>{label}</span>
        <span>{counts[value]}</span>
      </div>
    </button>
  );
}
