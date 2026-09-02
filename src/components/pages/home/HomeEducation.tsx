import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderTitle,
} from '@/components/layout/SectionHeader'
import { Card, CardTitle } from '@/components/ui/Card'
import educationList from '@/data/education.json'
import { getDictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export interface HomeEducationProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

export function HomeEducation({ locale = 'en', ...props }: HomeEducationProps) {
  const dict = getDictionary(locale)

  return (
    <section {...props}>
      <SectionHeader>
        <SectionHeaderTitle>{dict.education.title}</SectionHeaderTitle>
        <SectionHeaderText>
          {dict.education.subtitle}
        </SectionHeaderText>
      </SectionHeader>

      <div className="space-y-4">
        {educationList.map((edu) => {
          const loc = edu.locales[locale] || edu.locales.en

          return (
            <Card key={edu.id} className="p-5 sm:p-6 transition-all">
              <div className="flex items-start gap-4">
                {/* Logo Column */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 p-2 overflow-hidden shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className={cn(
                      'size-full object-contain',
                      edu.id === 'ubo' && 'dark:brightness-0 dark:invert'
                    )}
                  />
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <CardTitle className="text-base font-semibold text-foreground">
                      {loc.degree}
                    </CardTitle>

                    <time className="font-mono text-xs text-muted-foreground shrink-0">
                      {loc.period}
                    </time>
                  </div>

                  <p className="text-xs font-medium text-foreground/80">
                    {edu.institution} &bull; <span className="text-muted-foreground">{loc.location}</span>
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
