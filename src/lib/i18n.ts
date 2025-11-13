import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translationService, SUPPORTED_LANGUAGES } from './translationService';

// Translation resources (fallback keys)
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        programs: 'Programs',
        events: 'Events',
        donate: 'Donate',
        gallery: 'Gallery',
        contact: 'Contact',
      },
      // Header
      header: {
        logoAlt: 'Mufti Dawud Charity Logo',
        branding: {
          title: 'Mufti Dawud',
          subtitle: 'Charity Organization',
        },
        donateButton: 'Donate Now',
        mobileDonateButton: 'Donate Now & Save Lives',
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
      },
    },
  },
  // Fallback for other languages - will be translated via Google Translate API
  am: { translation: {} },
  om: { translation: {} },
  so: { translation: {} },
  ti: { translation: {} },
  ar: { translation: {} },
};

// Custom backend that uses Google Translate API
const googleTranslateBackend = {
  type: 'backend',
  init: function() {},
  read: function(language: string, namespace: string, callback: Function) {
    // For English, use the static resources
    if (language === 'en') {
      callback(null, resources.en.translation);
      return;
    }

    // For other languages, we'll translate on-demand
    // Return empty object and handle translation in the component
    callback(null, resources[language as keyof typeof resources]?.translation || {});
  },
  save: function() {
    // Not needed for our use case
  },
  create: function() {
    // Not needed for our use case
  },
};

// Custom interpolation to handle async translations
const customInterpolation = {
  format: function(value: string, format: string, lng: string) {
    if (format === 'translate' && lng !== 'en') {
      // This will be handled by our custom useTranslation hook
      return value;
    }
    return value;
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(googleTranslateBackend)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // React already escapes values
      ...customInterpolation,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false,
    },

    backend: {
      // Custom backend options if needed
    },
  });

// Custom hook to handle Google Translate API integration
export const useGoogleTranslate = () => {
  const translateText = async (text: string, targetLanguage: string = i18n.language): Promise<string> => {
    if (targetLanguage === 'en') {
      return text;
    }

    try {
      const result = await translationService.translateText(text, targetLanguage, 'en');
      return result.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  };

  const translateMultiple = async (texts: string[], targetLanguage: string = i18n.language): Promise<string[]> => {
    if (targetLanguage === 'en') {
      return texts;
    }

    try {
      return await translationService.translateMultipleTexts(texts, targetLanguage, 'en');
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts; // Fallback to original texts
    }
  };

  return {
    translateText,
    translateMultiple,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage.bind(i18n),
    isLanguageSupported: (lng: string) => SUPPORTED_LANGUAGES.some(lang => lang.code === lng),
  };
};

export default i18n;
