'use client';
import {DatePicker, Form, Input, Modal, Select, Table, type TableProps} from 'antd';
import {useStore} from '../store';
import dayjs from 'dayjs';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation} from 'react-query';
import {removeClient, updateClient} from '@/src/api';
import {useState} from 'react';
import Btn from '@/components/UI/Btn/Btn';
import {customNotification} from '@/src/helpers/customNotification';

export const Clients = () => {
  const {statistic, setStatistic} = useStore();
  const {mutate} = useMutation(updateClient);
  const {mutate: remove} = useMutation(removeClient);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    const parsedDate = dayjs(value.subscriptionExpiresAt, 'DD-MM-YYYY');
    const subscriptionExpiresAt = parsedDate.toISOString();

    mutate(
      {...value, subscriptionExpiresAt},
      {
        onSuccess: (data) => {
          if (data?.message) {
            customNotification('success', 'top', 'Успешно', data?.message);
            setOpen(false);
            form.resetFields();
            setStatistic({...statistic, users: data.users});
          }
        }
      }
    );
  };

  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'План подписки',
      dataIndex: 'subscriptionPlan',
      key: 'subscriptionPlan'
    },
    {
      title: 'Подписка до',
      dataIndex: 'subscriptionExpiresAt',
      key: 'subscriptionExpiresAt'
    },
    {
      title: 'Действия',
      dataIndex: '',
      key: 'x',
      render: (e) => (
        <div className='flex gap-3'>
          <EditOutlined
            className='cursor-pointer text-primary-500 hover:opacity-70 transition-opacity'
            onClick={() => {
              setOpen(true);
              form.setFieldsValue(e);
            }}
          />
          <DeleteOutlined
            className='cursor-pointer text-primary-500 hover:opacity-70 transition-opacity'
            onClick={() => {
              remove(
                {id: e.id},
                {
                  onSuccess: (data) => {
                    if (data?.message) {
                      customNotification('success', 'top', 'Успешно', data?.message);
                      setStatistic({...statistic, users: data.users});
                    }
                  }
                }
              );
            }}
          />
        </div>
      )
    }
  ];

  return (
    <div>
      <h2 className='text-xl font-bold mb-5'>Пользователи</h2>
      <Table
        className='overflow-x-auto'
        columns={columns}
        dataSource={statistic.users.map((item) => ({
          ...item,
          ...item.campaign,
          subscriptionExpiresAt: item.subscriptionExpiresAt
            ? dayjs(item.subscriptionExpiresAt).format('DD-MM-YYYY')
            : null
        }))}
      />

      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='ID' name='id'>
            <Input disabled />
          </Form.Item>
          <Form.Item label='Почта' name='email'>
            <Input />
          </Form.Item>
          <Form.Item label='План подписки' name='subscriptionPlan'>
            <Select
              options={[
                {label: 'Нет подписки', value: null},
                {label: 'Демо (убран)', value: 'demo'},
                {label: 'Базовый', value: 'basic'},
                {label: 'Продвинутый', value: 'advanced'}
              ]}
            />
          </Form.Item>
          <Form.Item label='Подписка до' name='subscriptionExpiresAt'>
            <Input />
          </Form.Item>

          <Btn htmlTypeButton='submit'>Сохранить</Btn>
        </Form>
      </Modal>
    </div>
  );
};
