'use client';

import { useVibration } from '@shared/ui/button';
import { useFilterStore } from '../model/filter.store';
import type { FilterCard } from '../model/filter.types';
import styles from '../styles/filter-button.module.css';

export function FilterButton({ label, icon, value, name, count }: FilterCard) {
  const { filter, setFilter } = useFilterStore();
  const handleChange = useVibration(() => setFilter(value));

  return (
    <label className={styles['filter-button']}>
      <input
        type="radio"
        name={name}
        checked={filter === value}
        onChange={handleChange}
        aria-describedby={`count-${value}`}
      />
      <div className={styles['filter-button__icon']} aria-hidden={'true'}>
        {icon}
      </div>
      <div className={styles['filter-button__content']} id={`count-${value}`}>
        <span>{label}</span>
        <span>{count}</span>
      </div>
    </label>
  );
}
