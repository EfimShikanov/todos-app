import styles from '../styles/loading-screen.module.css';

export function LoadingScreen() {
  return (
    <section className={styles.loading}>
      <span className={`${styles.loading__spinner} material-symbols-rounded`}>
        progress_activity
      </span>
      <h2>Загрузка</h2>
    </section>
  );
}
