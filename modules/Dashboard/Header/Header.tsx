'use client';

import React, {FC, useEffect, useState} from 'react';
import s from './Header.module.scss';
interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!localStorage) return;

    setEmail(localStorage.getItem('email'));
  }, []);

  return (
    <div className={s.header}>
      <div>{email}</div>
      <div className='w-[50px] h-[50px] bg-primary-500 rounded-full text-white flex items-center justify-center text-xl'>
        {email ? email[0].toUpperCase() : ''}
      </div>
    </div>
  );
};
