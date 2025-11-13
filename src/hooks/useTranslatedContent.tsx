import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGoogleTranslate } from '@/lib/i18n';

/**
 * Custom hook for handling translated content with Google Translate API
 * Provides real-time translation for UI text while maintaining i18next structure
 */
export const useTranslatedContent = () => {
  const { t, i18n } = useTranslation();
  const { translateText, translateMultiple, currentLanguage } = useGoogleTranslate();
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Get translated text for a single key
   * If language is English, returns the i18next translation
   * For other languages, uses Google Translate API
   */
  const getTranslatedText = async (key: string, fallback?: string): Promise<string> => {
    if (currentLanguage === 'en') {
      return t(key) || fallback || key;
    }

    // Check if we already have a cached translation
    if (translatedContent[key]) {
      return translatedContent[key];
    }

    setIsLoading(true);

    try {
      const englishText = t(key) || fallback || key;
      const translated = await translateText(englishText, currentLanguage);

      setTranslatedContent(prev => ({
        ...prev,
        [key]: translated,
      }));

      return translated;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return t(key) || fallback || key;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get translated text for multiple keys at once
   * Useful for navigation items and other grouped content
   */
  const getTranslatedTexts = async (keys: string[], fallbacks?: Record<string, string>): Promise<Record<string, string>> => {
    if (currentLanguage === 'en') {
      const result: Record<string, string> = {};
      keys.forEach(key => {
        result[key] = t(key) || fallbacks?.[key] || key;
      });
      return result;
    }

    setIsLoading(true);

    try {
      const englishTexts = keys.map(key => t(key) || fallbacks?.[key] || key);
      const translatedTexts = await translateMultiple(englishTexts, currentLanguage);

      const result: Record<string, string> = {};
      keys.forEach((key, index) => {
        result[key] = translatedTexts[index];
      });

      setTranslatedContent(prev => ({
        ...prev,
        ...result,
      }));

      return result;
    } catch (error) {
      console.error('Batch translation error:', error);
      // Fallback to original translations
      const result: Record<string, string> = {};
      keys.forEach(key => {
        result[key] = t(key) || fallbacks?.[key] || key;
      });
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear cached translations (useful when language changes)
   */
  const clearTranslations = () => {
    setTranslatedContent({});
  };

  /**
   * Get the final translated text for a key (cached or fresh)
   */
  const getFinalText = (key: string, fallback?: string): string => {
    if (currentLanguage === 'en') {
      return t(key) || fallback || key;
    }

    return translatedContent[key] || t(key) || fallback || key;
  };

  // Clear translations when language changes
  useEffect(() => {
    clearTranslations();
  }, [currentLanguage]);

  return {
    getTranslatedText,
    getTranslatedTexts,
    getFinalText,
    isLoading,
    currentLanguage,
    clearTranslations,
  };
};

export default useTranslatedContent;
