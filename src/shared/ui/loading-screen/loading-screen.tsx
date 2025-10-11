import styles from './loading-screen.module.scss';

export function LoadingScreen() {
  return (
    <mdui-circular-progress
      className={styles['loader']}
      max={1}
    ></mdui-circular-progress>
  );
}
