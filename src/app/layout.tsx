'use client';

import { Roboto } from 'next/font/google';
import 'mdui';
import './globals.css';
import { ReactNode } from 'react';
import Head from 'next/head';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

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
      </Head>
      <body className={`${roboto.variable}`}>
        <mdui-layout full-height>{children}</mdui-layout>
      </body>
    </html>
  );
}
