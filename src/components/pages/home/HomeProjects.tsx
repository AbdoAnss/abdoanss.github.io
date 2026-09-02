import Link from 'next/link'
import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderTitle,
} from '@/components/layout/SectionHeader'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardIndicator, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import projectsData from '@/data/projects.json'
import { getDictionary, getLocalizedPath, type Locale } from '@/lib/i18n'
import { SiGo, SiNextdotjs } from 'react-icons/si'
import type { HTMLAttributes } from 'react'

const projectIcons: Record<string, React.ReactNode> = {
  'go-fantasy-pl': <SiGo className="size-4 text-[#00ADD8]" />,
  'Portfolio Website': <SiNextdotjs className="size-4 text-foreground" />,
}

export interface HomeProjectsProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

export function HomeProjects({ locale = 'en', ...props }: HomeProjectsProps) {
  const dict = getDictionary(locale)

  return (
    <section className="@container/projects" {...props}>
      <SectionHeader>
        <SectionHeaderTitle>{dict.projects.title}</SectionHeaderTitle>
        <SectionHeaderText>
          {dict.projects.subtitle}
        </SectionHeaderText>
      </SectionHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        {projectsData.map((project) => {
          const loc = project.locales[locale] || project.locales.en
          const linkHref = project.isInternal
            ? getLocalizedPath(project.link, locale)
            : project.link

          return (
            <Card key={project.name}>
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/50">
                    {projectIcons[project.name] || <SiNextdotjs className="size-4 text-foreground" />}
                  </div>

                  <CardTitle>
                    {linkHref ? (
                      <Link
                        className="after:absolute after:inset-0 hover:underline"
                        href={linkHref}
                        target={project.isInternal ? undefined : '_blank'}
                        rel={project.isInternal ? undefined : 'noreferrer'}
                      >
                        {project.name}
                      </Link>
                    ) : (
                      project.name
                    )}
                  </CardTitle>

                  <Badge variant={project.statusVariant as BadgeVariant} size="sm">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p>{loc.description}</p>
              </CardContent>

              {linkHref && (
                <CardIndicator>
                  <Icon icon={LinkSquare02Icon} />
                </CardIndicator>
              )}
            </Card>
          )
        })}
      </div>
    </section>
  )
}
