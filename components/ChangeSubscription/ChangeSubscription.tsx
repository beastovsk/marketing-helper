'use client';

import Btn from '@/components/UI/Btn/Btn';
import {Form, Modal, Radio, Select, Space} from 'antd';
import {useMutation} from 'react-query';
import {customNotification} from '@/src/helpers/customNotification';

import s from './ChangeSubscription.module.scss';

import {useStore} from '@/src/store';
import {ChangeCampaign, UpdateSubscription} from '@/src/api';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

export const ChangeSubscriptionModal = () => {
  const router = useRouter();
  const {subscriptionInfo} = useStore();
  const {mutate, isLoading} = useMutation(UpdateSubscription);
  const backUrl = subscriptionInfo?.subscriptionPlan === null ? '/campaign' : '/dashboard/settings';

  const onFinish = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        const {result} = data;
        localStorage.setItem('plan', value.subscriptionPlan);
        localStorage.setItem('uuid', result.uuid);

        customNotification('info', 'top', 'Перенаправляем на оплату');

        setTimeout(() => {
          router.push(result.link);
        }, 2000);
      }
    });
  };

  const options = [
    {title: 'Базовый', value: 'basic', price: 2100, description: 'Получить статистику, рекомендации и детальный анализ'},
    {
      title: 'Продвинутый',
      value: 'advanced',
      price: 3000,
      description: 'Статистика и личный ассистент'
    }
  ];

  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      initialValues={{subscriptionPlan: subscriptionInfo?.subscriptionPlan || 'basic'}}
      requiredMark={false}
    >
      <Form.Item label='Выберите желаемый план' name='subscriptionPlan'>
        <Radio.Group>
          <Space direction='vertical'>
            {options.map(({description, price, title, value}) => (
              <Radio value={value} className='w-full mb-3'>
                <div className='w-full ml-2'>
                  <div className='flex gap-2 items-center'>
                    <h2 className='text-xl'>{title}</h2>
                    <p className='text-lg text-primary-500'>({price} RUB)</p>
                  </div>
                  <div>{description}</div>
                </div>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
      <Space>
        <Link href={backUrl}>
          <Btn primary className='mt-2 flex justify-center m-auto'>
            Вернуться назад
          </Btn>
        </Link>
        <Btn className='mt-2 flex justify-center m-auto' htmlTypeButton='submit' loading={isLoading}>
          Далее
        </Btn>
      </Space>
    </Form>
  );
};
