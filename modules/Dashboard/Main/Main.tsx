import {Conversion} from '../Conversion/Conversion';
import s from './Main.module.scss';

export const Main = () => {
  const cardsList = [
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    },
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    },
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    },
    {
      label: 'Аудитория',
      description: 'sad',
      review: 'asdasdsa'
    }
  ];

  return (
    <div>
      <h1 className={s.title}>Сервис по анализу маркетинговых стратегий с помощью ИИ</h1>
      <h2 className={s.subtitle}>Маркетинг и реклама (актуально)</h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-1 mt-5'>
        {cardsList.map(({description, label, review}) => (
          <div className='box flex-grow' key={label}>
            <h3 className='text-xl'>{label}</h3>
            <h4 className='text-lg mt-3'>{description}</h4>
            <p className='mt-5'>{review}</p>
          </div>
        ))}
      </div>

      <div className='box mt-10 flex flex-col gap-5'>
        <h3 className={s.subtitle}>Прогноз конверсии на неделю</h3>

        <Conversion />
      </div>
    </div>
  );
};
