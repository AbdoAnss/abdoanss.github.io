import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { HomeContact } from '@/components/pages/home/HomeContact'
import { HomeEducation } from '@/components/pages/home/HomeEducation'
import { HomeExperience } from '@/components/pages/home/HomeExperience'
import { HomeHero } from '@/components/pages/home/HomeHero'
import { HomePosts } from '@/components/pages/home/HomePosts'
import { HomeProjects } from '@/components/pages/home/HomeProjects'
import { HomeSocials } from '@/components/pages/home/HomeSocials'
import { HomeTechStack } from '@/components/pages/home/HomeTechStack'
import { type Locale, getDictionary } from '@/lib/i18n'
import type { Metadata } from 'next'

interface LangPageProps {
  params: Promise<{
    lang: string
  }>
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'de' },
  ]
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
  const { lang } = await params
  if (lang !== 'fr' && lang !== 'de') {
    return {}
  }
  const dict = getDictionary(lang as Locale)

  return {
    title: `${dict.hero.name} — ${dict.hero.location}`,
    description: dict.hero.intro,
    alternates: {
      canonical: `/${lang}`,
    },
  }
}

export default async function LocalizedHomePage({ params }: LangPageProps) {
  const { lang } = await params
  if (lang !== 'fr' && lang !== 'de') {
    notFound()
  }
  const locale = lang as Locale

  return (
    <Container className="space-y-12">
      <HomeHero locale={locale} />
      <HomeTechStack locale={locale} />
      <HomeExperience locale={locale} />
      <HomeEducation locale={locale} />
      <HomeProjects locale={locale} />
      <HomePosts locale={locale} />
      <HomeSocials locale={locale} />
      <HomeContact locale={locale} />
    </Container>
  )
}
