import { Roboto } from 'next/font/google';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Задачи',
  description: 'Отслеживание выполнения задач',
  icons: [
    { url: '/icons/48x48.png', type: 'image/png', sizes: '48x48' },
    {
      url: '/icons/72x72.png',
      type: 'image/png',
      sizes: '72x72',
    },
    { url: '/icons/96x96.png', type: 'image/png', sizes: '96x96' },
    {
      url: '/icons/128x128.png',
      type: 'image/png',
      sizes: '128x128',
    },
    { url: '/icons/144x144.png', type: 'image/png', sizes: '144x144' },
    {
      url: '/icons/256x256.png',
      type: 'image/png',
      sizes: '256x256',
    },
    { url: '/icons/384x384.png', type: 'image/png', sizes: '384x384' },
    {
      url: '/icons/512x512.png',
      type: 'image/png',
      sizes: '512x512',
    },
  ],
};

export const viewport: Viewport = {
  themeColor: '#B296DF',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <title>Задачи </title>
        <link rel="manifest" href="manifest.webmanifest" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add,calendar_clock,delete,delete_history,edit,grid_view,inbox,more_vert,progress_activity,today&display=swap"
        />
      </head>
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
