import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, Sparkles, ArrowRight, Sun, Monitor, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '@/assets/images/logo.jpg';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslatedContent } from '@/hooks/useTranslatedContent';

// Simple Theme Toggle Component
const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Use resolvedTheme for display logic since it accounts for system preference
  const currentTheme = resolvedTheme || theme;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="relative bg-gradient-to-br from-emerald-400/30 via-teal-400/25 to-emerald-500/30 hover:from-emerald-300/40 hover:via-teal-300/35 hover:to-emerald-400/40 dark:from-slate-600/90 dark:via-slate-500/80 dark:to-slate-600/90 dark:hover:from-slate-500/95 dark:hover:via-slate-400/85 dark:hover:to-slate-500/95 border border-emerald-300/60 dark:border-emerald-500/70 hover:border-emerald-200/80 dark:hover:border-emerald-400/90 text-emerald-800 dark:text-emerald-200 hover:text-emerald-700 dark:hover:text-emerald-100 transition-all duration-300 group shadow-lg hover:shadow-xl backdrop-blur-sm"
    >
      {/* Light theme - Sun */}
      <Sun className={`h-5 w-5 transition-all duration-300 ${
        currentTheme === 'light'
          ? 'rotate-0 scale-100'
          : '-rotate-90 scale-0'
      } text-emerald-700 dark:text-emerald-300`} />

      {/* Dark theme - Moon */}
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${
        currentTheme === 'dark'
          ? 'rotate-0 scale-100'
          : 'rotate-90 scale-0'
      } text-emerald-700 dark:text-emerald-300`} />

      {/* System theme - Monitor */}
      <Monitor className={`absolute h-5 w-5 transition-all duration-300 ${
        theme === 'system' && currentTheme !== 'light' && currentTheme !== 'dark'
          ? 'scale-100'
          : 'scale-0'
      } text-emerald-700 dark:text-emerald-300`} />

      <span className="sr-only">Toggle theme (Light/Dark/System)</span>

      {/* Simple theme indicator */}
      <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
        currentTheme === 'light' ? 'bg-amber-400' :
        currentTheme === 'dark' ? 'bg-indigo-400' :
        'bg-purple-400'
      }`} />
    </Button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [translatedNavItems, setTranslatedNavItems] = useState<Record<string, string>>({});
  const [translatedBranding, setTranslatedBranding] = useState<Record<string, string>>({});
  const [translatedDonateText, setTranslatedDonateText] = useState<string>('');
  const [translatedMobileDonateText, setTranslatedMobileDonateText] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { getTranslatedTexts, getFinalText } = useTranslatedContent();

  const scrollToBankAccounts = () => {
    navigate('/donate');

    // Function to scroll to bank accounts section
    const performScroll = () => {
      const bankAccountsSection = document.getElementById('bank-accounts');
      if (bankAccountsSection) {
        bankAccountsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Try to scroll immediately, then retry after a short delay
    performScroll();
    setTimeout(performScroll, 200);
    setTimeout(performScroll, 500);
  };

  // Navigation keys for translation
  const navigationKeys = [
    { key: 'nav.home', href: '/', fallback: 'Home' },
    { key: 'nav.about', href: '/about', fallback: 'About' },
    { key: 'nav.programs', href: '/programs', fallback: 'Programs' },
    { key: 'nav.events', href: '/events', fallback: 'Events' },
    { key: 'nav.donate', href: '/donate', fallback: 'Donate' },
    { key: 'nav.gallery', href: '/gallery', fallback: 'Gallery' },
    { key: 'nav.contact', href: '/contact', fallback: 'Contact' },
  ];

  // Load translations when component mounts or language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Get navigation translations
        const navKeys = navigationKeys.map(item => item.key);
        const navTranslations = await getTranslatedTexts(navKeys);

        // Get branding translations
        const brandingTranslations = await getTranslatedTexts([
          'header.branding.title',
          'header.branding.subtitle',
          'header.donateButton',
          'header.mobileDonateButton',
          'header.logoAlt'
        ]);

        setTranslatedNavItems(navTranslations);
        setTranslatedBranding(brandingTranslations);

        // Set individual donate button texts
        setTranslatedDonateText(brandingTranslations['header.donateButton'] || 'Donate Now');
        setTranslatedMobileDonateText(brandingTranslations['header.mobileDonateButton'] || 'Donate Now & Save Lives');

      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to original structure
        setTranslatedNavItems({});
        setTranslatedBranding({});
        setTranslatedDonateText('Donate Now');
        setTranslatedMobileDonateText('Donate Now & Save Lives');
      }
    };

    loadTranslations();
  }, []); // Only run once on mount

  // Create navigation array with translated names
  const navigation = navigationKeys.map(item => ({
    name: getFinalText(item.key, item.fallback),
    href: item.href,
  }));

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-br from-slate-50/70 via-white/60 to-slate-100/70 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80 backdrop-blur-2xl border-b border-emerald-200/30 dark:border-emerald-800/40 shadow-xl sticky top-0 z-50 transition-all duration-500 hover:shadow-2xl">
      {/* Enhanced animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-400/8 to-emerald-500/10 animate-pulse opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-300/5 to-teal-300/5 animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Premium Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              {/* Logo container with enhanced styling */}
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-500 group-hover:scale-110 relative">
                <img
                  src={logoImage}
                  alt={getFinalText('header.logoAlt', 'Mufti Dawud Charity Logo')}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Logo border glow */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/20 group-hover:ring-emerald-400/40 transition-all duration-500"></div>

                {/* Floating accent elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-md"></div>
              </div>
            </div>

            {/* Enhanced branding */}
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors duration-500 tracking-tight">
                {getFinalText('header.branding.title', 'Mufti Dawud')}
              </h1>
              <p className="text-sm text-muted-foreground group-hover:text-emerald-500 transition-colors duration-500 font-medium">
                {getFinalText('header.branding.subtitle', 'Charity Organization')}
              </p>
            </div>

            {/* Mobile branding */}
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors duration-500">
                {getFinalText('header.branding.title', 'Mufti Dawud')}
              </h1>
            </div>
          </Link>

          {/* Enhanced Premium Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-500 group overflow-hidden ${
                  isActive(item.href)
                    ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/80 dark:hover:bg-white/10 hover:scale-105 border border-transparent hover:border-emerald-200/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10 tracking-wide">{item.name}</span>

                {/* Enhanced active indicator */}
                {isActive(item.href) && (
                  <>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-white/80 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 animate-pulse"></div>
                  </>
                )}

                {/* Premium hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 rounded-xl ${
                  isActive(item.href)
                    ? 'opacity-100 from-emerald-400/30 to-teal-500/30'
                    : 'opacity-0 group-hover:opacity-100 from-emerald-500/10 to-teal-500/10 scale-105'
                }`}></div>

                {/* Corner accent for active items */}
                {isActive(item.href) && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Modern Professional Donate Button */}
          <div className="hidden md:block">
            <Button
              variant="donate"
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-emerald-400/30 hover:border-emerald-300/50 px-6 py-3 text-base font-semibold tracking-wide"
              onClick={scrollToBankAccounts}
            >
              <span className="relative z-10 flex items-center gap-2">
                {/* Clean Heart Icon */}
                <Heart className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />

                <span className="text-white font-medium">
                  {translatedDonateText}
                </span>
              </span>

              {/* Subtle Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            </Button>
          </div>

          {/* Enhanced Actions Section */}
          <div className="flex items-center gap-3">
            {/* Desktop Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile Language Selector - Outside hamburger menu */}
            <div className="md:hidden">
              <LanguageSelector variant="compact" />
            </div>

            {/* Mobile Theme Toggle - Outside hamburger menu */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-110 ${
                  isMenuOpen
                    ? 'bg-gradient-to-br from-emerald-400/40 to-teal-400/40 text-emerald-700 border border-emerald-300/70'
                    : 'hover:bg-gradient-to-br hover:from-emerald-50/80 hover:to-teal-50/80 hover:border-emerald-200/50'
                }`}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>

                {/* Menu button glow effect */}
                <div className={`absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 ${
                  isMenuOpen ? 'bg-gradient-to-br from-emerald-400/40 to-teal-400/40 animate-pulse' : 'group-hover:bg-gradient-to-br group-hover:from-emerald-50/90 group-hover:to-teal-50/90'
                }`}></div>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Premium Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-emerald-200/40 dark:border-emerald-800/50 bg-gradient-to-br from-slate-50/80 via-white/70 to-slate-100/80 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/90 backdrop-blur-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            <div className="px-4 pt-6 pb-6 space-y-3">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    className={`relative flex items-center px-4 py-4 rounded-xl text-base font-semibold transition-all duration-500 group overflow-hidden ${
                      isActive(item.href)
                        ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-emerald-50/80 hover:to-teal-50/80 dark:hover:from-emerald-900/80 dark:hover:to-teal-900/80 border border-transparent hover:border-emerald-200/60 dark:hover:border-emerald-800/60'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10 tracking-wide">{item.name}</span>

                    {/* Enhanced active indicator */}
                    {isActive(item.href) && (
                      <>
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white/90 rounded-r-full animate-pulse"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 animate-pulse"></div>
                      </>
                    )}

                    {/* Premium hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 rounded-xl ${
                      isActive(item.href)
                        ? 'opacity-100 from-emerald-400/30 to-teal-500/30'
                        : 'opacity-0 group-hover:opacity-100 from-emerald-500/10 to-teal-500/10'
                    }`}></div>
                  </Link>
                </motion.div>
              ))}


              {/* Enhanced Mobile Donate Button */}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <Button
                  asChild
                  variant="donate"
                  size="lg"
                  className="w-full group relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 border border-emerald-400/30 hover:border-emerald-300/50"
                >
                  <Link to="/donate" onClick={() => setIsMenuOpen(false)} className="relative z-10 flex items-center justify-center gap-3 py-4">
                    {/* Clean Heart Icon */}
                    <Heart className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />

                    <span className="text-white font-semibold text-lg">
                      {translatedMobileDonateText}
                    </span>

                    {/* Subtle Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;