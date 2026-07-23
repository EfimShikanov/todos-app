import { useVibration } from '@shared/ui/button/lib/useVibration';
import type { ButtonProps } from '../model/button.types';
import styles from '../styles/button.module.css';

export function Button({
  children,
  variant = 'default',
  className,
  fab,
  position,
  onClick = () => {},
  ...props
}: ButtonProps) {
  const buttonClassName =
    `${styles.button} ${variant === 'icon' ? styles['button--icon'] : ''} ${variant === 'text' ? styles['button--text'] : ''} ${fab ? styles['button--fab'] : ''} ${className || ''}`.trim();

  const handleClick = useVibration(onClick, [8]);

  return (
    <button
      {...props}
      onClick={handleClick}
      style={fab ? { ...position } : {}}
      className={buttonClassName}
    >
      {children}
    </button>
  );
}
