import React, { useState } from 'react'
import { Page } from '../components'
import { Link } from 'react-router-dom'
import { HashScroll } from 'react-hash-scroll'
import { useLang } from '../stores'
import { validateEmail } from '../utils'

export const Home = () => {
  const [ lang, setLang ] = useLang();

  const sections = [
    {
      id: "learn-section",
      role: "text",
      title: {
        en: "Learn",
        ar: "تعلم",
      },
      description: {
        en: "Your first destination for everything new in the world of technology!",
        ar: "وجهتك الاولى لكل جديد في عالم التقنية!",
      },
      actions: []
    },
    {
      id: "whats-new-section",
      role: "card",
      title: {
        en: "What's new",
        ar: "جديدنا",
      },
      data: [...Array(4)].map((_, i) => {
        return {
          title: {
            en: `Title ${i + 1}`,
            ar: `عنوان ${i + 1}`,
          },
          description: {
            en: "This is just a dummy text acting as description for this card, kindly ignore any misspelling or incorrect grammar.",
            ar: "هذا مجرد نص وهمي بمثابة وصف لهذه البطاقة ، يرجى تجاهل أي خطأ إملائي أو قواعد نحوية غير صحيحة.",
          },
          points: [...Array(4)].map((_, j) => {
            return {
              en: `Goal ${j + 1}`,
              ar: `هدف ${j + 1}`,
            }
          }),
        }
      }),
      actions: [
        {
          en: "Show courses",
          ar: "عرض الدورات",
          url: "/courses"
        }
      ]
    },
    {
      id: "prominent-areas-section",
      role: "card-scrolling",
      title: {
        en: "Prominent areas",
        ar: "أبرز المجالات",
      },
      data: [...Array(6)].map((_, i) => {
        return {
          image: {
            url: "https://source.unsplash.com/random/100x100/?tool"
          },
          title: {
            en: `Name ${i + 1}`,
            ar: `اسم ${i + 1}`,
          },
        }
      }),
      actions: []
    },
    {
      id: "testimonies-section",
      role: "card",
      title: {
        en: "They said about us",
        ar: "قالوا عنا",
      },
      data: [...Array(4)].map((_, i) => {
        return {
          image: {
            url: `https://source.unsplash.com/random/100x100/?person`
          },
          title: {
            en: `Title ${i + 1}`,
            ar: `عنوان ${i + 1}`,
          },
          subtitle: {
            en: `Subtitle ${i + 1}`,
            ar: `عنوان فرعي ${i + 1}`,
          },
          description: {
            en: "This is just a dummy text acting as description for this card, kindly ignore any misspelling or incorrect grammar.",
            ar: "هذا مجرد نص وهمي بمثابة وصف لهذه البطاقة ، يرجى تجاهل أي خطأ إملائي أو قواعد نحوية غير صحيحة.",
          },
        }
      }),
      actions: []
    },
  ]

  const renderSectionTitle = (section) => {
    if ('title' in section) {
      return <div className='text-4xl md:text-5xl self-center py-8 md:py-12'>{lang === "ltr" ? section.title.en : section.title.ar}</div>
    }
  }

  const renderCardImage = (card) => {
    if ('image' in card) {
      return <img src={card.image.url} className='rounded-full overflow-hidden w-20 h-20 self-center'></img>
    }
  }
  const renderCardTitle = (card) => {
    if ('title' in card) {
      return <div className='text-xl self-center'>{lang === "ltr" ? card.title.en : card.title.ar}</div>
    }
  }
  const renderCardSubtitle = (card) => {
    if ('subtitle' in card) {
      return <div className='text-lg self-center'>{lang === "ltr" ? card.subtitle.en : card.subtitle.ar}</div>
    }
  }
  const renderCardDescription = (card) => {
    if ('description' in card) {
      return <div className='text-base'>{lang === "ltr" ? card.description.en : card.description.ar}</div>
    }
  }
  const renderCardPoints = (card) => {
    if ('points' in card) {
      return <ul className='list-disc list-inside'>
        {card.points.map((p) => {
          return <li className='text-sm'>{lang === "ltr" ? p.en : p.ar}</li>
        })}
      </ul>
    }
  }
  const nodes = sections.map(s => {
    if (s.role === "text") {
      return <HashScroll hash={s.id}>
        <section className='flex flex-col max-w-7xl py-56 px-10 gap-12 justify-center items-center'>
            {renderSectionTitle(s)}
            <div className='text-7xl text-center'>
              {lang === "ltr" ? s.description.en : s.description.ar}
            </div>
        </section>
      </HashScroll>
    } else if (s.role === "card") {
      return <HashScroll hash={s.id}>
        <section className='w-full flex justify-center items-center bg-gray-200'>
          <div className='max-w-7xl flex flex-col py-20 px-10 justify-center items-center'>
            {renderSectionTitle(s)}
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 justify-between items-center'>
              {s.data.map(i => {
                return <div className='flex flex-col p-8 space-y-2 bg-gray-200 rounded-md'>
                  {renderCardImage(i)}
                  {renderCardTitle(i)}
                  {renderCardSubtitle(i)}
                  {renderCardDescription(i)}
                  {renderCardPoints(i)}
                </div>
              })}
            </div>
            <div className='flex flex-row w-full py-4'>
              {s.actions.map(a => {
                return <a href={a.url} className='min-w-fit text-gray-600 hover:text-gray-500 border-2 border-gray-600 hover:border-gray-500 rounded-md px-2 py-1'>{lang === "ltr" ? a.en : a.ar}</a>
              })}
            </div>
          </div>
        </section>
      </HashScroll>
    } else if (s.role === "card-scrolling") {
      return <HashScroll hash={s.id}>
        <section className='bg-gray-300 flex justify-center items-center w-full'>
          <div className='max-w-7xl flex flex-col py-20 gap-12 justify-center items-center w-full'>
            {renderSectionTitle(s)}
            <div className='flex flex-row justify-between items-center px-10 overflow-x-scroll w-full'>
              {s.data.map(i => {
                return <div className='flex flex-col min-w-fit p-8'>
                  {renderCardImage(i)}
                  {renderCardTitle(i)}
                  {renderCardSubtitle(i)}
                  {renderCardDescription(i)}
                  {renderCardPoints(i)}
                </div>
              })}
            </div>
          </div>
        </section>
      </HashScroll>
    }
  })

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    let errorFound = false;
    if (email.length === 0) {
      setEmailError("Required input")
      errorFound = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid input")
      errorFound = true;
    }

    if (errorFound === false) {
      alert("Thank you");
      window.location.href = "/"
    }
  };

  return (
    <Page className="h-full">
      <div dir={lang} className="flex flex-col items-center justify-center w-full">
        {nodes}
        <div className="flex flex-col items-center justify-center max-w-2xl py-20 px-10 gap-4">
          <div className="flex flex-row items-center justify-center w-full text-3xl text-center">
            { lang === "ltr" ? "Subscribe to receive our news" : "اشترك ليصلك جديدنا"}
          </div>
          <div className="flex flex-row items-center justify-center w-full">
            <div dir="ltr" className="flex flex-row items-center justify-center w-full">
              <input
                value={email}
                onChange={(e) => {setEmail(e.target.value); setEmailError("")}}
                type="text"
                placeholder="example@gmail.com"
                className={`h-12 w-3/5 p-3 rounded-l-lg text-sm outline-none border-transparent border-2 focus:border-solid " + ${emailError.length > 0 ?  "bg-red-50 focus:border-red-500" : "bg-blue-50 focus:border-blue-500"}`}
              />
              <button
                onClick={validate}
                type="button"
                className="h-12 w-2/5 p-3 font-semibold rounded-r-lg text-white bg-blue-500 hover:bg-blue-600"
              >
                {lang === "ltr" ? "Subscribe" : "اشترك"}
              </button>
            </div>
          </div>
          <div className={emailError.length > 0 ? "w-full text-left text-red-700 block" : "hidden"}>
          {emailError.length > 0 ? emailError : ""}
          </div>
        </div>
      </div>
    </Page>
  )
}
