import { ConfirmEmailModal } from '@/components/ConfirmEmail/ConfirmEmail';
import { ResetPasswordModal } from '@/components/ResetPassword/ResetPassword';
import '@/src/styles/global.scss';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex justify-center text-center items-center h-[100vh]'>
      {children}
      <ResetPasswordModal />
      <ConfirmEmailModal />
    </div>
  );
}
