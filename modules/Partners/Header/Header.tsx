'use client';

import React from 'react';
import s from './Header.module.scss';

export const Header = () => {
  const login = localStorage.getItem('partnerLogin');
  return (
    <div className={s.header}>
      <div>{login ?? 'Partner'}</div>
      <div className='w-[50px] h-[50px] bg-primary-500 rounded-full text-white flex items-center justify-center text-xl'>
        {login ? login[0] : 'Partner'}{' '}
      </div>
    </div>
  );
};
