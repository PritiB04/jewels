'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language, getDirection } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    // Update document direction for RTL support
    if (typeof document !== 'undefined') {
      document.documentElement.dir = getDirection(lang);
      document.documentElement.lang = lang;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
