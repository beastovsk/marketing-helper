import React from 'react';
import dynamic from 'next/dynamic';
import Audacity from '@/modules/Dashboard/Audacity/Audacity';
import Product from '@/modules/Dashboard/Product/Product';
// import Competitors from '@/modules/Dashboard/Competitors/Competitors';

const Main = dynamic(() => import('@/modules/Dashboard/Main/Main'));
const ConversionPrediction = dynamic(() => import('@/modules/Dashboard/ConversionPrediction/ConversionPrediction'));

export default async function Page() {
  return (
    <>
      <Main />
      <Product />
      <Audacity />
      {/* <Competitors /> */}
      <ConversionPrediction />
    </>
  );
}
