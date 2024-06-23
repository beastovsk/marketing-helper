'use client';
import {Form, Input, Modal, Select, Table, type TableProps} from 'antd';
import {useState} from 'react';
import dayjs from 'dayjs';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {editWithdrawal, deleteWithdrawal, getAllWithdrawals} from '@/src/api';
import Btn from '@/components/UI/Btn/Btn';
import {customNotification} from '@/src/helpers/customNotification';

export const Withdrawals = () => {
  const queryClient = useQueryClient();
  const {data: withdrawalsData, isLoading} = useQuery('withdrawals', getAllWithdrawals);
  const {mutate: updateWithdrawal} = useMutation(editWithdrawal);
  const {mutate: removeWithdrawal} = useMutation(deleteWithdrawal);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const handleUpdate = (value) => {
    console.log({...selectedWithdrawal, ...value});
    updateWithdrawal(
      {...selectedWithdrawal, ...value},
      {
        onSuccess: (data) => {
          if (data?.message) {
            customNotification('success', 'top', 'Успешно', data?.message);
            setOpen(false);
            form.resetFields();
            queryClient.invalidateQueries('withdrawals');
          }
        }
      }
    );
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `${text} RUB`
    },
    {
      title: 'Метод',
      dataIndex: 'method',
      key: 'method'
    },
    {
      title: 'Реквизиты',
      dataIndex: 'requisite',
      key: 'requisite'
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const statusMap = {
          open: 'Создан',
          pending: 'В процессе',
          success: 'Готово',
          cancel: 'Отменено'
        };
        return statusMap[text] || text;
      }
    },
    {
      title: 'Telegram',
      dataIndex: 'telegram',
      key: 'telegram'
    },
    {
      title: 'Действия',
      dataIndex: '',
      key: 'actions',
      render: (record) => (
        <div className='flex gap-3'>
          <EditOutlined
            className='cursor-pointer text-primary-500 hover:opacity-70 transition-opacity'
            onClick={() => {
              setSelectedWithdrawal(record);
              setOpen(true);
              form.setFieldsValue(record);
            }}
          />
          <DeleteOutlined
            className='cursor-pointer text-primary-500 hover:opacity-70 transition-opacity'
            onClick={() => {
              removeWithdrawal(record.id, {
                onSuccess: (data) => {
                  if (data?.message) {
                    customNotification('success', 'top', 'Успешно', data?.message);
                    queryClient.invalidateQueries('withdrawals');
                  }
                }
              });
            }}
          />
        </div>
      )
    }
  ];

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h2 className='text-xl font-bold mb-5'>История выводов</h2>
      <Table
        className='overflow-x-auto'
        columns={columns}
        dataSource={withdrawalsData?.result.map((item) => ({
          ...item,
          date: item.date ? dayjs(item.date).format('DD-MM-YYYY') : 'Invalid Date'
        }))}
        rowKey='id'
      />

      <Modal
        title='Изменить заявку на вывод'
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleUpdate}>
          <Form.Item label='Реквизиты' name='requisite'>
            <Input />
          </Form.Item>
          <Form.Item label='Сумма' name='amount'>
            <Input />
          </Form.Item>
          <Form.Item label='Метод' name='method'>
            <Select
              options={[
                {label: 'Банковская карта', value: 'Банковская карта'},
                {label: 'СБП', value: 'СБП'}
              ]}
            />
          </Form.Item>
          <Form.Item label='Telegram' name='telegram'>
            <Input />
          </Form.Item>
          <Form.Item label='Статус' name='status'>
            <Select
              options={[
                {label: 'Создан', value: 'open'},
                {label: 'В процессе', value: 'pending'},
                {label: 'Готово', value: 'success'},
                {label: 'Отменено', value: 'cancel'}
              ]}
            />
          </Form.Item>

          <Btn htmlTypeButton='submit'>Сохранить</Btn>
        </Form>
      </Modal>
    </div>
  );
};

export default Withdrawals;
