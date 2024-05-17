'use client';

import React, {FC, useEffect} from 'react';
import s from './Header.module.scss';
import {useQuery} from 'react-query';
import {GetUser} from '@/src/api';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const {data, isSuccess} = useQuery('data', () => GetUser());

  useEffect(() => {
    if (!isSuccess) return;

    localStorage.setItem('email', data?.user.email);
  }, [isSuccess, data]);

  return (
    <div className={s.header}>
      <div>{isSuccess ? data?.user.email : ''}</div>
      <div className='w-[50px] h-[50px] bg-primary-500 rounded-full text-white flex items-center justify-center text-xl'>
        {isSuccess ? data?.user.email[0].toUpperCase() : ''}
      </div>
    </div>
  );
};
