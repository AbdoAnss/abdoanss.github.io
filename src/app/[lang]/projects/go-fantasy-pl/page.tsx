import { notFound } from 'next/navigation'
import { highlightCode } from '@/lib/syntax'
import { codeExamples } from '@/data/go-fantasy-code'
import { GoFantasyClient } from '@/app/projects/go-fantasy-pl/GoFantasyClient'
import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface LocalizedProjectPageProps {
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

export async function generateMetadata({ params }: LocalizedProjectPageProps): Promise<Metadata> {
  const { lang } = await params
  if (lang !== 'fr' && lang !== 'de') {
    return {}
  }

  return {
    title: 'go-fantasy-pl — Production-Grade Go SDK for Fantasy Premier League',
    description:
      'Comprehensive Go client for the official FPL API with typed models, token bucket rate limiting, asynchronous concurrency helpers, and pluggable Redis caching.',
    alternates: {
      canonical: `/${lang}/projects/go-fantasy-pl`,
    },
  }
}

export default async function LocalizedGoFantasyPLPage({ params }: LocalizedProjectPageProps) {
  const { lang } = await params
  if (lang !== 'fr' && lang !== 'de') {
    notFound()
  }
  const locale = lang as Locale

  const [basicHtml, liveHtml, asyncHtml, batchHtml] = await Promise.all([
    highlightCode(codeExamples.basic, 'go'),
    highlightCode(codeExamples.live, 'go'),
    highlightCode(codeExamples.async, 'go'),
    highlightCode(codeExamples.batch, 'go'),
  ])

  const highlightedCode = {
    basic: basicHtml,
    live: liveHtml,
    async: asyncHtml,
    batch: batchHtml,
  }

  return <GoFantasyClient highlightedCode={highlightedCode} locale={locale} />
}
