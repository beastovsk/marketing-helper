'use client';

import {useStore} from '@/src/store';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import s from './Optimization.module.scss';
import {formatProductPrice} from '@/src/helpers/hooks';
import {Empty, Skeleton} from 'antd';

const Optimization = () => {
  const {statistic} = useStore();

  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div className='box'>
        <h3 className='text-xl mb-5'>Оптимизация расходов</h3>
        <table className='w-full border-spacing-5 border-separate'>
          <thead>
            <tr>
              <th>Канал</th>
              <th>Бюджет</th>
              <th>Конверсия</th>
              <th>Советы</th>
            </tr>
          </thead>
          <tbody>
            {statistic?.optimizationChannels.map(({recommendBudget, channel, conversion, review}, i) => (
              <tr className='md:text-sm' key={i}>
                <th>{channel}</th>
                <th>{formatProductPrice(recommendBudget)}</th>
                <th>{conversion}</th>
                <th>{review}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SubscriptionBlocker>
  );
};

export default Optimization;
