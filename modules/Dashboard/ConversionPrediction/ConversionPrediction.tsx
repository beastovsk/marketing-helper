'use client';

import {useStore} from '@/src/store';
import {Conversion} from '../Conversion/Conversion';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';

import s from './ConversionPrediction.module.scss';

const ConversionPrediction = () => {
  const {statistic} = useStore();


  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div>
        <h3 className={s.subtitle}>Прогноз конверсии на неделю</h3>
        <div className='box mt-5 flex flex-col gap-5'>
          <Conversion data={statistic?.conversion.analytics || []} />
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default ConversionPrediction;
