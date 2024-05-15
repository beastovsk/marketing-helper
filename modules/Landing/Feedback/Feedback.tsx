'use client';

import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import s from './Feedback.module.scss';
import Btn from '@/components/UI/Btn/Btn';
import reviewImage from '../../../public/image/review.jpg';
import {Form, Input} from 'antd';

export const Feedback = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Остались вопросы?</h1>
      <h2 className={s.description}>Заполните форму и мы свяжемся с вами</h2>

      <div className='box'>
        <Form layout='vertical' className='w-1/2 md:w-full m-auto text-center'>
          <Form.Item label='Ваше имя'>
            <Input size='large' />
          </Form.Item>
          <Form.Item label='Ваша почта'>
            <Input size='large' />
          </Form.Item>
          <Form.Item label='Сообщение'>
            <Input.TextArea style={{height: 120, resize: 'none'}} size='large' />
          </Form.Item>
          <Btn>Отправить</Btn>
        </Form>
      </div>
    </div>
  );
};
