import s from './HowItWorks.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import doodle1 from '../../../public/image/doodle-1.svg';
import doodle2 from '../../../public/image/doodle-2.svg';
import doodle3 from '../../../public/image/doodle-3.svg';
import doodle4 from '../../../public/image/doodle-4.svg';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';

export const HowItWorks = () => {
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
      <h1 className={s.title}>Как это работает?</h1>

      <div className='relative'>
        <PreloaderImage src={doodle1} alt='' width={200} quality={100} className={s.image1} />
        <PreloaderImage src={doodle2} alt='' width={200} quality={100} className={s.image2} />
        <PreloaderImage src={doodle3} alt='' width={200} quality={100} className={s.image3} />
        {/* <PreloaderImage src={doodle4} alt='' width={200} quality={100} className={s.image4} /> */}
        <div className='text-center gap-5 z-10 flex flex-col'>
          {data.map(({title, description}, i) => (
            <div className={`box w-1/2 ${i === 1 ? 'ml-auto' : ''}`}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
