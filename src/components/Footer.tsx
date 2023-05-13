import React from 'react'
import { Link } from "react-router-dom";
import { useLang } from '../stores';
import logo from "../assets/logo.svg";

export const Footer = () => {
  const { lang } = useLang();

  const links = [
    {
      en: "Learn",
      ar: "تعلم",
      url: "/#learn-section",
      position: "leading",
    },
    {
      en: "What's new",
      ar: "جديدنا",
      url: "/#whats-new-section",
      position: "leading",
    },
    {
      en: "Prominent areas",
      ar: "أبرز المجالات",
      url: "/#prominent-areas-section",
      position: "leading",
    },
  ]

  const leadingElements = links
  .filter((l) => l.position === "leading")
  .map((l) => {
    return (
      <Link className="p-1 text-right m-1" to={l.url}>
        {lang === "ltr" ? l.en : l.ar}
      </Link>
    );
  });

  return (
    <footer className='w-full'>
      <div className='flex flex-col md:flex-row bg-[#FBFBFB] mx-10 p-10 rounded-xl justify-between'>
        <div className='flex items-start'>
          <img className='h-6' src={logo} alt="" />
        </div>
        <div className='flex flex-col '>
        {leadingElements}
        </div>
      </div>
      <div className="font-semibold py-6 w-full text-center">{lang === "ltr" ? "2023 T3lm All right reserved" : "جميع الحقوق محفوظة لمنصة تعلم 2023"}</div>
    </footer>
  )
}