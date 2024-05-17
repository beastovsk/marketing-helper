'use client';

import {useStore} from '@/src/store';
import s from './Settings.module.scss';
import {EditButton} from '@/components/UI/EditButton/EditButton';
import {ChangeEmailModal} from '@/components/ChangeEmail/ChangeEmail';
import {ResetPasswordModal} from '@/components/ResetPassword/ResetPassword';

export const Settings = () => {
  const {setOpenChangeEmail, setOpenResetPassword} = useStore();

  return (
    <div>
      <h1 className={s.title}>Настройки</h1>

      <div className='box mt-5'>
        <h3 className={s.subtitle}>
          Данные кампании <EditButton />
        </h3>
        <div className='flex flex-col text-sm p-3 border-b'>
          <span>Ниша: Название</span>
          <span>Товар: Название</span>
          <span>Дача начала кампании: Название</span>
          <span>Дата завершения кампании: Название</span>
          <span>Канал: Название</span>
          <span>Просмотры: Название</span>
          <span>Конверсия: Название</span>
          <span>Расходы: Название</span>
          <span>Доходы: Название</span>
        </div>
        <h3 className={s.subtitle}>
          Изменить почту <EditButton onClick={() => setOpenChangeEmail(true)} />
        </h3>
        <h3 className={s.subtitle}>
          Изменить пароль <EditButton onClick={() => setOpenResetPassword(true)} />
        </h3>
        <h3 className={s.subtitle}>Подписка: Базовая</h3>
      </div>

      <ChangeEmailModal />
      <ResetPasswordModal />
    </div>
  );
};
