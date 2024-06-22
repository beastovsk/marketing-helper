'use client';

import {useEffect, useState} from 'react';
import {DatePicker, Button, Table, message} from 'antd';
import {useStore} from '../store';
import {useQueryClient, useQuery} from 'react-query';
import {getPartnerStatistic} from '@/src/api';
import Btn from '@/components/UI/Btn/Btn';
import dayjs from 'dayjs';

const {RangePicker} = DatePicker;

export const Main = () => {
  const {partnerStatistic, statisticDate, setPartnerStatistic, setStatisticDate} = useStore();
  const queryClient = useQueryClient();
  const [dates, setDates] = useState([null, null]);

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

  useEffect(() => {
    if (data) {
      setPartnerStatistic(data);
    }
  }, [data, setPartnerStatistic]);

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleApply = () => {
    if (dates[0] && dates[1]) {
      setStatisticDate(dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD'));
      refetch();
    } else {
      message.error('Please select a date range');
    }
  };

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(partnerStatistic?.promo);
    message.success('Promo code copied to clipboard');
  };

  const columns = [
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

  console.log(partnerStatistic?.operations);

  return (
    <div>
      <div className='box mb-5'>
        <h3>Баланс</h3>
        <p className='text-xl mb-3'>{partnerStatistic?.income} RUB</p>
        <Btn>Вывести</Btn>
      </div>

      <div className='box mb-5'>
        <h3>Роль</h3>
        <p className='text-xl mt-3'>{partnerStatistic?.role === 'partner' ? 'Партнер' : 'Куратор'}</p>
      </div>

      <div className='box mb-5'>
        <h3>Промокод</h3>
        <p className='text-xl flex gap-5 mt-3'>
          {partnerStatistic?.promo} <Button onClick={handleCopyPromo}>Копировать</Button>
        </p>
      </div>

      <div className='flex justify-between items-center mt-10 md:flex-col md:items-start md:mb-5'>
        {/* <div className='flex items-center mb-5 gap-3'>
          <div>
            <RangePicker onChange={handleDateChange} />
          </div>
          <Button onClick={handleApply}>Применить</Button>
        </div> */}
        <div className='mb-5'>
          Статистика за {statisticDate.startDate} - {statisticDate.endDate}
        </div>
      </div>

      <div className='box mb-5'>
        <h3>Количество рефералов</h3>
        <p className='text-xl mt-3'>{partnerStatistic?.refsCounter}</p>
      </div>

      <div className='box'>
        <h3 className='mb-3'>История операций</h3>
        <Table
          columns={columns}
          dataSource={partnerStatistic?.operations
            .map((item) => JSON.parse(item))
            .map((item) => ({...item, date: dayjs(item.date).format('DD-MM-YYYY HH:MM')}))}
          rowKey='date'
        />
      </div>
    </div>
  );
};

export default Main;
