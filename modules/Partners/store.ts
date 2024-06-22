'use client';

import {create} from 'zustand';
import dayjs from 'dayjs';

interface IStore {
  partnerStatistic: null | Record<any, any>;
  statisticDate: {startDate: string; endDate: string};
  setPartnerStatistic: (param: Record<string, string>) => void;
  setStatisticDate: (startDate: string, endDate: string) => void;
}

const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');

export const useStore = create<IStore>()((set) => ({
  partnerStatistic: null,
  statisticDate: {startDate: startOfMonth, endDate: endOfMonth},
  setPartnerStatistic: (value) => set(() => ({partnerStatistic: value})),
  setStatisticDate: (startDate, endDate) => set(() => ({statisticDate: {startDate, endDate}}))
}));
