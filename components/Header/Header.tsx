'use client';

import {MenuOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';
import {getCookie} from 'cookies-next';
import Link from 'next/link';
import React, {FC, useState} from 'react';
import Btn from '../UI/Btn/Btn';
import {Logo} from '../UI/Logo/Logo';
import s from './Header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState(false);
  const hasToken = !!getCookie('token');

  const content = (
    <div className='flex gap-5 md:flex-col'>
      {hasToken ? (
        <Link href='/dashboard'>
          <Btn className='md:w-full'>Перейти в панель</Btn>
        </Link>
      ) : null}
      <Btn primary>Поддержка</Btn>
    </div>
  );
  return (
    <div className={s.header}>
      <div className='w-[200px]'>
        <Logo />
      </div>

      <div className='hidden md:flex' onClick={() => setOpen(true)}>
        <MenuOutlined className='text-xl opacity-80' />
      </div>
      <div className='md:hidden'>{content}</div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        {content}
      </Drawer>
    </div>
  );
};
