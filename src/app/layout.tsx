import { Roboto } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
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
    <html lang="ru" className={'mdui-theme-auto'}>
      <head>
        <title>Задачи </title>
        <link rel="manifest" href="manifest.webmanifest" />
      </head>
      <body className={`${roboto.variable}`}>
        <mdui-layout full-height>{children}</mdui-layout>
      </body>
    </html>
  );
}
