'use client';

import {useEffect, useState} from 'react';
import {Tabs, Table, message, Modal, Input, Form, Select, Button} from 'antd';
import {useStore} from '../store';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import {getPartnerStatistic, createWithdrawal, getWithdrawalsById} from '@/src/api';
import Btn from '@/components/UI/Btn/Btn';
import dayjs from 'dayjs';
import {customNotification} from '@/src/helpers/customNotification';

const {TabPane} = Tabs;

export const Main = () => {
  const {partnerStatistic, statisticDate, setPartnerStatistic} = useStore();
  const queryClient = useQueryClient();
  const [dates, setDates] = useState([null, null]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const {data, refetch} = useQuery(
    ['partnerStatistic', statisticDate],
    () =>
      getPartnerStatistic({
        startDate: statisticDate.startDate,
        endDate: statisticDate.endDate
      }),
    {
      onSuccess: (data) => {
        setPartnerStatistic(data);
      }
    }
  );

  const {mutate: createWithdrawalRequest} = useMutation(createWithdrawal, {
    onSuccess: (data) => {
      if (data?.message) {
        customNotification('info', 'top', 'Уведомление', data?.message);
      }
      setIsModalVisible(false);
      form.resetFields();
      queryClient.invalidateQueries('partnerStatistic');
    },
    onError: (error) => {
      message.error('Ошибка при запросе на вывод средств');
    }
  });

  const {data: withdrawals} = useQuery(
    ['withdrawals', partnerStatistic?.id],
    () => getWithdrawalsById(partnerStatistic?.id),
    {
      enabled: !!partnerStatistic?.id,
      onError: (error) => {
        message.error('Ошибка при получении истории выводов');
      }
    }
  );

  useEffect(() => {
    if (data) {
      setPartnerStatistic(data);
    }
  }, [data, setPartnerStatistic]);

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(partnerStatistic?.promo);
    customNotification('info', 'top', 'Промокод скопирован');
  };

  const handleWithdraw = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const {requisite, amount, method, telegram} = values;

      if (Number(amount) > Number(partnerStatistic?.income)) {
        customNotification('error', 'top', 'Нет таких средств на балансе');
        return;
      }
      createWithdrawalRequest({requisite, amount, method, telegram, partnerId: partnerStatistic?.id});
    });
  };

  const operationsColumns = [
    {
      title: 'Название',
      dataIndex: 'label',
      key: 'label'
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date'
    }
  ];

  const withdrawalsColumns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (text) => dayjs(text).format('DD-MM-YYYY')
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
          open: 'Открыт',
          pending: 'В работе',
          success: 'Успешно',
          cancel: 'Ошибка'
        };
        return statusMap[text] || text;
      }
    },
    {
      title: 'Telegram',
      dataIndex: 'telegram',
      key: 'telegram'
    }
  ];

  return (
    <div>
      <div className='box mb-5'>
        <h3>Баланс</h3>
        <p className='text-xl mb-3'>{partnerStatistic?.income} RUB</p>
        <Btn onClick={handleWithdraw}>Вывести</Btn>
      </div>

      <div className='box mb-5'>
        <h3>Роль</h3>
        <p className='text-xl mt-3'>{partnerStatistic?.role === 'partner' ? 'Партнер' : ''}</p>
      </div>

      <div className='box mb-5'>
        <h3>Промокод</h3>
        <p className='text-xl flex gap-5 mt-3'>
          {partnerStatistic?.promo} <Button onClick={handleCopyPromo}>Копировать</Button>
        </p>
      </div>

      <div className='flex justify-between items-center mt-10 md:flex-col md:items-start md:mb-5'>
        <div className='mb-5'>
          Статистика за {statisticDate.startDate} - {statisticDate.endDate}
        </div>
      </div>
      {/* 
      <div className='box mb-5'>
        <h3>Количество рефералов</h3>
        <p className='text-xl mt-3'>{partnerStatistic?.refsCounter}</p>
      </div> */}

      <div className='box'>
        <h3 className='mb-3'>История операций</h3>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Операции' key='1'>
            <Table
              columns={operationsColumns}
              dataSource={
                partnerStatistic?.operations.length
                  ? partnerStatistic?.operations
                      .map((item) => JSON.parse(item))
                      .map((item) => ({...item, date: dayjs(item.date).format('DD-MM-YYYY')}))
                  : []
              }
              rowKey='date'
            />
          </TabPane>
          <TabPane tab='История выводов' key='2'>
            <Table
              columns={withdrawalsColumns}
              dataSource={withdrawals?.result.length ? withdrawals.result : []}
              rowKey='id'
            />
          </TabPane>
        </Tabs>
      </div>

      <Modal title='Вывести средства' open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form form={form} layout='vertical' onFinish={handleOk}>
          <Form.Item
            name='method'
            label='Метод оплаты'
            rules={[{required: true, message: 'Пожалуйста, введите метод оплаты'}]}
          >
            <Select
              options={[
                {label: 'Банковская карта', value: 'Банковская карта'},
                {label: 'СБП', value: 'СБП'}
              ]}
            />
          </Form.Item>
          <Form.Item
            name='requisite'
            label='Реквизиты'
            rules={[{required: true, message: 'Пожалуйста, введите реквизиты для вывода'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='amount'
            label='Сумма вывода'
            rules={[{required: true, message: 'Пожалуйста, введите сумму'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='telegram'
            label='Ваш телеграмм'
            rules={[{required: true, message: 'Пожалуйста, введите телеграмм'}]}
          >
            <Input />
          </Form.Item>

          <Btn htmlTypeButton='submit'>Отправить</Btn>
        </Form>
        <div className='text-sm text-gray-400 mt-5'>
          <p>
            Вывод происходит по заявке. <br /> После создания заявки - она появится у вас в личном кабинете. <br />{' '}
            Статус будет редактироваться в зависимости от этапа транзакции
          </p>
          <p>
            <span className='text-primary-500'>Мы</span> постараемся обработать заявку как можно быстрее
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Main;
