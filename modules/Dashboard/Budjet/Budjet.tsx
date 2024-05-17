import s from './Budjet.module.scss';

export const Budjet = () => {
  const optimizationList = [
    {
      channel: 'Социальные сети (ВКонтакте, Instagram, Facebook)',
      budjet: '400,000 RUB',
      conversion: '4%',
      review:
        'Контекстная реклама показывает высокую конверсию, рекомендуется выделить значительную часть бюджета на данный канал.'
    }
  ];
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
    <div>
      <h1 className={s.title}>Бюджет</h1>
      <div className='grid grid-cols-2 md:grid-cols-1 gap-4 mt-5'>
        {list.map(({amount, review, range, title}) => (
          <div className='box'>
            <h3 className='text-xl mb-5 font-normal'>{title}</h3>
            <h4 className='text-xl bold mb-3'>{amount}</h4>
            <p className='mb-3'>{range}</p>
            <p>{review}</p>
          </div>
        ))}
      </div>

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
            {optimizationList.map(({budjet, channel, conversion, review}) => (
              <tr className='md:text-sm'>
                <th>{channel}</th>
                <th>{budjet}</th>
                <th>{conversion}</th>
                <th>{review}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
