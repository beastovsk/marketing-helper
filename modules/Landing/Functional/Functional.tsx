import s from './Functional.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import image from '../../../public/image/Saly-16.svg';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';

export const Functional = () => {
  const data = [
    {
      title: 'Прогнозирование продаж',
      description: 'Получите точные прогнозы продаж на основе текущих и исторических данных.'
    },
    {
      title: 'Оптимизация рекламных кампаний',
      description:
        'Определите наиболее эффективные каналы и стратегии продвижения для увеличения рентабельности инвестиций (ROI).'
    },
    {
      title: 'Мониторинг в реальном времени',
      description:
        'Следите за эффективностью ваших маркетинговых кампаний в режиме реального времени и вносите коррективы на лету.'
    }
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>Наши функции</h1>

      <div className='flex justify-between md:flex-col-reverse'>
        <PreloaderImage src={image} alt='' width={500} height={500} />
        <div className='flex-grow-[0.5] flex flex-col md:gap-5 justify-between'>
          {data.map(({title, description}, i) => (
            <div className='box' key={i}>
              <h2>
                {i + 1}. {title}
              </h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
