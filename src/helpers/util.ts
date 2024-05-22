export const getTitleOfSubscription = (plan) => {

  switch (plan) {
    case 'demo':
      return 'Демо';
    case 'basic':
      return 'Базовый';
    case 'advanced':
      return 'Продвинутый';
  }
};
