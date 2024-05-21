import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import bannerImage from '../../../public/image/banner.webp';
import radial1 from '../../../public/image/radial1.svg';
import radial2 from '../../../public/image/radial2.svg';

import s from './Banner.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import Image from 'next/image';
import Loading from '@/app/loading';

export const Banner = () => {
  return (
    <div className={s.container}>
      <Image src={radial1} alt='' className={s.radial1} />
      <Image src={radial2} alt='' className={s.radial2} />
      <div className={`${s.wrapper} container`}>
        <div className={s.content}>
          <h1 className={s.title}>Прогнозируйте и анализируйте свою маркетинговую кампанию </h1>
          <h2>с помощью ИИ</h2>
          <span className={s.description}>
            <span className={s.label}>Marketing Helper </span> - это ваш надежный партнёр в мире маркетинга,
            предоставляющий самые современные инструменты анализа и прогнозирования с помощью искусственного интеллекта.
            Мы поможем вам принимать обоснованные решения и достигать выдающихся результатов.
          </span>
          <div className={s.buttons}>
            <Btn>Попробовать</Btn>
            <Btn primary>Подробнее</Btn>
          </div>
        </div>
        <PreloaderImage
          preloader={<Loading />}
          priority
          src={bannerImage}
          width={500}
          height={500}
          alt=''
          quality={100}
          className={s.image}
        />
      </div>
    </div>
  );
};
