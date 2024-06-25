'use client';

import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import s from './Recommendations.module.scss';
import {useStore} from '@/src/store';
import {useEffect, useState} from 'react';
import {Skeleton} from 'antd';

const Recommendations = () => {
  const {statistic} = useStore();
  const [advices, setAdvices] = useState([]);

  useEffect(() => {
    if (!statistic) return;
    setAdvices(() => [...statistic?.recommendations, ...statistic?.optimizations]);
  }, [statistic]);

  const list = [
    {
      title: 'Первый клиент',
      date: statistic?.statistic?.firstClient
    },
    {
      title: 'Первая продажа',
      date: statistic?.statistic?.firstSale
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
                ~
                {date ? (
                  `${date} дней`
                ) : (
                  <>
                    <Skeleton.Button className='ml-1' active /> дней
                  </>
                )}
              </PreloadText>
            </div>
          ))}
        </div>
        <div className='box mt-10'>
          <h3 className='text-xl mb-5'>Предложения и рекомендации</h3>

          <div className='flex flex-col gap-3'>
            {advices.length ? (
              advices?.map(({label, review}, i) => (
                <div>
                  <PreloadText elementType='h4' className='text-lg'>
                    {i + 1}. {label}
                  </PreloadText>
                  <PreloadText elementType='p' className='text-[#11111180]'>
                    {review !== 'review' ? review : 'Нет данных (обновите кампанию в настройках)'}{' '}
                  </PreloadText>
                </div>
              ))
            ) : (
              <Skeleton active />
            )}
          </div>
        </div>
        {/* <div className='box mt-10'>
          <h3 className='text-xl mb-5'>Идеи для контентного маркетинга</h3>

          <h4 className='text-lg mb-2 font-bold'>Видео контент (YT, YT Shorts, TikTok, Reels):</h4>
          <div className='flex flex-col gap-3'>
            {statistic.content.video.length ? (
              statistic.content.video?.map(({label, description}, i) => (
                <div>
                  <PreloadText elementType='h4' className='text-lg'>
                    {i + 1}. {label}
                  </PreloadText>
                  <PreloadText elementType='p' className='text-[#11111180]'>
                    {description}
                  </PreloadText>
                </div>
              ))
            ) : (
              <Skeleton active />
            )}
          </div>

          <h4 className='text-lg mb-2 mt-5 font-bold'>Статьи (VC, Habr, Дзен):</h4>
          <div className='flex flex-col gap-3'>
            {statistic.content.articles.length ? (
              statistic.content.articles?.map(({label, description}, i) => (
                <div>
                  <PreloadText elementType='h4' className='text-lg'>
                    {i + 1}. {label}
                  </PreloadText>
                  <PreloadText elementType='p' className='text-[#11111180]'>
                    {description}
                  </PreloadText>
                </div>
              ))
            ) : (
              <Skeleton active />
            )}
          </div>
        </div> */}
      </div>
    </SubscriptionBlocker>
  );
};

export default Recommendations;
