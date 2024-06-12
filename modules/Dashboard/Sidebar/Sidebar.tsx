'use client';

import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons';
import {deleteCookie} from 'cookies-next';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {FC} from 'react';
import s from './Sidebar.module.scss';
import {Logo} from '@/components/UI/Logo/Logo';
import {useStore} from '@/src/store';

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const pathname = usePathname();
  const {setCampaign, setSubscriptionInfo, subscriptionInfo} = useStore();

  const navigationMenu = [
    {
      label: 'Главная',
      icon: <HomeOutlined className='w-full justify-center text-2xl cursor-pointer' color='#111' />,
      href: '/dashboard',
      isAvialable: true
    },
    {
      label: 'Бюджет',
      icon: <WalletOutlined className='w-full justify-center text-2xl cursor-pointer' color='#111' />,
      href: '/dashboard/budjet',
      isAvialable: true
    },
    {
      label: 'Рекомендации',
      icon: <TeamOutlined className='w-full justify-center text-2xl cursor-pointer' color='#111' />,
      href: '/dashboard/recommendations',
      isAvialable: true
    },
    {
      label: 'Ассистент',
      icon: <UserOutlined className='w-full justify-center text-2xl cursor-pointer' color='#111' />,
      href: '/dashboard/assistant',
      isAvialable: subscriptionInfo?.subscriptionPlan === 'advanced'
    },
    {
      label: 'Настройки',
      icon: <SettingOutlined className='w-full justify-center text-2xl cursor-pointer' color='#111' />,
      href: '/dashboard/settings',
      isAvialable: true
    }
  ];
  return (
    <div className={s.container}>
      <div className='flex flex-col gap-10 md:gap-2 w-full'>
        <Link href={'/'} className='w-[200px] px-4 pt-5 text-2xl lg:hidden hover:opacity-70 transition-opacity'>
          <Logo />
        </Link>

        <div className='flex flex-col lg:flex-row gap-2 items-start text-[#6C7AA0]'>
          {navigationMenu.map(
            ({label, icon, href, isAvialable}, i) =>
              isAvialable && (
                <Link
                  href={href}
                  className={`${
                    pathname.slice(0, -1) === href && 'bg-primary-500 text-white hover:hover:text-white'
                  } flex items-center gap-3 w-full hover:text-primary-500 p-5 rounded-lg transition-opacity `}
                  key={href}
                >
                  <span>{icon}</span>
                  <p className='flex lg:hidden'>{label}</p>
                </Link>
              )
          )}
        </div>
      </div>
      <Link
        href={'/auth'}
        className='hover:text-primary-500 p-5 flex items-center gap-3 transition-[all] w-full text-start text-[#6C7AA0] lg:hidden'
        onClick={() => {
          deleteCookie('token');
          deleteCookie('refreshToken');
          deleteCookie('username');
          setCampaign(null);
          setSubscriptionInfo(null);
        }}
      >
        <LogoutOutlined className='text-2xl cursor-pointer ' color='#111' />
        <p className='flex lg:hidden'>Выход</p>
      </Link>
    </div>
  );
};
