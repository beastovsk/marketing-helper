'use client';

import {MenuOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';
import Link from 'next/link';
import React, {FC, useState} from 'react';
import Btn from '../UI/Btn/Btn';
import {Logo} from '../UI/Logo/Logo';
import s from './Header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState(false);

  const content = (
    <div className={s.content}>
      <Btn primary>Поддержка</Btn>
    </div>
  );
  return (
    <div className={s.header}>
      <div className='w-[200px]'>
        <Logo />
      </div>
      <div className='w-1/3 flex flex-col items-center'>
        <span className='text-lg font-bold'>Сервис в разработке</span>
        <span className='text-center'>
          Если вы увидели в поисковой системе этот сайт, опишитесь пожалуйста в{' '}
          <Link href='https://t.me/beastovsk' className='text-primary-500 hover:opacity-70'>
            телеграм
          </Link>{' '}
          и мы дадим вам скидку при запуске
        </span>
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
