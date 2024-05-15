'use client';
import React, {useEffect, useState} from 'react';
import {ConfigProvider} from 'antd';
import locale from 'antd/locale/ru_RU';
import {darkTheme, lightTheme} from '@/src/helpers/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {useMutation} from 'react-query';
import {usePathname, useRouter} from 'next/navigation';
import {deleteCookie} from 'cookies-next';
import io from 'socket.io-client';
import {customNotification} from '@/src/helpers/customNotification';
import Btn from '@/components/UI/Btn/Btn';

dayjs.locale('ru');
// @ts-ignore

function AntdThemeProvider({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider locale={locale} theme={darkTheme}>
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeProvider;
