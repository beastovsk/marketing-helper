'use client';

import {useStore} from '@/src/store';
import {Conversion} from '../Conversion/Conversion';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';

import s from './ConversionPrediction.module.scss';
import {PreloadText} from '@/components/UI/PreloadText/PreloadText';

const ConversionPrediction = () => {
  const {statistic} = useStore();

  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div>
        <h3 className={s.subtitle}>Прогноз конверсии</h3>
        <h4 className='flex text-lg gap-1 mt-2'>
          Цель конверсии - <PreloadText className='text-success-500'>{statistic.conversionTarget}</PreloadText>
        </h4>
        <div className='box mt-5 flex flex-col gap-5'>
          <Conversion data={statistic?.conversion.analytics || []} />
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default ConversionPrediction;
