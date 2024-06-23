import {ChangeCampaignModal} from '@/components/ChangeCampaign/ChangeCampaign';
import {ChangeSubscriptionModal} from '@/components/ChangeSubscription/ChangeSubscription';
import {Header} from '@/modules/Dashboard/Header/Header';
import {Sidebar} from '@/modules/Dashboard/Sidebar/Sidebar';
import '@/src/styles/global.scss';
import {getCookie} from 'cookies-next';
import React from 'react';

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex h-full'>
      <Sidebar />
      <div className='bg-[#F5F6FA] flex flex-col w-full h-full ml-[300px] lg:ml-0 flex-grow '>
        <div className='flex-grow-0 flex-shrink-0 basis-auto'>
          <Header />
        </div>
        <div className='flex-grow min-h-[90vh] flex-shrink-0 basis-auto container flex flex-col gap-10 md:gap-5 md:pb-[100px] p-[30px] md:pt-[10px] md:px-[10px] '>
          {children}
        </div>
      </div>
    </div>
  );
}
