'use client';

import s from './Main.module.scss';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import {useStore} from '@/src/store';
import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {StatusText} from '@/components/UI/StatusText/StatusText';
import {Skeleton} from 'antd';
import {formatProductPrice} from '@/src/helpers/hooks';

const Main = () => {
  const {statistic} = useStore();

  const cardsList = [
    {
      label: 'Аудитория',
      description: statistic?.audacity.value,
      review: statistic?.audacity.review,
      isGood: statistic?.audacity.isGood
    },
    {
      label: 'Конверсия',
      description: statistic?.conversion.value,
      review: statistic?.conversion.review,
      isGood: statistic?.conversion.isGood
    },
    {
      label: 'ROI',
      description: statistic?.roi.value,
      review: statistic?.roi.review,
      isGood: statistic?.roi.isGood
    },
    {
      label: 'SAS',
      description: statistic ? (
        <>
          {formatProductPrice(statistic?.sas.value)} ({statistic?.sas.rangeForNicheAndChannel} ₽)
        </>
      ) : (
        <Skeleton.Button active />
      ),
      review: statistic?.sas.review,
      isGood: statistic?.sas.isGood
    }
  ];

  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div>
        <PreloadText className={s.title} elementType='h1'>
          {statistic?.name}
        </PreloadText>
        <PreloadText className={s.subtitle} elementType='h2'>
          {statistic?.niche.label}
          <StatusText success={statistic?.niche.isGood} className='ml-2'>
            {`(${statistic?.niche.review || 'Данные не получены'})`}
          </StatusText>
        </PreloadText>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-1 mt-5'>
          {cardsList.map(({description, label, review, isGood}, i) => (
            <div className='box flex-grow' key={i}>
              <PreloadText elementType='h1' className='text-xl'>
                {label}
              </PreloadText>
              <PreloadText elementType='h4' className='text-lg mt-3'>
                {description}
              </PreloadText>
              <PreloadText elementType='p' className='mt-5'>
                <StatusText success={isGood}>{review}</StatusText>
              </PreloadText>
            </div>
          ))}
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Main;
