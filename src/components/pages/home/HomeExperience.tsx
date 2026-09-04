'use client'

import { useState } from 'react'
import {
  SiSpringboot,
  SiPython,
  SiCelery,
  SiRedis,
  SiDjango,
  SiPandas,
  SiJenkins,
  SiPydantic,
  SiSap,
  SiSonar,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderTitle,
} from '@/components/layout/SectionHeader'
import { Card, CardTitle } from '@/components/ui/Card'
import { AccordionFace } from '@/components/ui/AccordionFace'
import experiences from '@/data/experiences.json'
import { getDictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export interface HomeExperienceProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

const skillIcons: Record<string, ReactNode> = {
  Java: <FaJava className="size-3 text-[#ED8B00]" />,
  'Spring Boot': <SiSpringboot className="size-3 text-[#6DB33F]" />,
  Python: <SiPython className="size-3 text-[#3776AB]" />,
  Redis: <SiRedis className="size-3 text-[#FF4438]" />,
  'SAP BTP': <SiSap className="size-3 text-[#008FD3]" />,
  'S/4HANA': <SiSap className="size-3 text-[#008FD3]" />,
  SonarQube: <SiSonar className="size-3 text-[#4C9BD4]" />,
  Pydantic: <SiPydantic className="size-3 text-[#E92063]" />,
  Jenkins: <SiJenkins className="size-3 text-[#D24939]" />,
  Django: <SiDjango className="size-3 text-[#092E20] dark:text-[#44B78B]" />,
  Celery: <SiCelery className="size-3 text-[#37814A]" />,
  Pandas: <SiPandas className="size-3 text-[#150458] dark:text-[#E70488]" />,
}

export function HomeExperience({ locale = 'en', ...props }: HomeExperienceProps) {
  const dict = getDictionary(locale)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section {...props}>
      <SectionHeader>
        <SectionHeaderTitle>{dict.experience.title}</SectionHeaderTitle>
        <SectionHeaderText>{dict.experience.subtitle}</SectionHeaderText>
      </SectionHeader>

      <div className="space-y-4">
        {experiences.map((exp) => {
          const loc = exp.locales[locale as keyof typeof exp.locales] || exp.locales.en
          const isExpanded = expandedId === exp.id

          return (
            <Card
              key={exp.id}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onClick={() => toggleAccordion(exp.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleAccordion(exp.id)
                }
              }}
              className={cn(
                'group/card p-5 sm:p-6 transition-all duration-200 cursor-pointer select-none',
                'hover:border-foreground/30 hover:bg-muted/15 active:scale-[0.995]',
                isExpanded && 'border-primary/50 bg-muted/10 shadow-xs'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Logo Column */}
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 p-2 overflow-hidden shadow-2xs">
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
                      <AccordionFace isOpen={isExpanded} />
                    </div>

                    <time className="font-mono text-xs text-muted-foreground shrink-0">
                      {loc.period}
                    </time>
                  </div>

                  <p className="text-xs font-medium text-foreground/80">
                    {exp.company} &bull; <span className="text-muted-foreground">{loc.location}</span>
                  </p>

                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty pt-0.5">
                    {loc.description}
                  </p>

                  {/* Collapsed Preview: subtle tags with "+ N more", hidden when expanded */}
                  {!isExpanded && exp.skills && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {exp.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded-xs bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground border border-border/40"
                        >
                          {skillIcons[skill] && <span className="shrink-0">{skillIcons[skill]}</span>}
                          <span>{skill}</span>
                        </span>
                      ))}
                      {exp.skills.length > 4 && (
                        <span className="font-mono text-[10px] text-muted-foreground/70">
                          +{exp.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Expanded Accordion Section */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-border/60 mt-3 space-y-3.5 animate-in fade-in slide-in-from-top-1 duration-150">
                      {loc.highlights && loc.highlights.length > 0 && (
                        <ul className="space-y-1.5 text-xs text-foreground/85 leading-relaxed">
                          {loc.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary select-none mt-0.5">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Full Styled Tech Stack in Expanded View */}
                      {exp.skills && (
                        <div className="pt-1.5 border-t border-border/30">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1.5 rounded-sm border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-muted"
                              >
                                {skillIcons[skill] && <span className="shrink-0">{skillIcons[skill]}</span>}
                                <span>{skill}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
