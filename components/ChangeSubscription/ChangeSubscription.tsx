'use client';

import Btn from '@/components/UI/Btn/Btn';
import {Form, Input, Modal, Radio, Select, Space, Tooltip} from 'antd';
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
  const [form] = Form.useForm();
  const router = useRouter();
  const [payment, setPayment] = useState('card');
  const {subscriptionInfo} = useStore();
  const {mutate, isLoading} = useMutation(UpdateSubscription);
  const backUrl = subscriptionInfo?.subscriptionPlan === null ? '/campaign' : '/dashboard/settings';

  const onFinish = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        const {result} = data;
        localStorage.setItem('plan', value.subscriptionPlan);
        if (payment === 'crypto') {
          localStorage.setItem('uuid', result.uuid);
        } else {
          localStorage.setItem('uuid', data.id);
        }
        localStorage.setItem('paymentType', value.payment);

        customNotification('info', 'top', 'Перенаправляем на оплату');

        setTimeout(() => {
          router.push(value.payment === 'crypto' ? result.link : data.confirmation.confirmation_url);
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
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{
        subscriptionPlan: subscriptionInfo?.subscriptionPlan ?? 'advanced',
        payment
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
        <Radio.Group value={payment} onChange={(val) => setPayment(val.target.value)}>
          <Space direction='vertical'>
            <Tooltip title='В процессе тестирования (новое)'>
              <Radio value='card' className='w-max'>
                <span>Банковская карта (Visa, МИР, MasterCard), SberPay</span>
              </Radio>
            </Tooltip>
            <Radio value='crypto' className='w-full'>
              Криптовалюта (USDT, USDC, BTC)
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      {payment === 'card' ? (
        <Space direction='vertical' className='w-full px-5'>
          <Form.Item label='Ваше ФИО' name='full_name' rules={[{required: true, message: 'Введите ФИО'}]}>
            <Input placeholder='Иванов Иван Иванович' />
          </Form.Item>
          <Form.Item
            label='Ваш номер телефона (без знаков)'
            name='phone'
            rules={[{required: true, message: 'Введите номер телефона'}]}
          >
            <Input placeholder='(000) 000-00-00' prefix='+7' maxLength={10} />
          </Form.Item>
        </Space>
      ) : null}
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
