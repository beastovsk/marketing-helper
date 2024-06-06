'use client';

import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import s from './Feedback.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import reviewImage from '../../../public/image/review.jpg';
import {Form, Input} from 'antd';
import {useMutation} from 'react-query';
import {SendSupportMessage} from '@/src/api';
import {customNotification} from '@/src/helpers/customNotification';

export const Feedback = () => {
  const {mutate} = useMutation(SendSupportMessage);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Остались вопросы?</h1>
      <h2 className={s.description}>Заполните форму и мы свяжемся с вами</h2>

      <div className='box'>
        <Form
          layout='vertical'
          className='w-1/2 md:w-full m-auto text-center'
          onFinish={(value) =>
            mutate(value, {
              onSuccess: (data) => {
                if (!data?.message) return;

                customNotification('info', 'top', 'Информация', data?.message);
              }
            })
          }
        >
          <Form.Item label='Ваше имя' name='name' rules={[{required: true, message: 'Заполните поле'}]}>
            <Input size='large' placeholder='Имя' />
          </Form.Item>
          <Form.Item
            label='Ваши контакты (подпишите название)'
            name='email'
            rules={[{required: true, message: 'Заполните поле'}]}
          >
            <Input size='large' placeholder='@username (telegram)' />
          </Form.Item>
          <Form.Item label='Сообщение' name='message' rules={[{required: true, message: 'Заполните поле'}]}>
            <Input.TextArea style={{height: 120, resize: 'none'}} size='large' />
          </Form.Item>
          <Btn htmlTypeButton='submit'>Отправить</Btn>
        </Form>
      </div>
    </div>
  );
};
