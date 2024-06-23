'use client';
import {DatePicker, Form, Input, Modal, Select, Table, type TableProps} from 'antd';
import {useStore} from '../store';
import dayjs from 'dayjs';
import {DeleteOutlined, EditOutlined, SignatureOutlined} from '@ant-design/icons';
import {useMutation} from 'react-query';
import {createPartner, editPartner, removePartner} from '@/src/api';
import {useState} from 'react';
import Btn from '@/components/UI/Btn/Btn';
import {customNotification} from '@/src/helpers/customNotification';

export const Partners = () => {
  const {statistic, setStatistic} = useStore();
  const {mutate: editMutate} = useMutation(editPartner);
  const {mutate: remove} = useMutation(removePartner);
  const {mutate: create} = useMutation(createPartner);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    const mutateFunction = value.id ? editMutate : create;
    mutateFunction(
      {...value},
      {
        onSuccess: (data) => {
          if (data?.message) {
            customNotification('success', 'top', 'Успешно', data?.message);
          }
          setOpen(false);
          form.resetFields();
          setStatistic({...statistic, partners: data.partners});
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
      title: 'Логин',
      dataIndex: 'login',
      key: 'login'
    },
    {
      title: 'Доход',
      dataIndex: 'income',
      key: 'income'
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Промокод',
      dataIndex: 'promo',
      key: 'promo'
    },
    {
      title: 'Количество рефералов',
      dataIndex: 'refsCounter',
      key: 'refsCounter'
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
                      setStatistic({...statistic, partners: data.partners});
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
      <div className='flex justify-between items-center mb-5'>
        <h2 className='text-xl font-bold mb-5'>Партнеры</h2>
        <Btn onClick={() => setOpen(true)}>Добавить</Btn>
      </div>
      <Table
        className='overflow-x-auto'
        columns={columns}
        dataSource={statistic.partners.map((item) => ({
          ...item,
          key: item.id
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
          <Form.Item label='Логин' name='login'>
            <Input />
          </Form.Item>
          <Form.Item label='Пароль' name='password'>
            <Input />
          </Form.Item>
          <Form.Item label='Доходы' name='income'>
            <Input />
          </Form.Item>
          <Form.Item label='Операции' name='operations'>
            <Input />
          </Form.Item>
          <Form.Item label='Промокод' name='promo'>
            <Input
              addonAfter={
                <SignatureOutlined onClick={() => form.setFieldValue('promo', crypto.randomUUID().slice(0, 6))} />
              }
            />
          </Form.Item>
          <Form.Item label='Роль' name='role'>
            <Select
              options={[
                {label: 'Партнер', value: 'partner'},
                {label: 'Куратор', value: 'curator'}
              ]}
            />
          </Form.Item>
          <Form.Item label='Количество рефералов' name='refsCounter'>
            <Input />
          </Form.Item>

          <Btn htmlTypeButton='submit'>Сохранить</Btn>
        </Form>
      </Modal>
    </div>
  );
};
