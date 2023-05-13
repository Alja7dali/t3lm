import React, { useState } from 'react'
import { Page } from '../components'
import { Link } from 'react-router-dom'
import { HashScroll } from 'react-hash-scroll'
import { useLang } from '../stores'
import { validateEmail } from '../utils'

import quotation from "../assets/quotation.png";
import labtop from "../assets/labtop.png";

export const Home = () => {
  const [ lang, setLang ] = useLang();

  const sections = [
    {
      id: "learn-section",
      role: "text",
      title: {
        en: "Learn",
        ar: "منصة تعلّم" ,
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
      return <div></div>
    } else if (s.role === "card") {
      return <div></div>
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
        <HashScroll hash="learn-section mx-20">
          <section className='relative flex flex-col max-w-7xl py-56 px-10 mx-5 justify-center items-center'>
            <div className='absolute left-0 top-[7.5rem] bg-[#FBFBFB] min-w-full min-h-[320px] rounded-[2.5rem] overflow-hidden'>
              <div className='absolute -right-10 -top-[10rem] bg-[#363ED0] w-[30vh] h-[30vh] rounded-full'>
              </div>
            </div>
            <div className='z-10 flex flex-col max-w-7xl justify-center items-center py-20 px-10 backdrop-blur-xl bg-white/30 rounded-[2.5rem] shadow-2xl shadow-gray-200'>
              <div className='text-4xl md:text-5xl self-center py-4 text-[#363ED0]'>
                منصة تعلّم
              </div>
              <div className='text-3xl md:text-4xl text-center'>
                وجهتك الاولى لكل جديد في عالم التقنية
              </div>
            </div>
            <img className='z-20 pt-10 md:absolute md:bottom-10 md:-right-24 md:w-2/5' src={labtop} alt="" />
          </section>
        </HashScroll>

        <HashScroll hash="whats-new-section">
          <section className='w-full flex justify-center items-center bg-gray-150'>
            <div className='max-w-7xl flex flex-col py-20 px-10 justify-center items-center'>
              <div className='text-3xl md:text-4xl self-center py-4 text-[#D5B275]'>
                جديدنا
              </div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-5 place-items-center'>
                {[...Array(4)].map(i => {
                  return <div className='flex flex-col justify-center items-stretch space-y-2 w-full md:w-4/5'>
                    <div className='text-2xl'>
                      تصميم وتجربة واجهة المستخدم
                    </div>
                    <div className='text-base font-light text-gray-500'>
                      سنتعرف في هذه الدورة على أساليب وطرق تصميم تجربة المستخدم وتصميم واجهة المستخدم
                    </div>
                    <ul className='list-disc list-inside'>
                      <li className='text-sm'>
                        استكشاف المشاكل التصميمية وإيجاد حلولها
                      </li>
                      <li className='text-sm'>
                        التعرف على التصاميم المبدئية Low-fidelity
                      </li>
                    </ul>
                  </div>
                })}
              </div>
              <div className='flex flex-row w-full pt-12 justify-center items-center'>
                <a href="#" className='min-w-fit text-white bg-[#363ED0] hover:bg-blue-600 rounded-md px-4 py-2'>عرض الدورات</a>
              </div>
            </div>
          </section>
        </HashScroll>

        <HashScroll hash="testimonies-section">
          <section className='w-full flex justify-center items-center bg-whote'>
            <div className='max-w-7xl flex flex-col py-20 px-10 justify-center items-center'>
              <div className='text-3xl md:text-4xl self-center py-4 text-[#D5B275]'>
                أبرز المجالات
              </div>
              <div className='flex flex-row justify-between items-center px-10 overflow-x-scroll w-full'>
                {[...Array(6)].map(i => {
                  return <div className='flex flex-col min-w-fit p-8 items-center'>
                    <img src="https://source.unsplash.com/random/500x500/?logo" className='rounded-full overflow-hidden w-56'></img>
                    <div className='text-lg text-center font-semibold w-64'>
                      تصميم وتجربة واجهة المستخدم
                    </div>
                  </div>
                })}
              </div>
            </div>
          </section>
        </HashScroll>

        <HashScroll hash="testimonies-section">
          <section className='w-full flex justify-center items-center bg-gray-150'>
            <div className='max-w-7xl flex flex-col py-20 px-10 justify-center items-center'>
              <div className='text-3xl md:text-4xl self-center py-4 text-[#D5B275]'>
                قالوا عنّا
              </div>
              <div className='grid grid-cols-1 gap-10 w-full place-items-center'>
                {[...Array(4)].map(i => {
                  return <div className='flex flex-col justify-center items-center space-y-2 w-full md:w-1/2'>
                    <div className='flex flex-row justify-center items-center w-full gap-4'>
                      <img src="https://source.unsplash.com/random/100x100/?person" className='rounded-full overflow-hidden w-20'></img>
                      <div className='flex flex-col justify-center items-stretch w-full'>
                        <div className='text-xl'>
                          محمد عبدالله
                        </div>
                        <div className='text-sm font-light text-gray-500'>
                          UX/UI Designer
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-row-reverse gap-4'>
                      <div className='text-base font-light text-gray-500'>
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لد تم توليد هذا النص من مولد النص العربي، خيث يمكن أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها هذا التطبيق
                      </div>
                      <img className='w-12 h-12' src={quotation} alt="" />
                    </div>
                  </div>
                })}
              </div>
            </div>
          </section>
        </HashScroll>

        <div className="relative flex flex-col items-center justify-center max-w-7xl py-20 px-2 gap-4">
          <div className='absolute top-0 bg-[#363ED0] w-[20vh] h-[20vh] rounded-full'>
          </div>
          <div className='flex flex-col items-center justify-center max-w-2xl py-10 px-8 gap-4 backdrop-blur-xl bg-white/30 rounded-[2.5rem]'>
            <div className="flex flex-row items-center justify-center w-full text-3xl text-center">
              { lang === "ltr" ? "Subscribe to receive our news" : "اشترك ليصلك جديدنا"}
            </div>
            <input
              value={email}
              onChange={(e) => {setEmail(e.target.value); setEmailError("")}}
              type="text"
              placeholder="example@gmail.com"
              className={`h-12 w-full p-3 rounded-lg text-sm outline-none border-transparent border-2 focus:border-solid " + ${emailError.length > 0 ?  "bg-red-50 focus:border-red-500" : "bg-white focus:border-[#363ED0]"}`}
            />
            <button
              onClick={validate}
              type="button"
              className="h-12 w-2/5 p-3 font-semibold rounded-lg text-white bg-[#363ED0] hover:bg-blue-600"
            >
              {lang === "ltr" ? "Subscribe" : "اشترك"}
            </button>
            <div className={emailError.length > 0 ? "w-full text-left text-red-700 block" : "hidden"}>
            {emailError.length > 0 ? emailError : ""}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
