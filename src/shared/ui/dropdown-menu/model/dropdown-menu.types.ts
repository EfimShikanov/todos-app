import type { HTMLAttributes } from 'react';

export type DropdownMenuProps = {
  items: DropdownMenuItem[];
  id: string;
  anchor: string;
  popover?: HTMLAttributes<HTMLDivElement>['popover'];
};

export type DropdownMenuItem = {
  label: string;
  onClick?: () => void;
  popoverTarget: string;
  key: string;
};
