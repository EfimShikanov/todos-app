'use client';

import type { FilterCard } from '../model/filter.types';
import styles from '../styles/filter.module.css';
import { FilterButton } from './filter-button';

const CARDS: FilterCard[] = [
  {
    label: 'Все',
    icon: <span className="material-symbols-rounded">grid_view</span>,
    value: 'ALL',
  },
  {
    label: 'Запланированы',
    icon: <span className="material-symbols-rounded">calendar_clock</span>,
    value: 'SCHEDULED',
  },
  {
    label: 'Сегодня',
    icon: <span className="material-symbols-rounded">today</span>,
    value: 'TODAY',
  },
  {
    label: 'Просрочены',
    icon: <span className="material-symbols-rounded">delete_history</span>,
    value: 'OVERDUE',
  },
];

export function Filter() {
  return (
    <section className={styles.filter}>
      {CARDS.map((card) => (
        <FilterButton key={card.value} {...card} />
      ))}
    </section>
  );
}
