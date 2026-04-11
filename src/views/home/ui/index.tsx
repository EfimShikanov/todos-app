'use client';

import { Header } from '@features/header';
import dynamic from 'next/dynamic';
import { LoadingScreen } from '@/shared/ui/loading-screen';
import styles from '../styles/home.module.css';

const HomeContent = dynamic(
  () => import('./home-content').then((m) => m.HomeContent),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

export function HomePage() {
  return (
    <main className={styles.main}>
      <Header />
      <HomeContent />
    </main>
  );
}
