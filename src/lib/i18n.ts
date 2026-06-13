import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import es from '@/locales/es.json';

export type Language = 'en' | 'ar' | 'es';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'AR', dir: 'rtl' },
  { code: 'es', label: 'ES', dir: 'ltr' },
];

const translations: Record<Language, typeof en> = { en, ar, es };

export function getTranslations(language: Language) {
  return translations[language] ?? translations.en;
}

export function getDirection(language: Language): 'ltr' | 'rtl' {
  return SUPPORTED_LANGUAGES.find((l) => l.code === language)?.dir ?? 'ltr';
}
