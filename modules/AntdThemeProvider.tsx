'use client';
import React, {useEffect, useState} from 'react';
import {ConfigProvider} from 'antd';
import locale from 'antd/locale/ru_RU';
import {lightTheme} from '@/src/helpers/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {useMutation, useQuery} from 'react-query';
import {GetUser, confirmSubscription} from '@/src/api';
import {useParams, usePathname, useRouter, useSearchParams} from 'next/navigation';
import {deleteCookie} from 'cookies-next';
import {ChangeCampaignModal} from '@/components/ChangeCampaign/ChangeCampaign';
import {useStore} from '@/src/store';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import {ChangeSubscriptionModal} from '@/components/ChangeSubscription/ChangeSubscription';
import Loading from '@/app/loading';
import {customNotification} from '@/src/helpers/customNotification';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale('ru');

function AntdThemeProvider({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const {setCampaign, setSubscriptionInfo, subscriptionInfo} = useStore();
  const {mutate, isSuccess} = useMutation(GetUser);
  console.log(pathname);
  useEffect(() => {
    setMounted(true);
    if (pathname === '/') return;
    mutate(null, {
      onSuccess: (data) => {
        if (!data?.user) {
          router.push('/auth');
          localStorage.removeItem('email');
          deleteCookie('token');
          return;
        }

        const {subscriptionPlan, subscriptionExpiresAt, campaign, email} = data?.user;
        setSubscriptionInfo({subscriptionPlan, subscriptionExpiresAt});
        setCampaign(campaign);
        localStorage.setItem('email', email);

        if (pathname === '/payment/') return;

        if (subscriptionPlan === null) {
          router.push('/subscription');
        }

        if (campaign === null) {
          router.push('/campaign');
        }
      }
    });

    return () => {
      setCampaign(null);
    };
  }, [pathname]);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <ConfigProvider locale={locale} theme={lightTheme}>
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeProvider;
