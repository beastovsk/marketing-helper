'use client';

import React, {useEffect, useState} from 'react';
import s from './Header.module.scss';
import {Modal} from 'antd';
import OTP from 'antd/es/input/OTP';
import {customNotification} from '@/src/helpers/customNotification';
import {useStore} from '../store';

export const Header = () => {
  const {openAdminConfirm, setOpenAdminConfirm} = useStore();
  const [otp, setOtp] = useState('');

  const handleOk = () => {
    if (otp !== '2311') return;
    sessionStorage.setItem('otp', otp);
    setOpenAdminConfirm(false);
    customNotification('success', 'top', 'Успешно');
  };

  useEffect(() => {
    if (sessionStorage.getItem('otp')) return;

    setOpenAdminConfirm(true);
  }, []);

  return (
    <div className={s.header}>
      <div>Admin Panel</div>
      <div className='w-[50px] h-[50px] bg-primary-500 rounded-full text-white flex items-center justify-center text-xl'>
        A
      </div>

      <Modal open={openAdminConfirm} onOk={handleOk} closable={false} cancelButtonProps={{hidden: true}}>
        <div className='flex justify-center mt-5'>
          <OTP value={otp} onChange={(e) => setOtp(e)} length={4} />
        </div>
      </Modal>
    </div>
  );
};
