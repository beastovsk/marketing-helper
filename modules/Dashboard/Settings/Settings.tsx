import s from './Settings.module.scss';
import {EditButton} from '@/components/UI/EditButton/EditButton';

export const Settings = () => {
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
          <span>Дача начала компании: Название</span>
          <span>Дата завершения компании: Название</span>
          <span>Канал: Название</span>
          <span>Просмотры: Название</span>
          <span>Конверсия: Название</span>
          <span>Расходы: Название</span>
          <span>Доходы: Название</span>
        </div>
        <h3 className={s.subtitle}>
          Изменить почту <EditButton />
        </h3>
        <h3 className={s.subtitle}>
          Изменить пароль <EditButton />
        </h3>
        <h3 className={s.subtitle}>Подписка: Базовая</h3>
      </div>
    </div>
  );
};
