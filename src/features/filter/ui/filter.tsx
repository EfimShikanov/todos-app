'use client';

import { useTodosCounts } from '@entities/todo';
import type { FilterCard } from '../model/filter.types';
import styles from '../styles/filter.module.css';
import { FilterButton } from './filter-button';

const CARDS: Omit<FilterCard, 'count'>[] = [
  {
    label: 'Все',
    icon: <span className="material-symbols-rounded">grid_view</span>,
    value: 'ALL',
    name: 'filter',
  },
  {
    label: 'Запланированы',
    icon: <span className="material-symbols-rounded">calendar_clock</span>,
    value: 'SCHEDULED',
    name: 'filter',
  },
  {
    label: 'Сегодня',
    icon: <span className="material-symbols-rounded">today</span>,
    value: 'TODAY',
    name: 'filter',
  },
  {
    label: 'Просрочены',
    icon: <span className="material-symbols-rounded">delete_history</span>,
    value: 'OVERDUE',
    name: 'filter',
  },
];

export function Filter() {
  const counts = useTodosCounts();

  return (
    <fieldset className={styles.filter}>
      <legend aria-hidden={'false'}>Фильтр</legend>
      {CARDS.map((card) => (
        <FilterButton {...card} key={card.value} count={counts[card.value]} />
      ))}
    </fieldset>
  );
}
