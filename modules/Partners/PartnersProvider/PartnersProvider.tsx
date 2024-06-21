'use client';

import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export const PartnersProvider = ({children}) => {
  const router = useRouter();
  
  useEffect(() => {
    const partnerToken = localStorage.getItem('partnerToken');
    if (partnerToken) return;

    router.push('/partner/auth');
  }, []);

  return <div>{children}</div>;
};
