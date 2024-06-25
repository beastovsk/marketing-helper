'use client';

import {useStore} from '@/src/store';
import s from './Settings.module.scss';
import {EditButton} from '@/components/UI/EditButton/EditButton';
import {ChangeEmailModal} from '@/components/ChangeEmail/ChangeEmail';
import {ResetPasswordModal} from '@/components/ResetPassword/ResetPassword';
import dayjs from 'dayjs';
import Link from 'next/link';
import {getTitleOfSubscription} from '@/src/helpers/util';

export const Settings = () => {
  const {setOpenChangeEmail, setOpenResetPassword, subscriptionInfo, campaign} = useStore();

  return (
    <div>
      <h1 className={s.title}>Настройки</h1>

      <div className='box mt-5'>
        <h3 className={s.subtitle}>
          Данные кампании{' '}
          <Link href='/campaign'>
            <EditButton />
          </Link>
        </h3>
        <div className='flex flex-col text-sm p-3 border-b'>
          <span>Название: {campaign?.name}</span>
          <span>Ниша: {campaign?.niche}</span>
          <span>Продукт: {campaign?.product}</span>
          <span className='flex gap-2'>
            Дача начала кампании:{' '}
            {campaign?.date?.length ? (
              dayjs(campaign?.date[0]).format('DD/MM/YYYY')
            ) : (
              <p className='text-[#11111160]'>не указано</p>
            )}
          </span>
          <span className='flex gap-2'>
            Дата завершения кампании:{' '}
            {campaign?.date?.length ? (
              dayjs(campaign?.date[1]).format('DD/MM/YYYY')
            ) : (
              <p className='text-[#11111160]'>не указано</p>
            )}
          </span>
          <span className='flex gap-2'>
            Основной канал: {campaign?.channel || <p className='text-[#11111160]'>не указано</p>}
          </span>
          <span className='flex gap-2'>
            Цель конверсии: {campaign?.conversion || <p className='text-[#11111160]'>не указано</p>}
          </span>
          <span className='flex gap-2'>
            Расходы: {campaign?.expenses || <p className='text-[#11111160]'>не указано</p>}
          </span>
          <span className='flex gap-2'>
            Желаемый доход: {campaign?.income || <p className='text-[#11111160]'>не указано</p>}
          </span>
        </div>
        <h3 className={s.subtitle}>
          Изменить почту <EditButton onClick={() => setOpenChangeEmail(true)} />
        </h3>
        <h3 className={s.subtitle}>
          Изменить пароль <EditButton onClick={() => setOpenResetPassword(true)} />
        </h3>
        <h3 className={s.subtitle}>
          Подписка: {getTitleOfSubscription(subscriptionInfo?.subscriptionPlan)}
          <Link href='/subscription' className='ml-1'>
            <EditButton />
          </Link>
        </h3>
        <span className='flex gap-2 text-sm'>
          Действует до:{' '}
          {subscriptionInfo?.subscriptionExpiresAt ? (
            dayjs(subscriptionInfo?.subscriptionExpiresAt).format('DD/MM/YYYY')
          ) : (
            <p className='text-[#11111160]'>не указано</p>
          )}
        </span>
      </div>

      <ChangeEmailModal />
      <ResetPasswordModal />
    </div>
  );
};
