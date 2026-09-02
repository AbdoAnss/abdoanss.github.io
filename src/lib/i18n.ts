import en from '@/data/i18n/en.json'
import fr from '@/data/i18n/fr.json'
import de from '@/data/i18n/de.json'

export type Locale = 'en' | 'fr' | 'de'

export const locales: Locale[] = ['en', 'fr', 'de']
export const defaultLocale: Locale = 'en'

export const dictionaries = {
  en,
  fr,
  de,
}

export type Dictionary = typeof en

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale] || dictionaries.en
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(fr|de)/, '') || '/'
  if (locale === 'en') {
    return cleanPath
  }
  return cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`
}
