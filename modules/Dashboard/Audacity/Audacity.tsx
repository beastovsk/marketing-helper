'use client';

import s from './Audacity.module.scss';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import {useStore} from '@/src/store';
import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {StatusText} from '@/components/UI/StatusText/StatusText';
import {Empty, Skeleton} from 'antd';
import PieChart from '@/components/UI/PieChart/PieChart';

const Audacity = () => {
  const {statistic} = useStore();
  console.log(statistic);

  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div>
        <PreloadText className={s.subtitle} elementType='h2'>
          Портрет аудитории
        </PreloadText>
        <div className='mt-5'>
          <div className='box flex-grow'>
            <PreloadText elementType='h1' className='text-xl'>
              {statistic?.audacity.value}
            </PreloadText>
            <PreloadText elementType='h4' className='text-lg mt-3'>
              <StatusText success={statistic?.audacity.isGood}>{statistic?.audacity.review}</StatusText>
            </PreloadText>
            <h4 className='text-lg mt-3'>Откуда могут узнать о продукте?</h4>
            {statistic
              ? statistic?.demographic.sourceOfInformation.map((label) => (
                  <PreloadText elementType='p' className='text-md'>
                    - {label}
                  </PreloadText>
                ))
              : null}
            <h4 className='text-lg mt-3'>Советы для привлечения</h4>
            {statistic
              ? statistic?.audacity.attractingAdvices.map((label) => (
                  <PreloadText elementType='p' className='text-md'>
                    - {label}
                  </PreloadText>
                ))
              : null}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-1 mt-5'>
          <div className='box'>
            <h1 className='text-xl mb-5'>Возрастная группа</h1>
            <div className='w-3/4 md:w-full m-auto'>
              <PieChart data={statistic?.demographic.ageGroup} />
            </div>
          </div>
          <div className='box'>
            <h1 className='text-xl mb-5'>Пол</h1>
            <div className='w-3/4 m-auto'>
              {statistic ? (
                <PieChart
                  data={Object.entries(statistic?.demographic.sex).map(([key, value]) => ({
                    label: key,
                    // @ts-ignore
                    value: Number(value.slice(0, -1))
                  }))}
                />
              ) : (
                <Empty description='Нет данных' />
              )}
            </div>
          </div>
          <div className='box'>
            <h1 className='text-xl mb-5'>Покупательские качества</h1>
            <div className='w-3/4 m-auto'>
              <PieChart data={statistic?.demographic.buyingBehavior} />
            </div>
          </div>
          <div className='box'>
            <h1 className='text-xl mb-5'>География</h1>
            <div className='w-3/4 m-auto'>
              <PieChart data={statistic?.demographic.geography} />
            </div>
          </div>
          <div className='box'>
            <h1 className='text-xl mb-5'>Интересы</h1>
            <div className='w-3/4 m-auto'>
              <PieChart data={statistic?.demographic.interests} />
            </div>
          </div>
          <div className='box'>
            <h1 className='text-xl mb-5'>Профессии</h1>
            <div className='w-3/4 m-auto'>
              <PieChart data={statistic?.demographic.profession} />
            </div>
          </div>
          <div className='box'>
            <h1 className='text-xl mb-5'>Соц. сети для привлечения</h1>
            <div className='w-3/4 m-auto'>
              <PieChart data={statistic?.demographic.socialNetworks} />
            </div>
          </div>
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Audacity;
