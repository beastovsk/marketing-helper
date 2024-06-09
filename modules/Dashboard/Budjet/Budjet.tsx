'use client';
import {useStore} from '@/src/store';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import s from './Budjet.module.scss';
import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {StatusText} from '@/components/UI/StatusText/StatusText';
import {formatProductPrice} from '@/src/helpers/hooks';

const Budjet = () => {
  const {statistic} = useStore();

  const list = [
    {
      title: 'Расходы',
      amount: statistic?.expenses.value,
      range: statistic?.expenses.range,
      review: statistic?.expenses.review,
      isGood: statistic?.expenses.isGood
    },
    {
      title: 'Прогнозируемый доход',
      amount: statistic?.income.value,
      range: statistic?.income.range,
      review: statistic?.income.review,
      isGood: statistic?.expenses.isGood
    }
  ];

  return (
    <SubscriptionBlocker requiredPlan='demo'>
      <div>
        <h1 className={s.title}>Бюджет</h1>
        <div className='grid grid-cols-2 md:grid-cols-1 gap-4 mt-5'>
          {list.map(({amount, review, range, title, isGood}) => (
            <div className='box' key={title}>
              <PreloadText elementType='h3' className='text-xl mb-5 font-normal'>
                {title}
              </PreloadText>
              <PreloadText elementType='h4' className='text-xl bold mb-3'>
                {formatProductPrice(amount)}
              </PreloadText>
              <PreloadText elementType='p' className='mb-3'>
                {range} ₽
              </PreloadText>
              <PreloadText elementType='p'>
                <StatusText success={isGood}>{review}</StatusText>
              </PreloadText>
            </div>
          ))}
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Budjet;
