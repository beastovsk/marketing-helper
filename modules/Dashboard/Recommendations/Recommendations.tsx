import s from './Recommendations.module.scss';

export const Recommendations = () => {
  const list = [
    {
      title: 'Первый клиент',
      date: '12.05.2024'
    },
    {
      title: 'Первая продажа',
      date: '14.05.2024'
    }
  ];
  return (
    <div>
      <h1 className={s.title}>Прогноз</h1>
      <div className='grid grid-cols-2 md:grid-cols-1 gap-4 mt-5'>
        {list.map(({date, title}) => (
          <div className='box' key={title}>
            <h3 className='text-xl mb-5 font-normal'>{title}</h3>
            <h4 className='text-xl bold mb-3'>{date}</h4>
          </div>
        ))}
      </div>

      <div className='box mt-10'>
        <h3 className='text-xl mb-5'>Предложения и рекомендации</h3>
        <div>
          <h4 className='text-lg mb-2'>1. Использовать мультиканальный подход</h4>
          <p className='text-[#11111160]'>
            Разделите бюджет между контекстной рекламой, социальными сетями и email маркетингом для достижения наилучших
            результатов.
          </p>
        </div>
      </div>
    </div>
  );
};
