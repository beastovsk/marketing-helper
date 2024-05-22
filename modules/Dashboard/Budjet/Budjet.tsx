import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import s from './Budjet.module.scss';

const Budjet = () => {
  const list = [
    {
      title: 'Расходы',
      amount: '1,000,000 RUB',
      range: 'От 800,000 до 1,200,000 рублей',
      review:
        'Расходы находятся в оптимальном диапазоне для данной ниши. Рекомендуется инвестировать в основные каналы продвижения и тестировать новые инструменты'
    },
    {
      title: 'Прогнозируемый доход',
      amount: '3,000,000 RUB',
      range: 'От 2,800,000 до 4,200,000 рублей',
      review:
        'Ожидаемый доход соответствует оптимальным показателям для данной ниши, что подтверждает рентабельность кампании'
    }
  ];
  return (
    <SubscriptionBlocker requiredPlan='demo'>
      <>
        <h1 className={s.title}>Бюджет</h1>
        <div className='grid grid-cols-2 md:grid-cols-1 gap-4 mt-5'>
          {list.map(({amount, review, range, title}) => (
            <div className='box' key={title}>
              <h3 className='text-xl mb-5 font-normal'>{title}</h3>
              <h4 className='text-xl bold mb-3'>{amount}</h4>
              <p className='mb-3'>{range}</p>
              <p>{review}</p>
            </div>
          ))}
        </div>
      </>
    </SubscriptionBlocker>
  );
};

export default Budjet;
