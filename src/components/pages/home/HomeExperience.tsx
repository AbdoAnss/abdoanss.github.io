'use client'

import { useEffect, useState } from 'react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderTitle,
} from '@/components/layout/SectionHeader'
import { Card, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import experiences from '@/data/experiences.json'
import { getDictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export interface HomeExperienceProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

type ExperienceItem = (typeof experiences)[number]

export function HomeExperience({ locale = 'en', ...props }: HomeExperienceProps) {
  const dict = getDictionary(locale)
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null)

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedExp(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedExp])

  const selectedLoc = selectedExp
    ? selectedExp.locales[locale as keyof typeof selectedExp.locales] || selectedExp.locales.en
    : null

  return (
    <section {...props}>
      <SectionHeader>
        <SectionHeaderTitle>{dict.experience.title}</SectionHeaderTitle>
        <SectionHeaderText>{dict.experience.subtitle}</SectionHeaderText>
      </SectionHeader>

      <div className="space-y-4">
        {experiences.map((exp) => {
          const loc = exp.locales[locale as keyof typeof exp.locales] || exp.locales.en

          return (
            <Card
              key={exp.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedExp(exp)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedExp(exp)
                }
              }}
              className={cn(
                'group/card p-5 sm:p-6 transition-all duration-150 cursor-pointer select-none',
                'hover:border-foreground/30 hover:bg-muted/15 active:scale-[0.995]'
              )}
            >
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
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-semibold text-foreground group-hover/card:text-primary transition-colors">
                        {loc.title}
                      </CardTitle>
                      <span className="text-[10px] font-mono text-muted-foreground opacity-60 transition-transform group-hover/card:translate-x-0.5 group-hover/card:opacity-100">
                        ↗
                      </span>
                    </div>

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

                  {/* Tech stack badges preview */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                      {exp.skills.length > 4 && (
                        <span className="rounded-sm bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                          +{exp.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Experience Popup Modal (Daniel White style) */}
      {selectedExp && selectedLoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exp-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedExp(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-150 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 p-2 overflow-hidden shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedExp.logo}
                    alt={selectedExp.company}
                    className={cn(
                      'size-full object-contain',
                      selectedExp.id === 'ciems' && 'dark:brightness-0 dark:invert'
                    )}
                  />
                </div>
                <div>
                  <h3 id="exp-modal-title" className="text-base font-semibold text-foreground">
                    {selectedLoc.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {selectedExp.fullCompany || selectedExp.company} &bull; {selectedLoc.location}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                aria-label="Close dialog"
                className="cursor-pointer rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon icon={Cancel01Icon} className="size-4" />
              </button>
            </div>

            {/* Period & Status */}
            <div className="flex items-center justify-between border-y border-border/60 py-2.5 font-mono text-xs text-muted-foreground">
              <span>{selectedLoc.period}</span>
              <span className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'size-1.5 rounded-full',
                    selectedExp.statusVariant === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
                  )}
                />
                <span className="text-foreground">{selectedLoc.status}</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selectedLoc.description}
            </p>

            {/* Highlights */}
            {selectedLoc.highlights && selectedLoc.highlights.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  {locale === 'fr' ? 'Missions & Réalisations' : locale === 'de' ? 'Schwerpunkte & Beiträge' : 'Key Focus & Contributions'}
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground list-disc pl-4 leading-relaxed">
                  {selectedLoc.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills / Stack */}
            {selectedExp.skills && (
              <div className="space-y-1.5 pt-1">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  {locale === 'de' ? 'Technologien' : 'Technologies'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border/80 bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                className="cursor-pointer rounded-md border border-border bg-secondary px-4 py-1.5 font-mono text-xs font-medium text-foreground transition-all hover:bg-muted active:scale-95"
              >
                {locale === 'fr' ? 'Fermer' : locale === 'de' ? 'Schließen' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
