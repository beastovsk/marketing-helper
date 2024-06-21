'use client';

import React from 'react';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <div className={s.header}>
      <div>login</div>
      <div className='w-[50px] h-[50px] bg-primary-500 rounded-full text-white flex items-center justify-center text-xl'>
        A
      </div>
    </div>
  );
};
