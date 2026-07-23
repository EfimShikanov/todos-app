import { Button } from '@shared/ui/button';
import type { DropdownMenuProps } from '@shared/ui/dropdown-menu/model/dropdown-menu.types';
import { useMemo } from 'react';
import styles from '../styles/dropdown-menu.module.css';

export function DropdownMenu({
  id,
  anchor,
  popover = 'auto',
  items,
}: DropdownMenuProps) {
  const renderItems = useMemo(() => {
    return items.map((item) => (
      <Button
        key={`${id}_${item.key}`}
        variant={'text'}
        onClick={item.onClick}
        popoverTarget={item.popoverTarget}
        popoverTargetAction={'hide'}
        // role={'menuitem'}
      >
        {item.label}
      </Button>
    ));
  }, [id, items.map]);

  return (
    <div
      id={id}
      popover={popover}
      anchor={anchor}
      className={styles.dropdown}
      // role={'menu'}
    >
      {renderItems}
    </div>
  );
}
