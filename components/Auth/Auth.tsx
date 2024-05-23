'use client';

import Btn from '@/components/UI/Btn/Btn';
import {customNotification} from '@/src/helpers/customNotification';
import {Form, Input, Tooltip} from 'antd';
import {setCookie} from 'cookies-next';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {FC} from 'react';
import {useMutation} from 'react-query';
import s from './Auth.module.scss';

import {animated, useInView} from '@react-spring/web';
import {Logo} from '../UI/Logo/Logo';
import {LoginRequest} from '@/src/api';
import {useStore} from '../../src/store';

interface AuthProps {}

export const Auth: FC<AuthProps> = () => {
  const {mutate, isLoading} = useMutation(LoginRequest);
  const {setOpenConfirmCode, setOpenResetPassword} = useStore();
  const [ref, springs] = useInView(
    () => ({
      from: {opacity: 0.7, scale: 0.95},
      to: {opacity: 1, scale: 1}
    }),
    {rootMargin: '-20% 0%'}
  );

  const router = useRouter();

  const onFinish = async (value) => {
    mutate(value, {
      onSuccess: (data) => {
        localStorage.setItem('email', value.email);
        if (!data?.message) return;
        if (data?.message === 'Аккаунт не подтвержден. Проверьте вашу почту для подтверждения регистрации') {
          setOpenConfirmCode(true);
        }
        if (data?.token) {
          const {hasCampaign, hasSubscription, token} = data;
          setCookie('token', token);
          if (hasCampaign && hasSubscription) return router.push('/dashboard');
          if (!hasCampaign) return router.push('/campaign');
          if (!hasSubscription) return router.push('/subscription');
        }
        customNotification('info', 'top', 'Информация', data?.message);
      }
    });
  };

  return (
    <animated.div ref={ref} style={springs} className={s.container}>
      <h1 className='text-5xl font-semibold'>
        <Tooltip title='Перейти на главную страницу'>
          <Logo />
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
        <p className='text-start text-black text-sm'>
          Нет аккаунта?{' '}
          <Link href={'/reg'} className='text-primary-500'>
            Зарегистрироваться
          </Link>
        </p>
        <p className='cursor-pointer text-start mt-3 text-white text-sm'>
          <span className='text-primary-500' onClick={() => setOpenResetPassword(true)}>
            Восстановить пароль
          </span>
        </p>
        <Btn loading={isLoading} htmlTypeButton='submit' className='mt-10'>
          Войти
        </Btn>
      </Form>
    </animated.div>
  );
};
