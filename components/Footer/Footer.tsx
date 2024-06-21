import {getCookie} from 'cookies-next';
import Link from 'next/link';
import React, {FC} from 'react';
import {Logo} from '../UI/Logo/Logo';
import s from './Footer.module.scss';

interface FooterProps {}

export const Footer: FC<FooterProps> = (props) => {
  const token = getCookie('token');
  const linksList = [
    {
      title: 'Документы',
      links: [
        {
          label: 'Лицензия на продажу интеллектуальной собственности',
          href: '/docs/intellectual_property'
        },
        {
          label: 'Подтверждение согласия правообладателя на реализацию товара с его товарным знаком',
          href: '/docs/copywrite'
        },
        {
          label: 'Договор оферты',
          href: '/docs/public_offer'
        },
        {
          label: 'Условия возврата и отмены платежа',
          href: '/docs/refund'
        }
      ]
    },
    {
      title: 'Контакты',
      links: [
        {
          label: 'narshinovartyom@mail.ru',
          href: 'mailto:narshinovartyom@mail.ru'
        },
        {
          label: '+7 (909) 330-23-11',
          href: 'tel:89093302311'
        },
        {
          label: 'Россия, г. Саратов, ул. Чехова 6а, кв.6',
          href: ''
        },
        {
          label: 'Поддержка',
          href: 'https://t.me/marketing_helper_ai'
        }
      ]
    }
  ];

  return (
    <div className={s.footer}>
      <div className={s.wrapper}>
        <div className='flex justify-between md:flex-col'>
          <div className='opacity-80 w-[200px]'>
            <Logo />
          </div>
          <div className='flex gap-10 flex-grow justify-center md:justify-start lg:mt-10 md:flex-col'>
            {linksList.map(({links, title}, i) => (
              <div key={i} className='w-1/3'>
                <h2 className='text-lg mb-3 '>{title}</h2>
                <div className='flex flex-col gap-1 text-gray-400 w-max'>
                  {links.map(({href, label}, i) => (
                    <Link
                      key={i}
                      href={href}
                      className={`hover:opacity-70 transition-opacity break-words ${
                        title === 'Контакты' ? 'w-full' : 'w-1/2'
                      } `}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-between border-t-[1px] border-t-gray-500 border-opacity-10 mt-[20px] pt-[20px]'>
          <h2 className='text-gray-400 font-medium'>© Marketing Helper, Наршинов А.А. ИНН 645326949589</h2>
          <div className='flex gap-3'>
            <Link href={'https://t.me/marketing_helper_ai'} target='_blank'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='30px' height='30px' className={s.icon}>
                <path d='M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
