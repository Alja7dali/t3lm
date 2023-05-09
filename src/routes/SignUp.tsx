import React, { useState } from "react";
import { Page } from "../components";
import { Link } from "react-router-dom";
import { validateArabicName, validateEmail, validateMobile } from "../utils";
import { useLang } from "../stores";
export const SignUp = () => {
  const [ lang, setLang ] = useLang();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  let fields = [
    {
      title: {
        en: "First name",
        ar: "الاسم الأول",
      },
      value: {
        get: firstname,
        set: setFirstname
      },
      error: {
        get: firstnameError,
        set: setFirstnameError
      },
      type: "text",
    },
    {
      title: {
        en: "Last name",
        ar: "الاسم الأخير",
      },
      value: {
        get: lastname,
        set: setLastname
      },
      error: {
        get: lastnameError,
        set: setLastnameError
      },
      type: "text",
    },
    {
      title: {
        en: "Email",
        ar: "البريد الإلكتروني",
      },
      value: {
        get: email,
        set: setEmail
      },
      error: {
        get: emailError,
        set: setEmailError
      },
      type: "email",
    },
    {
      title: {
        en: "Mobile number",
        ar: "رقم الجوال",
      },
      value: {
        get: mobile,
        set: setMobile
      },
      error: {
        get: mobileError,
        set: setMobileError
      },
      type: "tel",
    }
  ]

  const validate = () => {
    let errorFound = false;
    for (let i=0; i<fields.length; i++) {
      fields[i].error.set("")
      if (fields[i].type === "text") {
        if (fields[i].value.get.length === 0) {
          fields[i].error.set("Required input")
          errorFound = true;
        } else if (!validateArabicName(fields[i].value.get)) {
          fields[i].error.set("Invalid input")
          errorFound = true;
        }
      } else if (fields[i].type === "email") {
        if (fields[i].value.get.length === 0) {
          fields[i].error.set("Required input")
          errorFound = true;
        } else if (!validateEmail(fields[i].value.get)) {
          fields[i].error.set("Invalid input")
          errorFound = true;
        }
      } else if (fields[i].type === "tel") {
        if (fields[i].value.get.length === 0) {
          fields[i].error.set("Required input")
          errorFound = true;
        } else if (!validateMobile(fields[i].value.get)) {
          fields[i].error.set("Invalid input")
          errorFound = true;
        }
      }
    }

    if (errorFound === false) {
      alert("Thank you");
      window.location.href = "/"
    }
  };

  return (
    <Page>
      <section dir={lang} className="flex-1 max-w-3xl px-8 self-center flex flex-col justify-center items-center">
        <div className="w-full text-4xl">
          {lang === "ltr" ? "Sign up" : "إنشاء حساب"}
        </div>
        <form
          onSubmit={e => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="container flex flex-col py-4 space-y-8"
        >
          <div className="flex flex-col space-y-4">
            {fields.map((f) => {
              return <div>
                <label className="text-sm">
                  {lang === "ltr" ? f.title.en : f.title.ar}
                </label>
                <input
                  type={f.type}
                  value={f.value.get}
                  onChange={(e) => {f.value.set(e.target.value); f.error.set("")}}
                  placeholder={lang === "ltr" ? f.title.en : f.title.ar}
                  className={`w-full rounded-md p-4 outline-none border-transparent border-2 focus:border-solid ${f.error.get.length > 0 ? "bg-red-50 focus:border-red-500" : "bg-blue-50 focus:border-blue-500"}`}
                />
                <div className={f.error.get.length > 0 ? "text-red-700 block" : "hidden"}>
                {f.error.get}
                </div>
              </div>
            })}
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={validate} className="p-1 px-3 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded-md">
              {lang === "ltr" ? "Sign up" : "إنشاء حساب"}
            </button>
            <Link to="/sign-in" className="p-1 px-3 text-blue-500 hover:text-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded-lg text-center">
              {lang === "ltr" ? "Sign in" : "تسجيل الدخول"}
            </Link>
          </div>
        </form>
      </section>
    </Page>
  );
};
