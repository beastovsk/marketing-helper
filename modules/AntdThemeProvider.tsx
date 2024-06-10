'use client';
import React, {useEffect, useState} from 'react';
import {ConfigProvider, Empty} from 'antd';
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
import {Banner} from '@/components/Banner/Banner';

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
  const {setCampaign, setSubscriptionInfo, setStatistic, statistic} = useStore();
  const {mutate, isLoading} = useMutation(GetUser);

  useEffect(() => {
    setMounted(true);
    if (!pathname.split('/').includes('dashboard') && pathname !== '/campaign/' && pathname !== '/subscription/')
      return;

    mutate(null, {
      onSuccess: (data) => {
        if (!data) {
          router.push('/auth');
          localStorage.removeItem('email');
          deleteCookie('token');
          return;
        }

        const {subscriptionPlan, subscriptionExpiresAt, campaign, email, campaignStatistic} = data?.user;
        setSubscriptionInfo({subscriptionPlan, subscriptionExpiresAt});
        setCampaign(campaign);

        if (campaignStatistic) {
          setStatistic(JSON.parse(campaignStatistic));
        }

        localStorage.setItem('email', email);

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

  if (!mounted || isLoading) {
    return <Loading />;
  }

  return (
    <ConfigProvider locale={locale} theme={lightTheme}>
      {!statistic && pathname.split('/').includes('dashboard') ? (
        <Banner
          className='mt-1 ml-[300px] lg:ml-0'
          title='Произошла ошибка'
          message='Для решения проблемы - обновите данные компании через настройки (запросите данные без изменения). Извиняемся за неудобства!'
          type='danger'
        />
      ) : null}
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeProvider;
