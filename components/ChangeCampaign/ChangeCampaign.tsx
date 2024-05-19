'use client';

import Btn from '@/components/UI/Btn/Btn';
import {DatePicker, Form, Input, Modal} from 'antd';
import {useMutation} from 'react-query';
import {customNotification} from '@/src/helpers/customNotification';

import {useStore} from '@/src/store';
import {ChangeCampaign} from '@/src/api';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
const {RangePicker} = DatePicker;

const dateFormat = 'YYYY/MM/DD';
export const ChangeCampaignModal = () => {
  const {openCampaign, setOpenCampaign, campaign, setCampaign} = useStore();
  const {mutate, isLoading} = useMutation(ChangeCampaign);
  const [initialValues, setInitialValues] = useState(null);
  const onFinish = (value) => {
    mutate(value, {
      onSuccess: (data) => {
        console.log(value);
        if (!data?.message) return;
        if (data?.message === 'Успешно сохранено') {
          setCampaign(value);
          setOpenCampaign(false);
        }
        customNotification('info', 'top', 'Информация', data?.message);
      }
    });
  };

  const onCancel = () => {
    if (campaign === null) return;
    
    setOpenCampaign(false);
  };

  useEffect(() => {
    if (!campaign) return;
    const [startDate, endDate] = campaign?.date;
    setInitialValues({
      ...campaign,
      date: [dayjs(startDate), dayjs(endDate)]
    });
  }, [campaign]);

  return (
    <Modal open={openCampaign} onCancel={onCancel} footer={false}>
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
        <Btn className='mt-2 flex justify-center m-auto' htmlTypeButton='submit' loading={isLoading}>
          Отправить
        </Btn>
      </Form>
    </Modal>
  );
};
