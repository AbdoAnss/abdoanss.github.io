import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderTitle,
} from '@/components/layout/SectionHeader'
import {
  SiGo,
  SiSpringboot,
  SiPython,
  SiCelery,
  SiPostgresql,
  SiRedis,
  SiNodedotjs,
  SiTypescript,
  SiDocker,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiLinux,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import { getDictionary, type Locale } from '@/lib/i18n'
import type { HTMLAttributes, ReactNode } from 'react'

interface TechItem {
  name: string
  icon: ReactNode
}

const techItems: TechItem[] = [
  { name: 'Go', icon: <SiGo className="size-3.5 text-[#00ADD8]" /> },
  { name: 'Java', icon: <FaJava className="size-3.5 text-[#ED8B00]" /> },
  { name: 'Spring Boot', icon: <SiSpringboot className="size-3.5 text-[#6DB33F]" /> },
  { name: 'Python', icon: <SiPython className="size-3.5 text-[#3776AB]" /> },
  { name: 'Postgres', icon: <SiPostgresql className="size-3.5 text-[#4169E1]" /> },
  { name: 'Redis', icon: <SiRedis className="size-3.5 text-[#FF4438]" /> },
  { name: 'Celery', icon: <SiCelery className="size-3.5 text-[#37814A]" /> },
  { name: 'Node', icon: <SiNodedotjs className="size-3.5 text-[#5FA04E]" /> },
  { name: 'TypeScript', icon: <SiTypescript className="size-3.5 text-[#3178C6]" /> },
  { name: 'Docker', icon: <SiDocker className="size-3.5 text-[#2496ED]" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="size-3.5 text-foreground" /> },
  { name: 'React', icon: <SiReact className="size-3.5 text-[#61DAFB]" /> },
  { name: 'Tailwind', icon: <SiTailwindcss className="size-3.5 text-[#06B6D4]" /> },
  { name: 'Linux', icon: <SiLinux className="size-3.5 text-[#FCC624]" /> },
]

export interface HomeTechStackProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

export function HomeTechStack({ locale = 'en', ...props }: HomeTechStackProps) {
  const dict = getDictionary(locale)

  return (
    <section {...props}>
      <SectionHeader>
        <SectionHeaderTitle>{dict.tech_stack.title}</SectionHeaderTitle>
        <SectionHeaderText>
          {dict.tech_stack.subtitle}
        </SectionHeaderText>
      </SectionHeader>

      <ul className="flex flex-wrap items-center gap-2">
        {techItems.map((item) => (
          <li key={item.name}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-mono text-foreground shadow-2xs hover:border-foreground/25 hover:bg-muted/50 transition-colors">
              <span className="shrink-0 flex items-center justify-center">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
