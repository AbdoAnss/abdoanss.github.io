import { highlightCode } from '@/lib/syntax'
import { codeExamples } from '@/data/go-fantasy-code'
import { GoFantasyClient } from './GoFantasyClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'go-fantasy-pl — Production-Grade Go SDK for Fantasy Premier League',
  description:
    'Comprehensive Go client for the official FPL API with typed models, token bucket rate limiting, asynchronous concurrency helpers, and pluggable Redis caching.',
}

export default async function GoFantasyPLPage() {
  const [basicHtml, asyncHtml, batchHtml] = await Promise.all([
    highlightCode(codeExamples.basic, 'go'),
    highlightCode(codeExamples.async, 'go'),
    highlightCode(codeExamples.batch, 'go'),
  ])

  const highlightedCode = {
    basic: basicHtml,
    async: asyncHtml,
    batch: batchHtml,
  }

  return <GoFantasyClient highlightedCode={highlightedCode} />
}
