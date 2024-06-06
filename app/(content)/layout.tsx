import '@/src/styles/global.scss';
import ClientProvider from '@/modules/ClientProvider';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
