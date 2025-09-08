'use client';

import styles from './filter.module.scss';
import { memo, ReactNode, useMemo } from 'react';
import { TodoFilter, useTodoStore } from '@/shared/store/todos.store';
import { getTodoCategory } from '@/shared/lib/todos.utils';

interface FilterCard {
  label: string;
  value: TodoFilter;
  icon: ReactNode;
}

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

export const Filter = memo(function Filter() {
  const { filter, setFilter, todos } = useTodoStore();

  const todosCounts = useMemo(() => {
    const counts: Record<TodoFilter, number> = {
      ALL: todos.length,
      TODAY: 0,
      OVERDUE: 0,
      SCHEDULED: 0,
    };

    todos.forEach((todo) => {
      const category = getTodoCategory(todo);
      if (category) {
        counts[category]++;
      }
    });

    return counts;
  }, [todos]);

  const cards = useMemo(() => {
    return CARDS.map((card) => {
      const className =
        `${styles['filter-item']} ${card.value === filter ? styles['active'] : ''}`.trim();
      return (
        <button
          key={`filter_${card.value}`}
          className={className}
          onClick={() => setFilter(card.value)}
        >
          {card.icon}
          <div className={styles['filter-item__data']}>
            <p className={styles['filter-item__name']}>{card.label}</p>
            <p className={styles['filter-item__value']}>
              {todosCounts[card.value]}
            </p>
          </div>
        </button>
      );
    });
  }, [filter, setFilter, todosCounts]);

  return <article className={styles['filter']}>{cards}</article>;
});
