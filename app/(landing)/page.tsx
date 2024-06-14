import {AboutUs} from '@/modules/Landing/AboutUs/AboutUs';
import {Banner} from '@/modules/Landing/Banner/Banner';
import {Feedback} from '@/modules/Landing/Feedback/Feedback';
import {Functional} from '@/modules/Landing/Functional/Functional';
import {HowItWorks} from '@/modules/Landing/HowItWorks/HowItWorks';
import {Prices} from '@/modules/Landing/Prices/Prices';
import {Reviews} from '@/modules/Landing/Reviews/Reviews';
import VideoPlayer from '@/modules/Landing/VideoPlayer/VideoPlayer';
import dynamic from 'next/dynamic';

import React from 'react';

export default async function Page() {
  return (
    <div>
      <Banner />
      <VideoPlayer />
      <AboutUs />
      <Functional />
      <HowItWorks />
      <Reviews />
      <Prices />
      <Feedback />
    </div>
  );
}
