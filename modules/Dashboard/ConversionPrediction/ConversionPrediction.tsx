import {Conversion} from '../Conversion/Conversion';
import {SubscriptionBlocker} from '../SubscriptionBlocker/SubscriptionBlocker';

import s from './ConversionPrediction.module.scss';

const ConversionPrediction = () => {
  return (
    <SubscriptionBlocker requiredPlan='basic'>
      <div className='box mt-10 flex flex-col gap-5'>
        <h3 className={s.subtitle}>Прогноз конверсии на неделю</h3>
        <Conversion />
      </div>
    </SubscriptionBlocker>
  );
};

export default ConversionPrediction;
