import {create} from 'zustand';

interface IStore {
  openAdminConfirm: boolean;
  statistic: null | Record<any, any>;

  setOpenAdminConfirm: (param: boolean) => void;
  setStatistic: (param: Record<string, string>) => void;
}

export const useStore = create<IStore>()((set) => ({
  openAdminConfirm: false,
  setOpenAdminConfirm: (value) => set(() => ({openAdminConfirm: value})),

  statistic: null,
  setStatistic: (value) => set(() => ({statistic: value}))
}));
