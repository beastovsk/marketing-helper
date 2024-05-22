import {useQuery} from 'react-query';
import {Conversion} from '../Conversion/Conversion';
import s from './Main.module.scss';
import {StatisticCampaign} from '@/src/api';
import {useEffect} from 'react';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';

const Main = () => {
  const cardsList = [
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    },
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    },
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    },
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    }
  ];

  return (
    <SubscriptionBlocker requiredPlan='demo'>
      <>
        <h1 className={s.title}>Сервис по анализу маркетинговых стратегий с помощью ИИ</h1>
        <h2 className={s.subtitle}>Маркетинг и реклама (актуально)</h2>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-1 mt-5'>
          {cardsList.map(({description, label, review}, i) => (
            <div className='box flex-grow' key={i}>
              <h3 className='text-xl'>{label}</h3>
              <h4 className='text-lg mt-3'>{description}</h4>
              <p className='mt-5'>{review}</p>
            </div>
          ))}
        </div>
      </>
    </SubscriptionBlocker>
  );
};

export default Main;
