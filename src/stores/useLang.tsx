import { useState } from "react";
import { useBetween } from "use-between";

const useLangState = () => {
  const [lang, setLang] = useState("rtl");

  return [lang, setLang]
}

export const useLang = () => useBetween(useLangState);