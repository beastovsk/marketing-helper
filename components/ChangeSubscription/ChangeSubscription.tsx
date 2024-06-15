'use client';

import Btn from '@/components/UI/Btn/Btn';
import {Form, Modal, Radio, Select, Space, Tooltip} from 'antd';
import {useMutation} from 'react-query';
import {customNotification} from '@/src/helpers/customNotification';

import s from './ChangeSubscription.module.scss';

import {useStore} from '@/src/store';
import {ChangeCampaign, UpdateSubscription} from '@/src/api';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {formatProductPrice} from '@/src/helpers/hooks';

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
        localStorage.setItem('uuid', value.payment === 'crypto' ? result.uuid : result.id);
        localStorage.setItem('paymentType', value.payment);

        customNotification('info', 'top', 'Перенаправляем на оплату');

        setTimeout(() => {
          router.push(value.payment === 'crypto' ? result.link : result.confirmation.confirmation_url);
        }, 2000);
      }
    });
  };

  const options = [
    {
      title: 'Базовый',
      value: 'basic',
      price: 2100,
      description: 'Полный доступ к платформе',
      disabled: subscriptionInfo?.subscriptionPlan === 'basic' || subscriptionInfo?.subscriptionPlan === 'advanced'
    },
    {
      title: 'Продвинутый',
      value: 'advanced',
      price: 3000,
      description: 'Полный доступ к платформе и 24/7 личный ассистент',
      disabled: subscriptionInfo?.subscriptionPlan === 'advanced'
    }
  ];

  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      initialValues={{
        subscriptionPlan: subscriptionInfo?.subscriptionPlan ?? 'advanced',
        payment: 'crypto'
      }}
      requiredMark={false}
    >
      <Form.Item className='flex px-5 md:ml-5' label='Желаемый план' name='subscriptionPlan'>
        <Radio.Group>
          <Space direction='vertical'>
            {options.map(({description, price, title, value, disabled}) => (
              <Tooltip
                title={
                  <div>
                    <p>{description}</p>
                    <span>{formatProductPrice(price)}</span>
                  </div>
                }
              >
                <Radio value={value} className='w-full' disabled={disabled}>
                  {title}
                </Radio>
              </Tooltip>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item className='flex px-5 md:ml-5' label='Способ оплаты' name='payment'>
        <Radio.Group>
          <Space direction='vertical'>
            <Tooltip title='В процессе добавления'>
              <Radio value='card' className='w-max' disabled>
                <span>Банковская карта (Visa, МИР, MasterCard), SberPay</span>
              </Radio>
            </Tooltip>
            <Radio value='crypto' className='w-full'>
              Криптовалюта (USDT, USDC, BTC)
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <div className='flex flex-col px-5 md:w-3/4 md:m-auto'>
        <Link href={backUrl} className='w-full'>
          <Btn primary className='mt-2 flex w-full justify-center m-auto'>
            Вернуться назад
          </Btn>
        </Link>
        <Btn
          className='mt-2 flex justify-center m-auto w-full'
          htmlTypeButton='submit'
          loading={isLoading}
          disabled={subscriptionInfo?.subscriptionPlan === 'advanced'}
        >
          Далее
        </Btn>
      </div>
    </Form>
  );
};
