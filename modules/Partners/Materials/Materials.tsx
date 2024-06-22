'use client';

import React from 'react';
import {Carousel, Collapse, Button, message} from 'antd';
import Btn from '@/components/UI/Btn/Btn';

const {Panel} = Collapse;

const Materials = () => {
  // Массив данных для изображений
  const images = [
    {
      imageUrl: 'https://example.com/path/to/your/image1.jpg',
      altText: 'Изображение 1'
    },
    {
      imageUrl: 'https://example.com/path/to/your/image2.jpg',
      altText: 'Изображение 2'
    }
    // Добавьте другие изображения по аналогии
  ];

  // Массив данных для постов
  const posts = [
    {
      title: '🎉 Новый продукт Marketing Helper - Анализ бизнеса с помощью ИИ! 🎉',
      content: `
        Мы рады представить вам Marketing Helper - единственный продукт, который анализирует ваш бизнес и предоставляет рекомендации, прогнозы и советы на основе ваших данных.

        🔍 Что вы получите с Marketing Helper:
        - Детальный анализ продукта
        - Прогнозы развития
        - Полезные рекомендации

        ☀️ Летняя акция! Используйте наш промокод и сэкономьте более 50% при покупке!

        💰 Тарифы на месяц:
        Базовый - 2100 RUB 500 RUB
        - Детальный анализ продукта
        - Прогнозы и рекомендации

        Продвинутый - 3000 RUB 1000 RUB
        - Все функции из Базового
        - AI Ассистент 24/7

        💳 Удобные способы оплаты:
        - Криптовалюта
        - Банковские карты

        🔗 Подключайтесь к Marketing Helper и начните улучшать свой бизнес уже сегодня!
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
      <Carousel className='mb-4 pb-10 bg-gray-400'>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.imageUrl} alt={image.altText} className='w-full h-auto' />
            <div className='mt-2 flex justify-center'>
              <Btn onClick={() => handleDownloadImage(image.imageUrl)}>Скачать изображение</Btn>
            </div>
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
