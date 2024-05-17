'use client';

import Btn from '@/components/UI/Btn/Btn';
import {Form, Input, Modal} from 'antd';
import {useMutation} from 'react-query';
import {customNotification} from '@/src/helpers/customNotification';
import {useStore} from '@/src/store';
import {ChangeEmail} from '@/src/api';
import {setCookie} from 'cookies-next';

export const ChangeEmailModal = () => {
  const {openChangeEmail, setOpenChangeEmail} = useStore();
  const {mutate: confirm, isLoading: isConfirmLoading} = useMutation(ChangeEmail);

  const onChangeFinish = (value) => {
    confirm(value, {
      onSuccess: (data) => {
        if (!data?.message) return;
        if (data?.message === 'Почта успешно изменена') {
          setOpenChangeEmail(false);
          setCookie('token', data?.token);
        }
        customNotification('info', 'top', 'Информация', data?.message);
      }
    });
  };

  return (
    <Modal open={openChangeEmail} onCancel={() => setOpenChangeEmail(false)} footer={false}>
      <Form layout='vertical' onFinish={onChangeFinish}>
        <Form.Item className='mt-5' label='Текущая почта' name='currentEmail'>
          <Input />
        </Form.Item>
        <Form.Item className='mt-5' label='Новая почта' name='newEmail'>
          <Input />
        </Form.Item>
        <Form.Item className='mt-5' label='Ваш пароль' name='password'>
          <Input />
        </Form.Item>

        <Btn className='mt-2 flex justify-center m-auto' htmlTypeButton='submit' loading={isConfirmLoading}>
          Отправить
        </Btn>
      </Form>
    </Modal>
  );
};
