'use client';

import Loading from '@/app/loading';
import {useEffect} from 'react';
import {useMutation} from 'react-query';
import {useStore} from '../store';
import {getAdminStatistic} from '@/src/api';

export const AdminProvider = ({children}) => {
  const {statistic, setStatistic} = useStore();
  const {mutate, isLoading, isSuccess} = useMutation(getAdminStatistic);

  useEffect(() => {
    mutate(null, {
      onSuccess: (data) => {
        setStatistic(data);
      }
    });
  }, []);

  if (isLoading || !statistic) {
    return <Loading />;
  }

  return <div>{children}</div>;
};
