import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "@/locales/english.json";
import french from "@/locales/french.json";

i18next.use(initReactI18next).init({
  resources: {
    english: {
      translation: english,
    },
    french: {
      translation: french,
    },
  },
  lng: "french",
  fallbackLng: "french",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
