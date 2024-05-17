import {create} from 'zustand';

interface IStore {
  openConfirmCode: boolean;
  openResetPassword: boolean;
  openChangeEmail: boolean;

  setOpenConfirmCode: (param: boolean) => void;
  setOpenResetPassword: (param: boolean) => void;
  setOpenChangeEmail: (param: boolean) => void;
}

export const useStore = create<IStore>()((set) => ({
  openChangeEmail: false,
  setOpenChangeEmail: (value) => set(() => ({openChangeEmail: value})),

  openConfirmCode: false,
  setOpenConfirmCode: (value) => set(() => ({openConfirmCode: value})),

  openResetPassword: false,
  setOpenResetPassword: (value) => set(() => ({openResetPassword: value}))
}));
