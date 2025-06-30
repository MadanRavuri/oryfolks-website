import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ja: {
        translation: jaTranslations
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ja'],
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 