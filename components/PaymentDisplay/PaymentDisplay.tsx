'use client';

import Loading from '@/app/loading';
import {StatisticCampaign, confirmSubscription} from '@/src/api';
import {customNotification} from '@/src/helpers/customNotification';
import {Result} from 'antd';
import {ResultStatusType} from 'antd/es/result';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import Btn from '../UI/Btn/Btn';

export const PaymentDisplay = () => {
  const router = useRouter();
  const [status, setStatus] = useState('success');
  const {mutate: confirmPayment, isLoading} = useMutation(confirmSubscription);
  const {mutate: getData, isLoading: isDataLoading} = useMutation(StatisticCampaign);
  const title = status ? (status === 'success' ? 'Благодарим за покупку!' : 'Произошла проблема во время оплаты') : '';
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('paymentStatus');

  useEffect(() => {
    if (paymentStatus === 'success') {
      const uuid = localStorage.getItem('uuid');
      const plan = localStorage.getItem('plan');
      setStatus('success');

      confirmPayment(
        {uuid, plan},
        {
          onSuccess: (data) => {
            if (data.status === 'paid') {
              getData();
              //   router.push('/dashboard');
              //   router.refresh();
            }
          }
        }
      );
    }

    if (paymentStatus === 'failed') {
      setStatus('failed');
    }
  }, []);

  if (!status || isLoading) {
    <Loading />;
  }

  return (
    <div className='flex flex-col'>
      <Result status={status === 'failed' ? 'error' : 'success'} title={title} />
      <Link href='/dashboard'>
        <Btn>Вернуться</Btn>
      </Link>
    </div>
  );
};
