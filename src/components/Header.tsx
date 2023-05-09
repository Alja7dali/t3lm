import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLang } from "../stores";
import logo from "../assets/logo.svg";

export const Header = () => {
  const [ lang, setLang ] = useLang();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
    navRef.current.classList.toggle("hidden");
    navRef.current.classList.toggle("flex");
  }

  const resetIsNavOpen = () => {
    if (isNavOpen === true) {
      setIsNavOpen(false)
      navRef.current.classList.add("hidden");
      navRef.current.classList.remove("flex");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () =>  window.innerWidth > 768 && resetIsNavOpen())
  })

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
    {
      en: "Sign up",
      ar: "إنشاء الحساب",
      url: "/sign-up",
      position: "trailing",
      style: "fill"
    },
    {
      en: "Sign in",
      ar: "تسجيل الدخول",
      url: "/sign-in",
      position: "trailing",
      style: "outline"
    },
  ];

  // const elements = links.reduce((r, l) => {
  //   const node = Link()
  //   r[l.position ? "leading" : "trailing"].push(node)
  //   return r;
  // }, {leading: [], trailing: []})
  const leadingElements = links
    .filter((l) => l.position === "leading")
    .map((l) => {
      return (
        <Link className="p-1 text-center w-56 md:w-auto" to={l.url}>
          {lang === "ltr" ? l.en : l.ar}
        </Link>
      );
    });
  const trailingElements = links
    .filter((l) => l.position === "trailing")
    .map((l) => {
      if ("style" in l) {
        if (l.style === "fill") {
          return <Link className="p-1 px-3 text-center w-56 md:w-auto text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded-lg" to={l.url}>
            {lang === "ltr" ? l.en : l.ar}
          </Link>
        } else {
          return <Link className="p-1 px-3 text-center w-56 md:w-auto text-blue-500 hover:text-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded-lg" to={l.url}>
            {lang === "ltr" ? l.en : l.ar}
          </Link>
        }
      } else {
        return <Link className="p-1 text-center w-56 md:w-auto" to={l.url}>
          {lang === "ltr" ? l.en : l.ar}
        </Link>
      }
    });

  return (
    <header dir={lang} className="fixed top-0 bg-gray-100 w-full">
      <button className="block md:hidden fixed top-0 left-0 p-6" onClick={toggleNav}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d={isNavOpen === true ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
        </svg>
      </button>
      <nav className="max-w-7xl flex flex-col md:flex-row justify-between items-center gap-2 py-6 px-10 text-xl mx-auto">
        <a href="/">
          <img src={logo} className="p-1 h-8 mx-auto"/>
        </a>
        <div ref={navRef} className="w-full hidden md:flex flex-col md:flex-row justify-between items-center gap-2 text-base lg:text-xl">
          {leadingElements}
          <div className="flex-1" />
          <button onClick={()=>setLang(lang === "ltr" ? "rtl" : "ltr")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </button>
          {trailingElements}
        </div>
      </nav>
    </header>
  );  
};
