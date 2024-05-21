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

export const ChangeSubscriptionModal = () => {
  const navigate = useRouter();
  const {openSubscription, setOpenSubscription, subscriptionInfo} = useStore();
  const {mutate, isLoading} = useMutation(UpdateSubscription);

  const onFinish = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        const {result} = data;
        localStorage.setItem('plan', value.subscriptionPlan);
        localStorage.setItem('uuid', result.uuid);

        customNotification('info', 'top', 'Перенаправляем на оплату');

        setTimeout(() => {
          navigate.push(result.link);
        }, 2000);
      }
    });
  };

  const onCancel = () => {
    if (subscriptionInfo.subscriptionPlan === null) return;
    setOpenSubscription(false);
  };

  useEffect(() => {}, []);

  const options = [
    {title: 'Демо', value: 'demo', price: 300, description: 'Получить анализ для своей кампании'},
    {title: 'Базовый', value: 'basic', price: 1700, description: 'Получить рекомендации и детальный анализ'},
    {
      title: 'Продвинутый',
      value: 'advanced',
      price: 3000,
      description: 'Получить прогнозы, детальный анализ и личного ассистента'
    }
  ];

  return (
    <Modal open={openSubscription} onCancel={onCancel} footer={false}>
      <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={{subscriptionPlan: subscriptionInfo?.subscriptionPlan || 'basic'}}
        requiredMark={false}
      >
        <h2 className='mb-5'>Желаете получить полный набор для аналитики кампании?</h2>

        <Form.Item label='Выберите план' name='subscriptionPlan'>
          <Radio.Group>
            <Space direction='vertical'>
              {options.map(({description, price, title, value}) => (
                <Radio value={value}>
                  <div className='ml-3 p-3'>
                    <div className={s.grid}>
                      <h2 className='text-xl'>{title}</h2>
                      <p className='font-bold text-lg'>{price} RUB</p>
                    </div>
                    <div>{description}</div>
                  </div>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Btn className='mt-2 flex justify-center m-auto' htmlTypeButton='submit' loading={isLoading}>
          Далее
        </Btn>
      </Form>
    </Modal>
  );
};
