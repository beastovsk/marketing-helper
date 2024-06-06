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
      description: 'Маркетологи и специалисты по рекламе, использующие ИИ для оптимизации стратегий',
      review: ' Целесообразно сосредоточиться на крупных агентствах и компаниях с большим маркетинговым бюджетом'
    },
    {
      label: 'Конверсия',
      description: '5% (от 3% до 7% в нише)',
      review: 'Для данной ниши и канала показатель конверсии выше среднего'
    },
    {
      label: 'ROI',
      description: '300%',
      review: 'Оптимальный ROI для данной ниши и канала, инвестиции оправданы'
    },
    {
      label: 'SAS',
      description: '1000 RUB (от 800 до 1200 в нише)',
      review: 'Хороший показатель, особенно для использования в нише маркетинга и рекламы'
    }
  ];

  return (
    <SubscriptionBlocker requiredPlan='demo'>
      <div>
        <h1 className={s.title}>Сервис по анализу маркетинговых стратегий с помощью ИИ</h1>
        <h2 className={s.subtitle}>
          Маркетинг и реклама <span className='text-success-500'>(актуально)</span>
        </h2>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-1 mt-5'>
          {cardsList.map(({description, label, review}, i) => (
            <div className='box flex-grow' key={i}>
              <h3 className='text-xl'>{label}</h3>
              <h4 className='text-lg mt-3'>{description}</h4>
              <p className='mt-5'>{review}</p>
            </div>
          ))}
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Main;
