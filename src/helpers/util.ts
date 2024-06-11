export const getTitleOfSubscription = (plan) => {
  switch (plan) {
    case 'basic':
      return 'Базовый';
    case 'advanced':
      return 'Продвинутый';
  }
};
