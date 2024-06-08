'use client';

import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import s from './Recommendations.module.scss';
import {useStore} from '@/src/store';

const Recommendations = () => {
  const {statistic} = useStore();

  const advices = [...statistic.recommendations, ...statistic.optimizations];
  const list = [
    {
      title: 'Первый клиент',
      date: statistic.statistic.firstClient
    },
    {
      title: 'Первая продажа',
      date: statistic.statistic.firstSale
    }
  ];
  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div>
        <h1 className={s.title}>Прогноз</h1>
        <div className='grid grid-cols-2 md:grid-cols-1 gap-4 mt-5'>
          {list.map(({date, title}) => (
            <div className='box' key={title}>
              <PreloadText elementType='h3' className='text-xl mb-5 font-normal'>
                {title}
              </PreloadText>
              <PreloadText elementType='h4' className='text-xl bold mb-3'>
                ~{date}
              </PreloadText>
            </div>
          ))}
        </div>

        <div className='box mt-10'>
          <h3 className='text-xl mb-5'>Предложения и рекомендации</h3>

          <div className='flex flex-col gap-3'>
            {advices.map(({value, review}, i) => (
              <div>
                <PreloadText elementType='h4' className='text-lg'>
                  {i + 1}. {value}
                </PreloadText>
                <PreloadText elementType='p' className='text-[#11111180]'>
                  {review}
                </PreloadText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Recommendations;
