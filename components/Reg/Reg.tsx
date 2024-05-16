'use client';

import Btn from '@/components/UI/Btn/Btn';
import {customNotification} from '@/src/helpers/customNotification';
import {Breadcrumb, Button, Form, Input, Modal, Space, Tooltip} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {FC} from 'react';
import {useMutation} from 'react-query';
import s from './Reg.module.scss';

import {animated, useInView} from '@react-spring/web';
import {Logo} from '../UI/Logo/Logo';
import {RegRequest} from '@/src/api';
import {useStore} from '@/src/store';

interface RegProps {}

export const Reg: FC<RegProps> = () => {
  const {mutate, isLoading} = useMutation(RegRequest);
  const {setOpenConfirmCode} = useStore();
  const [ref, springs] = useInView(
    () => ({
      from: {opacity: 0.7, scale: 0.95},
      to: {opacity: 1, scale: 1}
    }),
    {rootMargin: '-20% 0%'}
  );

  const onFinish = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        localStorage.setItem('email', value.email);

        if (!data?.message) return;
        if (
          data?.message === 'Подтвердите почту' ||
          data?.message === 'Подтверждение регистрации отправлено на вашу почту'
        ) {
          setOpenConfirmCode(true);
        }
        customNotification('info', 'top', 'Информация', data?.message);
      }
    });
  };

  return (
    <animated.div ref={ref} style={springs} className={s.container}>
      <h2 className='text-5xl font-semibold'>
        <Tooltip title='Перейти на главную страницу'>
          <Logo />
        </Tooltip>
      </h2>
      <h2 className='text-3xl font-medium mt-20'>Регистрация</h2>
      <Form className='my-10' onFinish={onFinish}>
        <Form.Item name='email' rules={[{required: true, type: 'email', message: 'Введите корректную почту'}]}>
          <Input size='large' placeholder='Email' />
        </Form.Item>
        <Form.Item name='password' rules={[{required: true, min: 4, message: 'Введите пароль более 4 символов'}]}>
          <Input.Password size='large' placeholder='Пароль' />
        </Form.Item>
        <p className='text-start text-black text-sm'>
          Есть аккаунт?{' '}
          <Link href={'/auth'} className='text-primary-500'>
            Авторизироваться
          </Link>
        </p>
        <Btn loading={isLoading} htmlTypeButton='submit' className='mt-10'>
          Создать аккаунт
        </Btn>
      </Form>
    </animated.div>
  );
};
