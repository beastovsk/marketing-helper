import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import s from './Prices.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import reviewImage from '../../../public/image/review.jpg';

export const Prices = () => {
  const data = [
    {
      title: 'Подписка на месяц',
      list: [
        'Прогноз конверсии',
        'Рекомендации по улучшению ROI, CAC',
        'Оптимизация и перераспределение бюджета',
        'Предложения и рекомендации в долгосрочном планировании'
      ],
      price: '1990'
    },
    {
      title: 'Подписка на 3 месяца',
      list: [
        'Прогноз конверсии',
        'Рекомендации по улучшению ROI, CAC',
        'Оптимизация и перераспределение бюджета',
        'Предложения и рекомендации в долгосрочном планировании'
      ],
      price: '5500'
    },
    {
      title: 'Подписка на год',
      list: [
        'Прогноз конверсии',
        'Рекомендации по улучшению ROI, CAC',
        'Оптимизация и перераспределение бюджета',
        'Предложения и рекомендации в долгосрочном планировании',
        'Бета-доступ к новым фичам'
      ],
      price: '19900'
    }
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>Цены</h1>

      <div className='relative'>
        <div className='text-center gap-5 flex overflow-x-auto'>
          {data.map(({title, list, price}) => (
            <div className='box flex flex-col'>
              <h2>{title}</h2>
              <div className='my-5'>
                {list.map((item, i) => (
                  <div className='text-start'>
                    {i + 1}. {item}
                  </div>
                ))}
              </div>
              <h3 className='mt-auto mb-5 text-xl font-bold text-[#4880ff]'>{price} RUB</h3>
              <Btn primary>Приобрести</Btn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
