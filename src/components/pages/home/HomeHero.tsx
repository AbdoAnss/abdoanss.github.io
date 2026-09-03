import Link from 'next/link'
import { Mail01Icon, GithubIcon, File02Icon } from '@hugeicons/core-free-icons'
import { IconFlagFrance } from '@/components/icons/IconFlagFrance'
import { PageTitle } from '@/components/layout/PageTitle'
import { buttonVariants } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import links from '@/data/links.json'
import { TypewriterAvailability } from './TypewriterAvailability'
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
        {dict.hero.greeting}{' '}
        <span className="underline decoration-wavy decoration-primary underline-offset-6 decoration-[2px]">
          {dict.hero.name}
        </span>
        !
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

        <TypewriterAvailability text={dict.hero.availability} />
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
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon={File02Icon} />
          {dict.hero.resume}
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
