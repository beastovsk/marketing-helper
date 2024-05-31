import localFont from 'next/font/local';
import '@/src/styles/global.scss';
import {Metadata} from 'next';
import ClientProvider from '@/modules/ClientProvider';
import React from 'react';
import Head from 'next/head';

import YandexMetrika from 'next-yandex-metrika';
import Script from 'next/script';
import {tags} from '@/src/helpers/tags';

const gilroy = localFont({
  src: [
    {
      path: './../public/fonts/Gilroy-Light.woff',
      weight: '300',
      style: 'normal'
    },
    {
      path: './../public/fonts/Gilroy-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: './../public/fonts/Gilroy-Bold.woff',
      weight: '700',
      style: 'normal'
    },
    {
      path: './../public/fonts/Gilroy-Medium.woff',
      weight: '500',
      style: 'normal'
    }
  ]
});

export const metadata: Metadata = {
  title: {
    default: 'Marketing Helper',
    template: `%s | MH`
  },
  description: 'Анализ маркетинговой компании с помощью ИИ',
  keywords: tags,
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/favicon.ico'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <Head>
        <meta name='yandex-verification' content='c4492d1cc4639f2c' />
        <YandexMetrika yid={97298086} clickmap={true} trackLinks={true} accurateTrackBounce={true} webvisor={true} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <body>
        <main className={gilroy.className}>{children} </main>
        <Script type='text/javascript'>
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(97298086, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`}
        </Script>
        <noscript>
          <div>
            <img src='https://mc.yandex.ru/watch/97298086' style={{position: 'absolute', left: '-9999px'}} alt='' />
          </div>
        </noscript>
      </body>
    </html>
  );
}
