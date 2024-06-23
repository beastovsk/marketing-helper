import {Header} from '@/modules/Partners/Header/Header';
import {PartnersProvider} from '@/modules/Partners/PartnersProvider/PartnersProvider';
import {Sidebar} from '@/modules/Partners/Sidebar/Sidebar';
import '@/src/styles/global.scss';
import React from 'react';

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
