import Link from 'next/link'
import { Mail01Icon, GithubIcon } from '@hugeicons/core-free-icons'
import { IconFlagFrance } from '@/components/icons/IconFlagFrance'
import { PageTitle } from '@/components/layout/PageTitle'
import { buttonVariants } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import links from '@/data/links.json'
import { getDictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export interface HomeHeroProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

export function HomeHero({ locale = 'en', ...props }: HomeHeroProps) {
  const dict = getDictionary(locale)

  return (
    <section {...props}>
      <PageTitle className="mb-4">
        {dict.hero.greeting} <span className="border-b-[0.09375rem] border-primary">{dict.hero.name}</span>!
      </PageTitle>

      <div className="mb-6 space-y-2.5 leading-relaxed text-pretty text-foreground">
        <p>
          {dict.hero.location_prefix}&nbsp;{dict.hero.location}
          <IconFlagFrance
            className={cn(
              'ml-2 inline-block h-2.25 w-3.25 shrink-0 -translate-y-0.5 rounded-xs',
              'drop-shadow-[0_0_1px_rgba(0,0,0,0.2)]'
            )}
          />
        </p>

        <p className="text-muted-foreground">
          {dict.hero.intro}
        </p>

        <div className="pt-1.5">
          <Link
            href={`mailto:${links.email}`}
            className={cn(
              'group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-700 dark:text-emerald-300',
              'transition-all duration-200 hover:scale-[1.02] hover:border-emerald-500/40 hover:bg-emerald-500/15 active:scale-[0.98] select-none shadow-xs'
            )}
            title="Send an email to discuss projects"
          >
            {/* Animated background sweep on mount */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 origin-left rounded-full bg-emerald-500/20"
              style={{
                animation: 'tagSweep 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards',
                transform: 'scaleX(0)',
              }}
            />
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="relative z-10 font-medium">
              {dict.hero.availability}
            </span>
            <span
              aria-hidden="true"
              className="relative z-10 text-[11px] opacity-60 transition-transform duration-150 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          className={cn(buttonVariants({ variant: 'default' }))}
          href={`mailto:${links.email}`}
        >
          <Icon icon={Mail01Icon} />
          {dict.hero.send_email}
        </Link>

        <Link
          className={cn(buttonVariants({ variant: 'secondary' }))}
          href={links.social.github}
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon={GithubIcon} />
          {dict.hero.github}
        </Link>
      </div>
    </section>
  )
}
