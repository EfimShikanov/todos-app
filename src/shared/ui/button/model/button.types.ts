import type { Property } from 'csstype';
import type { ComponentProps } from 'react';

type ButtonVariant = 'default' | 'icon' | 'text';

type BasicButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
};

type DefaultButtonProps = BasicButtonProps & {
  fab?: undefined;
  position?: undefined;
};

type FabButtonProps = BasicButtonProps & {
  fab: true;
  position: {
    top?: Property.Top;
    left?: Property.Left;
    right?: Property.Right;
    bottom?: Property.Bottom;
  };
};

export type ButtonProps = DefaultButtonProps | FabButtonProps;
