import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../../../public/locales/en/translation.json";
import translationAR from "../../../public/locales/ar/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

const initializeI18N = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      resources,
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      lng: "ar", // if you're using a language detector, do not define the lng option
      fallbackLng: "ar",
      debug: false,
      detection: {
        order: [
          "queryString",
          "cookie",
          "localStorage",
          "sessionStorage",
          "navigator",
          "htmlTag",
          "path",
          "subdomain",
        ],
        caches: ["cookie"],
      },
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
};

export default initializeI18N;
