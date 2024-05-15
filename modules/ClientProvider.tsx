'use client';
import React from 'react';
import AntdThemeProvider from '@/modules/AntdThemeProvider';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

function ClientProvider({children}: {children: React.ReactNode}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AntdThemeProvider>{children}</AntdThemeProvider>
    </QueryClientProvider>
  );
}

export default ClientProvider;
