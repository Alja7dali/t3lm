import React from 'react'
import { useLang } from '../stores';

export const Footer = () => {
  const { lang } = useLang();

  return (
    <footer className='w-full'>
      <div className="font-semibold py-6 w-full text-center">{lang === "ltr" ? "2023 T3lm All right reserved" : "جميع الحقوق محفوظة لمنصة تعلم 2023"}</div>
    </footer>
  )
}