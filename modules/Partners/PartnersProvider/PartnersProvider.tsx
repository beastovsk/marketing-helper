'use client';

import {deleteCookie, getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useStore} from '../store';
import {useQuery} from 'react-query';
import {getPartnerStatistic} from '@/src/api';
import Loading from '@/app/loading';

export const PartnersProvider = ({children}) => {
  const router = useRouter();
  const {statisticDate, setPartnerStatistic} = useStore();
  const [params, setParams] = useState({startDate: '', endDate: ''});

  useEffect(() => {
    const partnerToken = getCookie('partnerToken');
    if (!partnerToken) {
      router.push('/partner/auth');
      return;
    }

    setParams(statisticDate);
  }, [router]);

  const {data, isLoading, error} = useQuery(['partnerStatistic', params], () => getPartnerStatistic(params), {
    enabled: !!params.startDate && !!params.endDate
  });

  useEffect(() => {
    if (data) {
      if (data?.message === 'Пользователь не найден') {
        router.push('/partner/auth');
        return deleteCookie('partnerToken');
      }
      setPartnerStatistic(data);
    }
  }, [data, setPartnerStatistic]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return <div>{children}</div>;
};
