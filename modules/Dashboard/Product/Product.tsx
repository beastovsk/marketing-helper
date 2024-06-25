'use client';

import s from './Product.module.scss';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import {useStore} from '@/src/store';
import {PreloadText} from '@/components/UI/PreloadText/PreloadText';
import {StatusText} from '@/components/UI/StatusText/StatusText';
import {Empty, Skeleton} from 'antd';
import PieChart from '@/components/UI/PieChart/PieChart';

const Product = () => {
  const {statistic} = useStore();
  console.log(statistic);
  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div>
        <PreloadText className={s.subtitle} elementType='h2'>
          О продукте
        </PreloadText>
        <div className='mt-5'>
          <div className='box flex-grow'>
            <PreloadText elementType='h1' className='text-xl'>
              {statistic?.product.review !== 'review'
                ? statistic?.product.review
                : 'Нет данных (обновите кампанию в настройках)'}
            </PreloadText>

            <h4 className='text-lg mt-3'>Преимущества</h4>
            {statistic
              ? statistic?.product.features.map((label) => (
                  <PreloadText elementType='p' className='text-md'>
                    - {label}
                  </PreloadText>
                ))
              : null}

            <h4 className='text-lg mt-3'>Потенциальные проблемы</h4>
            {statistic
              ? statistic?.product.problems.map((label) => (
                  <PreloadText elementType='p' className='text-md'>
                    - {label}
                  </PreloadText>
                ))
              : null}
          </div>
        </div>
      </div>
    </SubscriptionBlocker>
  );
};

export default Product;
