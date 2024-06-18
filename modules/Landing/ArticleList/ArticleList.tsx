'use client';

import React, {useState, useEffect} from 'react';
import {Empty} from 'antd';
import Btn from '@/components/UI/Btn/Btn';
import Loading from '@/app/loading';
import {useQuery} from 'react-query';
import {getAllArticles} from '@/src/api';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import Link from 'next/link';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const {data, isSuccess, isLoading} = useQuery('articles', getAllArticles);

  useEffect(() => {
    if (isSuccess) {
      setArticles(data.articles);
    }
  }, [data, isSuccess]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold mb-5'>Статьи</h2>
      </div>

      <div className='mt-10'>
        {isLoading ? (
          <Loading />
        ) : articles.length ? (
          <div className='grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3'>
            {articles.map(({id, title, content, date}) => (
              <Link key={id} href={`/articles/article?id=${id}`}>
                <div className='box'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-xl mb-2'>{title}</h2>
                  </div>
                  <span>{dayjs(date).format('DD/MM/YYYY')}</span>
                  <p className='mt-5 overflow-hidden text-gray-400 line-clamp-3'>{parse(content)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Empty description='Список пуст' />
        )}
      </div>
    </div>
  );
};

export default ArticleList;
