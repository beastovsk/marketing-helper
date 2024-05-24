'use client';

import React, {FC, useEffect, useState} from 'react';
import s from './Header.module.scss';
import Link from 'next/link';
import {deleteCookie} from 'cookies-next';
import {LogoutOutlined} from '@ant-design/icons';
import {useStore} from '@/src/store';
interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const [email, setEmail] = useState('');
  const {setCampaign, setSubscriptionInfo} = useStore();

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
      <Link
        href={'/auth'}
        className='hover:text-primary-500 p-5 flex items-center gap-3 transition-[all] text-start text-[#6C7AA0]'
        onClick={() => {
          deleteCookie('token');
          deleteCookie('refreshToken');
          deleteCookie('username');
          setCampaign(null);
          setSubscriptionInfo(null);
        }}
      >
        <LogoutOutlined className='text-2xl cursor-pointer' color='#111' />
        <p className='flex  md:hidden'>Выход</p>
      </Link>
    </div>
  );
};
