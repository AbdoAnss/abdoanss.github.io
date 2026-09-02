import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderTitle,
} from '@/components/layout/SectionHeader'
import { Card, CardTitle } from '@/components/ui/Card'
import experiences from '@/data/experiences.json'
import { getDictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export interface HomeExperienceProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

export function HomeExperience({ locale = 'en', ...props }: HomeExperienceProps) {
  const dict = getDictionary(locale)

  return (
    <section {...props}>
      <SectionHeader>
        <SectionHeaderTitle>{dict.experience.title}</SectionHeaderTitle>
        <SectionHeaderText>
          {dict.experience.subtitle}
        </SectionHeaderText>
      </SectionHeader>

      <div className="space-y-4">
        {experiences.map((exp) => {
          const loc = exp.locales[locale] || exp.locales.en

          return (
            <Card key={exp.id} className="p-5 sm:p-6 transition-all">
              <div className="flex items-start gap-4">
                {/* Logo Column */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 p-2 overflow-hidden shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className={cn(
                      'size-full object-contain',
                      exp.id === 'ciems' && 'dark:brightness-0 dark:invert'
                    )}
                  />
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <CardTitle className="text-base font-semibold text-foreground">
                      {loc.title}
                    </CardTitle>

                    <time className="font-mono text-xs text-muted-foreground shrink-0">
                      {loc.period}
                    </time>
                  </div>

                  <p className="text-xs font-medium text-foreground/80">
                    {exp.company} &bull; <span className="text-muted-foreground">{loc.location}</span>
                  </p>

                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty pt-1">
                    {loc.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
