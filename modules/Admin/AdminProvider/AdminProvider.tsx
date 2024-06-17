'use client';

import Loading from '@/app/loading';
import {getAdminStatistic} from '@/src/api';
import {useEffect} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useStore} from '../store';

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
