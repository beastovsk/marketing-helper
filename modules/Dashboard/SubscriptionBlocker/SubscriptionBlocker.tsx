'use client';

import Btn from '@/components/UI/Btn/Btn';
import s from './SubscriptionBlocker.module.scss';
import {ReactElement, useEffect, useState} from 'react';
import {useStore} from '@/src/store';
import {getTitleOfSubscription} from '@/src/helpers/util';

export const SubscriptionBlocker = ({
  children,
  requiredPlan
}: {
  children: ReactElement;
  requiredPlan: 'demo' | 'basic' | 'advanced';
}) => {
  const {subscriptionInfo} = useStore();
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!subscriptionInfo?.subscriptionPlan) return;

    const {subscriptionPlan} = subscriptionInfo;

    if (subscriptionPlan === requiredPlan) setIsAvailable(true);

    if (subscriptionPlan === 'basic' && requiredPlan === 'demo') {
      setIsAvailable(true);
    }
    if (subscriptionPlan === 'advanced' && (requiredPlan === 'demo' || requiredPlan === 'basic')) {
      setIsAvailable(true);
    }
  }, [subscriptionInfo]);

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
