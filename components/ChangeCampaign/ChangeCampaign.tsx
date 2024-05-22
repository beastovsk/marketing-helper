'use client';

import Btn from '@/components/UI/Btn/Btn';
import {DatePicker, Form, Input, Modal} from 'antd';
import {useMutation} from 'react-query';
import {customNotification} from '@/src/helpers/customNotification';

import {useStore} from '@/src/store';
import {ChangeCampaign} from '@/src/api';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/app/loading';
import Link from 'next/link';
const {RangePicker} = DatePicker;

const dateFormat = 'YYYY/MM/DD';

export const ChangeCampaignModal = () => {
  const router = useRouter();
  const {campaign, setCampaign, subscriptionInfo} = useStore();
  const {mutate, isLoading, isSuccess} = useMutation(ChangeCampaign);
  const [initialValues, setInitialValues] = useState(null);
  const camebackUrl = campaign === null ? '/' : '/dashboard/settings';
  const onFinish = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        if (!data?.message) return;
        if (data?.message === 'Успешно сохранено') {
          setCampaign(value);
          const {subscriptionPlan} = subscriptionInfo;
          router.push(subscriptionPlan ? '/dashboard/settings' : '/subscription');
        }
        customNotification('info', 'top', 'Информация', data?.message);
      }
    });
  };

  useEffect(() => {
    if (campaign === null) return;

    const [startDate, endDate] = campaign.date;
    setInitialValues({
      ...campaign,
      date: [dayjs(startDate), dayjs(endDate)]
    });
  }, [campaign]);

  if (initialValues === null && campaign !== null) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className='mb-3'>Заполните форму вашей кампании</h2>
      <div>
        <Form layout='vertical' onFinish={onFinish} initialValues={initialValues} requiredMark={false}>
          <Form.Item label='Ниша' name='niche' rules={[{required: true, message: 'Выберите название ниши'}]}>
            <Input />
          </Form.Item>
          <Form.Item label='Продукт' name='product' rules={[{required: true, message: 'Выберите название продукта'}]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Дата периода кампании'
            name='date'
            rules={[{required: true, message: 'Выберите дату'}]}
            validateTrigger={['onChange', 'onBlur']}
          >
            <RangePicker format={dateFormat} />
          </Form.Item>
          <Form.Item label='Канал (необязательно)' name='channel'>
            <Input />
          </Form.Item>
          <Form.Item label='Просмотры (необязательно)' name='views'>
            <Input type='number' />
          </Form.Item>
          <Form.Item label='Конверсия (необязательно)' name='conversion'>
            <Input />
          </Form.Item>
          <Form.Item label='Расходы (необязательно)' name='expenses'>
            <Input />
          </Form.Item>
          <Form.Item label='Доходы (необязательно)' name='income'>
            <Input />
          </Form.Item>
          <Link href={camebackUrl}>
            <Btn primary className='w-full'>
              Вернуться назад
            </Btn>
          </Link>
          <Btn className='w-full mt-2' htmlTypeButton='submit' loading={isLoading}>
            Отправить
          </Btn>
        </Form>
      </div>
    </div>
  );
};
