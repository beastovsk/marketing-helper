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
      title: 'Сбор данных',
      description:
        'Вы заполняете форму о вашем продукте, которая состоит из многих доп. компонентов для детального анализа'
    },
    {
      title: 'Анализ и обработка',
      description: 'Наши алгоритмы анализируют собранные данные, выявляют ключевые тренды и паттерны.'
    },
    {
      title: 'Создание отчетов',
      description: 'Вы получаете подробные отчеты и рекомендации по улучшению ваших маркетинговых стратегий.'
    },
    {
      title: 'Прогнозирование',
      description: 'Наши модели прогнозирования помогают планировать будущие кампании и бюджет.'
    }
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>Как это работает?</h1>

      <div className='relative'>
        <PreloaderImage src={doodle1} alt='' width={200} height={200} quality={100} className={s.image1} />
        <PreloaderImage src={doodle2} alt='' width={200} height={200} quality={100} className={s.image2} />
        <PreloaderImage src={doodle3} alt='' width={200} height={200} quality={100} className={s.image3} />
        <PreloaderImage src={doodle4} alt='' width={200} height={200} quality={100} className={s.image4} />
        <div className='text-center gap-5 z-10 flex flex-col'>
          {data.map(({title, description}, i) => (
            <div className={`box w-1/2 md:w-full ${i === 1 || i === 3 ? 'ml-auto' : ''}`} key={i}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
