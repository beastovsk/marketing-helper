import React from 'react';
import dynamic from 'next/dynamic';

const Budjet = dynamic(() => import('@/modules/Dashboard/Budjet/Budjet'));
const Optimization = dynamic(() => import('@/modules/Dashboard/Optimization/Optimization'));

export default async function Page() {
  return (
    <>
      <Budjet />
      <Optimization />
    </>
  );
}
