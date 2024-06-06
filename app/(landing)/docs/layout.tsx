import '@/src/styles/global.scss';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <div className='container'>{children}</div>;
}
