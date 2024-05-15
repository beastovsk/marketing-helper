import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import s from './Reviews.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import reviewImage from '../../../public/image/review.jpg';

export const Reviews = () => {
  const data = [
    {
      name: 'Артём Наршинов',
      company: 'Marketing Helper',
      message:
        'Пока мы ждем ваши первые отзывы, хочу рассказать пару слов как лично мне помогло это приложение. Как человеку, познающему бизнес - для меня были неизвестны никакие метрики и стратегии. Тогда я разработал этот сервис-помощник, который помог мне определиться в нише и дал мне предварительный анализ развития, что стало моим основным путеводителем в сфере предпринимательства. В основе своей, благодаря этому приложению - вы находитесь на этой странице.',
      image: reviewImage
    }
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>Отзывы наших клиентов</h1>

      <div className='relative'>
        <div className='text-center gap-5 z-10 flex flex-col'>
          {data.map(({name, company, message, image}) => (
            <div className='box flex flex-col-reverse items-center'>
              <PreloaderImage
                src={image}
                alt=''
                width={300}
                height={300}
                quality={100}
                objectFit='cover'
                className='rounded-full w-[200px] h-[200px]'
              />
              <span className='flex items-center gap-3 my-5 '>
                <h3>{name}</h3>
                <p className='text-[#4880ff]'>({company})</p>
              </span>
              <p className='text-[#11111170] w-3/4'>"{message}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
