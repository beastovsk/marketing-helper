import s from './AboutUs.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import image from '../../../public/image/Saly-14.svg';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import {animated, useInView} from '@react-spring/web';

export const AboutUs = () => {
  const data = [
    {
      title: 'Мощный AI-анализ',
      description:
        'Наши алгоритмы машинного обучения и искусственного интеллекта обеспечивают точный анализ данных, помогая вам понять поведение клиентов и рыночные тенденции.'
    },
    {
      title: 'Прогнозирование с высокой точностью',
      description:
        'Используя передовые методы прогнозирования, мы помогаем предсказывать успех ваших маркетинговых кампаний, что позволяет оптимизировать ресурсы и максимизировать рентабельность.'
    },
    {
      title: 'Интуитивный интерфейс',
      description:
        'Наша платформа разработана для удобства пользователей, предоставляя все необходимые инструменты в одном месте с простым и понятным интерфейсом.'
    }
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>Почему выбирают нас?</h1>

      <div className='flex justify-between md:flex-col'>
        <div className='flex-grow-[0.5] md:gap-5 flex flex-col justify-between'>
          {data.map(({title, description}, i) => (
            <div className='box'>
              <h2>
                {i + 1}. {title}
              </h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <PreloaderImage src={image} alt='' width={300} height={300} className='md:m-auto' />
      </div>
    </div>
  );
};
