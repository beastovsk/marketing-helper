'use client';

import s from './Competitors.module.scss';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import {useStore} from '@/src/store';
import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {StatusText} from '@/components/UI/StatusText/StatusText';
import {Empty, Skeleton} from 'antd';
import PieChart from '@/components/UI/PieChart/PieChart';
import {LinkOutlined} from '@ant-design/icons';
import Link from 'next/link';

const Competitors = () => {
  const {statistic} = useStore();

  return (
    <SubscriptionBlocker requiredPlan='advanced'>
      <div>
        <PreloadText className={s.subtitle} elementType='h2'>
          Конкуренция
        </PreloadText>
        <div className='mt-5'>
          <div className='box flex-grow'>
            {statistic?.competitors.length
              ? statistic?.competitors.map(({label, link, improvement, description, positiveSides, negativeSides}) => (
                  <div className='mb-3'>
                    <PreloadText elementType='h1' className='text-xl'>
                      {label}{' '}
                      <Link href={link}>
                        <LinkOutlined className='text-primary-500 hover:opacity-70 transition-opacity cursor-pointer' />
                      </Link>
                    </PreloadText>
                    <PreloadText elementType='h3' className='text-lg text-gray-600'>
                      {description}
                    </PreloadText>
                    <h4 className='text-lg mt-3'>Сильные стороны:</h4>
                    {positiveSides.length
                      ? positiveSides.map((label) => (
                          <PreloadText elementType='h4' className='text-md'>
                            <StatusText success={true}>{label}</StatusText>
                          </PreloadText>
                        ))
                      : null}
                    <h4 className='text-lg mt-3'>Слабые стороны:</h4>
                    {negativeSides.length
                      ? negativeSides.map((label) => (
                          <PreloadText elementType='h4' className='text-md'>
                            <StatusText success={false}>{label}</StatusText>
                          </PreloadText>
                        ))
                      : null}
                    <h4 className='text-lg mt-3'>Как можно превзойти?</h4>
                    {improvement.length
                      ? improvement.map((label) => (
                          <PreloadText elementType='h4' className='text-md'>
                            {label}
                          </PreloadText>
                        ))
                      : null}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Competitors;
