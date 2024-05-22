import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';
import s from './Optimization.module.scss';

const Optimization = () => {
  const optimizationList = [
    {
      channel: 'Социальные сети (ВКонтакте, Instagram, Facebook)',
      budjet: '400,000 RUB',
      conversion: '4%',
      review:
        'Контекстная реклама показывает высокую конверсию, рекомендуется выделить значительную часть бюджета на данный канал.'
    }
  ];

  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div className='box mt-10'>
        <h3 className='text-xl mb-5'>Оптимизация расходов</h3>
        <table className='w-full border-spacing-5 border-separate'>
          <thead>
            <tr>
              <th>Канал</th>
              <th>Бюджет</th>
              <th>Конверсия</th>
              <th>Советы</th>
            </tr>
          </thead>
          <tbody>
            {optimizationList.map(({budjet, channel, conversion, review}, i) => (
              <tr className='md:text-sm' key={i}>
                <th>{channel}</th>
                <th>{budjet}</th>
                <th>{conversion}</th>
                <th>{review}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SubscriptionBlocker>
  );
};

export default Optimization;
