import { SectionHeader, SectionHeaderTitle } from '@/components/layout/SectionHeader'
import { TextLink } from '@/components/ui/TextLink'
import links from '@/data/links.json'
import { getDictionary, type Locale } from '@/lib/i18n'
import type { HTMLAttributes } from 'react'

export interface HomeContactProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

export function HomeContact({ locale = 'en', ...props }: HomeContactProps) {
  const dict = getDictionary(locale)

  return (
    <section {...props}>
      <SectionHeader>
        <SectionHeaderTitle>{dict.contact.title}</SectionHeaderTitle>
      </SectionHeader>

      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground text-pretty">
        <p>
          {dict.contact.text_prefix}{' '}
          <TextLink href={`mailto:${links.email}`} className="font-mono text-foreground">
            {links.email}
          </TextLink>
        </p>
        <p>
          {dict.contact.or_connect}{' '}
          <TextLink href={links.social.linkedin} target="_blank" rel="noreferrer" className="text-foreground">
            LinkedIn
          </TextLink>
        </p>
      </div>
    </section>
  )
}
