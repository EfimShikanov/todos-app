import type { ButtonProps } from '../model/button.types';
import styles from '../styles/button.module.css';

export function Button({
  children,
  variant = 'default',
  className,
  fab,
  position,
  ...props
}: ButtonProps) {
  const buttonClassName =
    `${styles.button} ${variant === 'icon' ? styles['button--icon'] : ''} ${variant === 'text' ? styles['button--text'] : ''} ${fab ? styles['button--fab'] : ''} ${className || ''}`.trim();

  return (
    <button
      {...props}
      style={fab ? { ...position } : {}}
      className={buttonClassName}
    >
      {children}
    </button>
  );
}
