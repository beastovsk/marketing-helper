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
  const {mutate: confirmPayment, isLoading, isSuccess} = useMutation(confirmSubscription);
  const {mutate: getData, isLoading: isDataLoading} = useMutation(StatisticCampaign);
  const title = status ? (status === 'success' ? 'Благодарим за покупку!' : 'Произошла проблема во время оплаты') : '';
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('paymentStatus');

  useEffect(() => {
    if (paymentStatus === 'success') {
      const uuid = localStorage.getItem('uuid');
      const plan = localStorage.getItem('plan');
      const payment = localStorage.getItem('paymentType');
      const promo = localStorage.getItem('promo');
      setStatus('success');

      confirmPayment(
        {uuid, plan, payment, promo},
        {
          onSuccess: (data) => {
            if (data.status === 'paid' || data.status === 'succeeded') {
              getData();
              localStorage.removeItem('uuid');
              localStorage.removeItem('paymentType');
              localStorage.removeItem('plan');
              localStorage.removeItem('promo');
            }
            if (data?.paid === false) {
              setStatus('failed');
            }
          }
        }
      );
    }

    if (paymentStatus === 'failed') {
      setStatus('failed');
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col'>
      <Result status={status === 'failed' ? 'error' : 'success'} title={title} />
      <Link href='/dashboard'>
        <Btn loading={isDataLoading}>Вернуться</Btn>
      </Link>
    </div>
  );
};
