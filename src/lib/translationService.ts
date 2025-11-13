// Google Translate API service for real-time translations
const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

// Supported languages for the charity website
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

export class TranslationService {
  private cache = new Map<string, { text: string; timestamp: number }>();
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  async translateText(
    text: string,
    targetLanguage: string,
    sourceLanguage?: string
  ): Promise<TranslationResult> {
    // Check cache first
    const cacheKey = `${text}-${targetLanguage}-${sourceLanguage || 'auto'}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return { translatedText: cached.text };
    }

    if (!GOOGLE_TRANSLATE_API_KEY) {
      console.warn('Google Translate API key not found, returning original text');
      return { translatedText: text };
    }

    try {
      const response = await fetch(`${GOOGLE_TRANSLATE_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          source: sourceLanguage || 'en',
          format: 'text',
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`Translation API error: ${data.error.message}`);
      }

      const translatedText = data.data.translations[0].translatedText;
      const detectedSourceLanguage = data.data.translations[0].detectedSourceLanguage;

      // Cache the result
      this.cache.set(cacheKey, {
        text: translatedText,
        timestamp: Date.now(),
      });

      return {
        translatedText,
        detectedSourceLanguage,
      };
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to original text
      return { translatedText: text };
    }
  }

  async translateMultipleTexts(
    texts: string[],
    targetLanguage: string,
    sourceLanguage?: string
  ): Promise<string[]> {
    const results = await Promise.all(
      texts.map(text => this.translateText(text, targetLanguage, sourceLanguage))
    );

    return results.map(result => result.translatedText);
  }

  // Detect language of given text
  async detectLanguage(text: string): Promise<string> {
    if (!GOOGLE_TRANSLATE_API_KEY || GOOGLE_TRANSLATE_API_KEY === 'your_api_key_here') {
      console.log('Google Translate API key not configured, using default language detection');
      return 'en'; // Default fallback
    }

    try {
      const response = await fetch(`${GOOGLE_TRANSLATE_URL}/detect?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Language detection error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`Language detection error: ${data.error.message}`);
      }

      return data.data.detections[0][0].language;
    } catch (error) {
      console.error('Language detection error:', error);
      return 'en'; // Default fallback
    }
  }

  // Get supported languages from Google Translate API
  async getSupportedLanguages(): Promise<LanguageOption[]> {
    if (!GOOGLE_TRANSLATE_API_KEY || GOOGLE_TRANSLATE_API_KEY === 'your_api_key_here') {
      console.log('Google Translate API key not configured, using fallback languages');
      return SUPPORTED_LANGUAGES;
    }

    try {
      const response = await fetch(`${GOOGLE_TRANSLATE_URL}/languages?key=${GOOGLE_TRANSLATE_API_KEY}`);

      if (!response.ok) {
        throw new Error(`Supported languages error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`Supported languages error: ${data.error.message}`);
      }

      return data.data.languages.map((lang: any) => ({
        code: lang.language,
        name: lang.name,
        nativeName: lang.nativeName || lang.name,
      }));
    } catch (error) {
      console.error('Error fetching supported languages:', error);
      return SUPPORTED_LANGUAGES;
    }
  }

  // Clear translation cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Singleton instance
export const translationService = new TranslationService();
