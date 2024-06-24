import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import s from './Prices.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import reviewImage from '../../../public/image/review.jpg';
import Link from 'next/link';

export const Prices = () => {
  const data = [
    {
      title: 'Базовый',
      list: [
        'Подробный анализ вашего продукта',
        'Полный портрет вашей аудитории',
        'Анализ минусов и преимуществ',
        'Оптимизация и перераспределение бюджета',
        'Предложения и рекомендации в долгосрочном планировании'
      ],
      price: '800'
    },
    {
      title: 'Продвинутый',
      list: ['Функционал из базового тарифа', 'Личный AI ассистент'],
      price: '1300'
    }
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>Цены</h1>

      <div className='relative'>
        <div className='text-center gap-5 flex justify-center md:flex-col'>
          {data.map(({title, list, price}) => (
            <div
              className={`box flex flex-col w-1/3 lg:w-full ${
                title === 'Базовый' ? 'border-2 border-primary-500 rounded-2xl' : ''
              }`}
            >
              <h2>{title}</h2>
              <div className='my-5'>
                {list.map((item, i) => (
                  <div className='text-start'>
                    {i + 1}. {item}
                  </div>
                ))}
              </div>
              <h3 className='mt-auto mb-5 text-xl font-bold text-[#4880ff]'>{price} RUB</h3>
              <Link href='/subscription'>
                <Btn primary>Приобрести</Btn>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
