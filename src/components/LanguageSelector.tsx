import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check, Loader2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES, translationService } from '@/lib/translationService';
import { useGoogleTranslate } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const LanguageSelector = ({ variant = 'default', className }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const { translateText, changeLanguage, currentLanguage } = useGoogleTranslate();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [availableLanguages, setAvailableLanguages] = useState(SUPPORTED_LANGUAGES);

  // Get current language info
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode === currentLanguage) return;

    setIsLoading(languageCode);

    try {
      await changeLanguage(languageCode);

      // Clear translation cache when language changes
      translationService.clearCache();

      // Store the language preference
      localStorage.setItem('i18nextLng', languageCode);

    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(null);
    }
  };

  // Load available languages on mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const languages = await translationService.getSupportedLanguages();
        setAvailableLanguages(languages);
      } catch (error) {
        console.error('Failed to load supported languages:', error);
        // Keep fallback languages
      }
    };

    loadLanguages();
  }, []);

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative bg-gradient-to-br from-blue-400/30 via-indigo-400/25 to-blue-500/30 hover:from-blue-300/40 hover:via-indigo-300/35 hover:to-blue-400/40 dark:from-slate-600/90 dark:via-slate-500/80 dark:to-slate-600/90 dark:hover:from-slate-500/95 dark:hover:via-slate-400/85 dark:hover:to-slate-500/95 border border-blue-300/60 dark:border-blue-500/70 hover:border-blue-200/80 dark:hover:border-blue-400/90 text-blue-800 dark:text-blue-200 hover:text-blue-700 dark:hover:text-blue-100 transition-all duration-300 group shadow-lg hover:shadow-xl backdrop-blur-sm",
              className
            )}
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">Select Language</span>

            {/* Language indicator */}
            <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {availableLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                currentLanguage === language.code && "bg-blue-50 dark:bg-blue-900/20"
              )}
              disabled={isLoading === language.code}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">({language.name})</span>
              </div>

              {isLoading === language.code ? (
                <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
              ) : currentLanguage === language.code ? (
                <Check className="h-3 w-3 text-blue-500" />
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-blue-100/80 dark:from-slate-800/90 dark:via-slate-700/80 dark:to-slate-800/90 border-blue-200/60 dark:border-blue-700/60 hover:border-blue-300/80 dark:hover:border-blue-600/80 text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-all duration-300 group shadow-lg hover:shadow-xl backdrop-blur-sm",
            className
          )}
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">
            {currentLang?.nativeName || 'English'}
          </span>
          <span className="sm:hidden text-xs">
            {currentLang?.code.toUpperCase() || 'EN'}
          </span>

          {isLoading && (
            <Loader2 className="h-3 w-3 ml-2 animate-spin" />
          )}

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-110" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "flex items-center justify-between cursor-pointer py-3",
              currentLanguage === language.code && "bg-blue-50 dark:bg-blue-900/20"
            )}
            disabled={isLoading === language.code}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-medium text-sm">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">{language.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isLoading === language.code ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              ) : currentLanguage === language.code ? (
                <Check className="h-4 w-4 text-blue-500" />
              ) : null}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
