import {create} from 'zustand';

interface IStore {
  openConfirmCode: boolean;
  openResetPassword: boolean;
  openChangeEmail: boolean;
  openCampaign: boolean;
  campaign: null | Record<string, string>;

  setOpenConfirmCode: (param: boolean) => void;
  setOpenResetPassword: (param: boolean) => void;
  setOpenChangeEmail: (param: boolean) => void;
  setOpenCampaign: (param: boolean) => void;
  setCampaign: (param: Record<string, string>) => void;
}

export const useStore = create<IStore>()((set) => ({
  openChangeEmail: false,
  setOpenChangeEmail: (value) => set(() => ({openChangeEmail: value})),

  openConfirmCode: false,
  setOpenConfirmCode: (value) => set(() => ({openConfirmCode: value})),

  openResetPassword: false,
  setOpenResetPassword: (value) => set(() => ({openResetPassword: value})),

  openCampaign: false,
  setOpenCampaign: (value) => set(() => ({openCampaign: value})),

  campaign: null,
  setCampaign: (value) => set(() => ({campaign: value}))
}));
