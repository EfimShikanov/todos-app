'use client';

import { Roboto } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import Head from 'next/head';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

// export const metadata: Metadata = {
//   manifest: '/manifest.json',
//   title: 'Задачи',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className={'mdui-theme-auto'}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/512x512.png" />
        <link rel="apple-touch-icon" href="/icons/512x512.png" />
        <link rel="apple-touch-startup-image" href="/icons/512x512.png" />
        <link rel="icon" href="/icons/384x384.png" />
        <link rel="icon" href="/icons/256x256.png" />
        <link rel="icon" href="/icons/144x144.png" />
        <link rel="icon" href="/icons/128x128.png" />
        <link rel="icon" href="/icons/96x96.png" />
        <link rel="icon" href="/icons/72x72.png" />
        <link rel="icon" href="/icons/48x48.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={`${roboto.variable}`}>
        <mdui-layout full-height>{children}</mdui-layout>
      </body>
    </html>
  );
}
