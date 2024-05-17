import {Header} from '@/modules/Dashboard/Header/Header';
import {Sidebar} from '@/modules/Dashboard/Sidebar/Sidebar';
import '@/src/styles/global.scss';
import {getCookie} from 'cookies-next';
import React from 'react';

export default async function RootLayout({data, children}: {data: any; children: React.ReactNode}) {
  return <>{children}</>;
}
