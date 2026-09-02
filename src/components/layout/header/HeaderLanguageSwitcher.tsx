'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale, getLocalizedPath } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const languageOptions: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
]

export function HeaderLanguageSwitcher() {
  const pathname = usePathname() || '/'

  const currentLocale: Locale = pathname.startsWith('/fr')
    ? 'fr'
    : pathname.startsWith('/de')
      ? 'de'
      : 'en'

  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5 text-xs font-mono"
      role="group"
      aria-label="Language Switcher"
    >
      {languageOptions.map((lang) => {
        const isActive = currentLocale === lang.code
        const targetHref = getLocalizedPath(pathname, lang.code)

        return (
          <Link
            key={lang.code}
            href={targetHref}
            className={cn(
              'rounded-xs px-1.5 py-0.5 font-medium transition-colors',
              isActive
                ? 'bg-background text-foreground shadow-2xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-current={isActive ? 'true' : undefined}
          >
            {lang.label}
          </Link>
        )
      })}
    </div>
  )
}
