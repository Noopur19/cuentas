import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { TRANSLATIONS_ES } from './locales/es';
import { TRANSLATIONS_EN } from './locales/en';
import { locale } from 'utils/helpers'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: TRANSLATIONS_EN
            },
            es: {
                translation: TRANSLATIONS_ES
            }
        }
    });

i18n.changeLanguage(locale());