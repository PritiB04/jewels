'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDirection } from '@/lib/i18n';

export default function RootHtmlWrapper() {
  const { language } = useLanguage();

  useEffect(() => {
    const dir = getDirection(language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
