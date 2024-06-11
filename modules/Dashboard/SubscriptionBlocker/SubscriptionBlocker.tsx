'use client';

import Btn from '@/components/UI/Btn/Btn';
import s from './SubscriptionBlocker.module.scss';
import {ReactElement, useEffect, useState} from 'react';
import {useStore} from '@/src/store';
import {getTitleOfSubscription} from '@/src/helpers/util';
import {useMutation} from 'react-query';
import {RemoveSubscription} from '@/src/api';

export const SubscriptionBlocker = ({
  children,
  requiredPlan
}: {
  children: ReactElement;
  requiredPlan: 'basic' | 'advanced';
}) => {
  const {subscriptionInfo} = useStore();
  const [isAvailable, setIsAvailable] = useState(false);
  const {mutate} = useMutation(RemoveSubscription);

  useEffect(() => {
    if (!subscriptionInfo?.subscriptionPlan) return;

    const {subscriptionPlan, subscriptionExpiresAt} = subscriptionInfo;

    const isSubscriptionValid = new Date(subscriptionExpiresAt) >= new Date(); // Проверяем, действительна ли подписка

    if (isSubscriptionValid) {
      if (subscriptionPlan === requiredPlan) {
        return setIsAvailable(true);
      } else if (subscriptionPlan === 'advanced') {
        return setIsAvailable(true);
      }
    } else {
      mutate();
      setIsAvailable(false);
    }
  }, [subscriptionInfo, requiredPlan]);

  if (isAvailable) {
    return children;
  }
  return (
    <div className='relative'>
      <div className={s.blocker}>
        <div className='flex flex-col items-center'>
          <h2 className='text-xl font-bold text-primary-500'>Доступ закрыт</h2>
          <p className='mb-3 mt-2'>Контент будет доступен по подписке типа "{getTitleOfSubscription(requiredPlan)}"</p>
          <Btn>Открыть доступ</Btn>
        </div>
      </div>
      <div className={s.wrapper}>{children}</div>
    </div>
  );
};
