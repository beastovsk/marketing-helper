'use client';

import Loading from '@/app/loading';
import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {StatusText} from '@/components/UI/StatusText/StatusText';
import {getAdminStatistic} from '@/src/api';
import {useQuery} from 'react-query';
import {useStore} from '../store';

export const Statistic = () => {
  const {statistic} = useStore();

  const list = [
    {
      title: 'Всего пользователей',
      value: statistic?.users?.length || 0
    },
    {
      title: 'Подписчики с тарифом "Базовый"',
      value: statistic?.basicSubs?.length || 0
    },
    {
      title: 'Подписчики с тарифом "Продвинутый"',
      value: statistic?.advancedSubs?.length || 0
    },
    {
      title: 'Приблизительный общий доход',
      value: statistic?.income || 0
    }
  ];

  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-1 gap-4 mt-5'>
        {list.map(({value, title}) => (
          <div className='box' key={title}>
            <PreloadText elementType='h3' className='text-xl mb-5 font-normal'>
              {title}
            </PreloadText>

            <PreloadText elementType='h1' className='text-xl'>
              <StatusText success={true}>{value}</StatusText>
            </PreloadText>
          </div>
        ))}
      </div>
    </div>
  );
};
