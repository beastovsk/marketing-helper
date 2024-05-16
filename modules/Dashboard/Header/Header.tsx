'use client';

import React, {FC, useState} from 'react';
import s from './Header.module.scss';
import {useQuery} from 'react-query';
import {GetUser} from '@/src/api';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const {data, isLoading, isSuccess} = useQuery('data', () => GetUser());

  return (
    <div className={s.header}>
      <div>{isSuccess ? data?.user.email : ''}</div>
      <div className='w-[50px] h-[50px] bg-primary-500 rounded-full text-white flex items-center justify-center text-xl'>
        {isSuccess ? data?.user.email?.at(-1).toUpperCase() : ''}
      </div>
    </div>
  );
};
