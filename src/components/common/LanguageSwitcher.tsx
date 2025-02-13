import { memo, type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';
import { useLanguageStore } from '@/store/useLanguageStore';
import { t } from '@/utils/i18n';

export const LanguageSwitcher: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang, setLanguage } = useLanguageStore();

  const languages = [
    { code: 'EN', label: t('languages.english', currentLang) },
    { code: 'TR', label: t('languages.turkish', currentLang) },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80 transition-colors"
      >
        <FiGlobe className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{currentLang}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-32 rounded-lg border bg-background/95 backdrop-blur-sm shadow-lg z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'EN' | 'TR');
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-secondary/50 transition-colors ${
                  currentLang === lang.code ? 'text-primary bg-secondary/30' : 'text-foreground'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher'; 