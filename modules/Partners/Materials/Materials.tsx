'use client';

import React from 'react';
import {Carousel, Collapse, Button, message} from 'antd';
import Btn from '@/components/UI/Btn/Btn';

import material1 from '../../../public/image/material1.jpg';
import material2 from '../../../public/image/material2.jpg';
import material3 from '../../../public/image/material3.jpg';
import Image from 'next/image';
import {useStore} from '../store';

const {Panel} = Collapse;

const Materials = () => {
  const {partnerStatistic} = useStore();
  // Массив данных для изображений
  const images = [
    {
      imageUrl: material1,
      altText: 'Изображение 1'
    },
    {
      imageUrl: material2,
      altText: 'Изображение 2'
    },
    {
      imageUrl: material3,
      altText: 'Изображение 2'
    }
    // Добавьте другие изображения по аналогии
  ];

  // Массив данных для постов
  const posts = [
    {
      title: '1 текст',
      content: `
🎉Мы рады предложить Marketing Helper, который обеспечивает комплексный анализ вашего бизнеса и предлагает ценные рекомендации и прогнозы, основанные на ваших данных.🎉
  
🔍 Что включено в Marketing Helper:
  
Глубокий анализ продукта
Прогнозы развития
Практические рекомендации
  
💰 Цены на месяц по промокоду "${partnerStatistic?.promo}":
Базовый - 720 RUB
- Детальный анализ продукта
- Прогнозы и рекомендации
  
Продвинутый - 1175 RUB
- Все функции из Базового
- AI Ассистент 24/7
  
💳 Принимаем криптовалюту и банковские карты для удобства оплаты.
  
🔗 Подключайтесь к Marketing Helper прямо сейчас и начните улучшать свой бизнес уже сегодня!
Полный разбор YouTube (https://www.youtube.com/watch?v=8j7Ds2FldGg) | Телеграм канал с новостями (https://t.me/marketing_helper_ai)
        `
    },
    {
      title: '2 текст',
      content: `
🎉 Представляем вам Marketing Helper - новейшее решение для анализа вашего бизнеса с использованием искусственного интеллекта! 🎉

🔍 Что вы получаете с Marketing Helper:

Глубокий анализ продукта
Прогнозы развития
Практические рекомендации

💰 Цены на месяц по промокоду "${partnerStatistic?.promo}":
Базовый - 720 RUB
- Детальный анализ продукта
- Прогнозы и рекомендации

Продвинутый - 1175 RUB
- Все функции из Базового
- AI Ассистент 24/7

💳 Мы принимаем криптовалюту и банковские карты для вашего удобства.

🔗 Присоединяйтесь к Marketing Helper прямо сейчас и начните улучшать свой бизнес уже сегодня!
Полный разбор YouTube (https://www.youtube.com/watch?v=8j7Ds2FldGg) | Телеграм канал с новостями (https://t.me/marketing_helper_ai)
        `
    },
    {
      title: '3 текст',
      content: `
🎉Мы рады предложить вам Marketing Helper, который выполнит всесторонний анализ вашего бизнеса и предоставит ценные рекомендации и прогнозы на основе ваших данных.🎉

🔍 Что включено в Marketing Helper:

Глубокий анализ вашего продукта
Прогнозы для будущего развития
Практические рекомендации

💰 Цены на месяц по промокоду "${partnerStatistic?.promo}":
Базовый - 720 RUB
- Детальный анализ продукта
- Прогнозы и рекомендации

Продвинутый - 1175 RUB
- Все функции из Базового
- AI Ассистент 24/7

💳 Мы принимаем криптовалюту и банковские карты для вашего удобства.

🔗 Присоединяйтесь к Marketing Helper прямо сейчас и начните улучшать свой бизнес уже сегодня!
Полный разбор YouTube (https://www.youtube.com/watch?v=8j7Ds2FldGg) | Телеграм канал с новостями (https://t.me/marketing_helper_ai)
        `
    }
    // Добавьте другие посты по аналогии
  ];

  const handleDownloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'marketing_helper_image.jpg';
    link.click();
  };

  const handleCopyPost = (postText) => {
    navigator.clipboard.writeText(postText);
    message.success('Пост скопирован в буфер обмена');
  };

  return (
    <div className='materials-container'>
      {/* Слайдер изображений */}
      <Carousel className='mb-4 pb-10 bg-gray-300'>
        {images.map((image, index) => (
          <div key={index}>
            <Image src={image.imageUrl} alt={image.altText} className='w-full h-auto' />
          </div>
        ))}
      </Carousel>

      {/* Слайдер постов */}
      <Collapse accordion className='mb-4'>
        {posts.map((post, index) => (
          <Panel header={post.title} key={index + 1}>
            <p>{post.content}</p>
            <div className='mt-2 flex justify-center'>
              <Button type='primary' onClick={() => handleCopyPost(post.content)}>
                Копировать пост
              </Button>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Materials;
