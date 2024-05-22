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
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('paymentStatus');
  const [mounted, setMounted] = useState(false);
  const {setCampaign, setSubscriptionInfo} = useStore();
  const {data, isSuccess} = useQuery('data', () => GetUser());
  const {mutate: confirmPayment, isLoading} = useMutation(confirmSubscription);

  useEffect(() => {
    if (!isSuccess) return;
    if (!data?.user) {
      router.push('/auth');
      localStorage.removeItem('email');
      deleteCookie('token');
      return null;
    }

    const {subscriptionPlan, subscriptionExpiresAt, campaign, email} = data?.user;

    if (subscriptionPlan === null) {
      if (paymentStatus === 'success') return;
      router.push('/subscription');
    }

    if (campaign === null) {
      router.push('/campaign');
    }

    setSubscriptionInfo({subscriptionPlan, subscriptionExpiresAt});
    setCampaign(campaign);
    localStorage.setItem('email', email);

    return () => {
      console.log('leave uf');
    };
  }, [isSuccess, data]);

  useEffect(() => {
    setMounted(true);
    if (paymentStatus === 'success') {
      const uuid = localStorage.getItem('uuid');
      const plan = localStorage.getItem('plan');

      confirmPayment(
        {uuid, plan},
        {
          onSuccess: (data) => {
            if (data.status === 'paid') {
              customNotification('success', 'top', 'Благодарим за покупку');
              router.push('/dashboard');
            }
          }
        }
      );
    }
  }, []);

  if (!mounted || isLoading || !isSuccess) {
    return <Loading />;
  }

  return (
    <ConfigProvider locale={locale} theme={lightTheme}>
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeProvider;
