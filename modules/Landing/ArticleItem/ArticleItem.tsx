'use client';

import React from 'react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import {useQuery} from 'react-query';
import {getArticleById} from '@/src/api';
import Loading from '@/app/loading';
import {useSearchParams} from 'next/navigation';

const ArticleItem = () => {
  const [id] = useSearchParams().getAll('id')
  const {data, isLoading, isError} = useQuery(['article', id], () => getArticleById(id));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Ошибка загрузки статьи.</p>;
  }

  if (!data) return <></>;

  const {title, content, date} = data?.article;

  return (
    <div className='box'>
      <h2 className='text-xl mb-2'>{title}</h2>
      <span>{dayjs(date).format('DD/MM/YYYY')}</span>
      <p className='mt-5'>{parse(content)}</p>
    </div>
  );
};

export default ArticleItem;
