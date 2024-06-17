'use client';

import Btn from '@/components/UI/Btn/Btn';
import {customNotification} from '@/src/helpers/customNotification';
import {Form, Input, Tooltip} from 'antd';
import {getCookie, setCookie} from 'cookies-next';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {FC, useEffect} from 'react';
import {useMutation} from 'react-query';
import s from './Auth.module.scss';

import {animated, useInView} from '@react-spring/web';
import {LoginRequest} from '@/src/api';
import {Logo} from '@/components/UI/Logo/Logo';

interface AuthProps {}

export const Auth: FC<AuthProps> = () => {
  const [ref, springs] = useInView(
    () => ({
      from: {opacity: 0.7, scale: 0.95},
      to: {opacity: 1, scale: 1}
    }),
    {rootMargin: '-20% 0%'}
  );

  const router = useRouter();

  const onFinish = async (value) => {
    const {email, password} = value;
    if (email === 'beastovsk' && password === '2311') {
      localStorage.setItem('adminToken', 'adminToken');
      router.push('/admin/dashboard');
    }
  };

  useEffect(() => {
    const hasToken = !!getCookie('adminToken');

    if (hasToken) {
      router.push('/admin/dashboard');
    }
  }, []);

  return (
    <animated.div ref={ref} style={springs} className={s.container}>
      <h1 className='text-5xl font-semibold'>
        <Tooltip title='Перейти на главную страницу'>
          <Logo />
          admin
        </Tooltip>
      </h1>

      <h2 className='text-3xl font-medium mt-20'>Авторизация</h2>

      <Form className='my-10' onFinish={onFinish}>
        <Form.Item name='email' rules={[{required: true, message: 'Введите почту пользователя'}]}>
          <Input size='large' placeholder='Почта пользователя' />
        </Form.Item>
        <Form.Item name='password' rules={[{required: true, min: 4, message: 'Введите ваш пароль'}]}>
          <Input.Password size='large' placeholder='Пароль' />
        </Form.Item>
      </Form>
    </animated.div>
  );
};
