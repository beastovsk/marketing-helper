import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import s from './Prices.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import reviewImage from '../../../public/image/review.jpg';

export const Prices = () => {
  const data = [
    {
      title: 'Демо',
      list: ['Прогноз метрик', 'Анализ расходов и прогноз доходов', 'Прогноз первого клиента и первой покупки'],
      price: '300'
    },
    {
      title: 'Базовый',
      list: [
        'Функционал из демо',
        'Прогноз конверсии',
        'Рекомендации по улучшению ROI, CAC',
        'Оптимизация и перераспределение бюджета',
        'Предложения и рекомендации в долгосрочном планировании'
      ],
      price: '1700'
    },
    {
      title: 'Продвинутый',
      list: ['Функционал из базового тарифа', 'Личный AI ассистент', 'Бета-доступ к новым фичам'],
      price: '3000'
    }
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>Цены</h1>

      <div className='relative'>
        <div className='text-center gap-5 grid grid-cols-3 md:grid-cols-1'>
          {data.map(({title, list, price}) => (
            <div
              className={`box flex flex-col ${title === 'Базовый' ? 'border-2 border-primary-500 rounded-2xl' : ''}`}
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
              <Btn primary>Приобрести</Btn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
