'use client'

import { useState } from 'react'
import { Copy01Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

const PROFILE_MARKDOWN = `# Abdessamad Anssem
Backend Software Engineer | Paris, France
- Website: https://abdoanss.github.io/
- GitHub: https://github.com/AbdoAnss
- LinkedIn: https://www.linkedin.com/in/abdoanss/
- Email: abdessamad.anssem@gmail.com

## Summary
Backend-focused software engineer working on systems, developer experience, and clear product surfaces. Specializing in high-throughput backend services, distributed systems, and API design.

## Core Tech Stack
- Languages: Go, Java, TypeScript, Python, SQL
- Backend & Cloud: Spring Boot, Celery, Redis, PostgreSQL, Docker, SAP BTP Cloud Foundry, Next.js
- Specializations: REST/JSON APIs, Concurrency, Asynchronous Queues, Distributed Systems

## Work Experience
1. SAP (04/2026 - Present) — Software Engineer Intern (Paris, France)
   - Joining the backend development team at SAP Labs France on Group Reporting Data Collection (GRDC) deployed on SAP BTP Cloud Foundry.
   - Building scalable backend workflows with Java, Spring Boot, and Node.js.

2. IUEM (09/2025 - 01/2026) — Software Engineer Intern (Brest, France)
   - Migrated the PyCoast oceanographic satellite analysis interface from Bokeh to Panel.
   - Designed interactive data visualization tools in close collaboration with marine researchers.

3. CIEMS (06/2024 - 08/2024) — Backend Developer Intern (Rabat, Morocco)
   - Engineered an insurance recommendation engine utilizing collaborative filtering, asynchronous Celery and Redis workflows, PostgreSQL, and high-throughput background queues.

## Education
- MSc Computer Science - Software Engineering (09/2025 - 09/2026)
  Université de Bretagne Occidentale (UBO), Brest, France

## Featured Projects
- go-fantasy-pl: Typed Go client for the Fantasy Premier League API with caching and rate limiting (https://github.com/AbdoAnss/go-fantasy-pl).
- abdoanss.github.io: Static export Next.js 16 personal website and engineering blog with dual-theme Shiki syntax highlighting (https://github.com/AbdoAnss/abdoanss.github.io).
`

export function CopyProfileButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PROFILE_MARKDOWN)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = PROFILE_MARKDOWN
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy developer profile as Markdown for LLM analysis"
      title="Copy profile Markdown (formatted for ChatGPT, Claude, or recruiter notes)"
      className={cn(
        'group inline-flex w-fit shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border font-mono text-xs font-medium whitespace-nowrap outline-0 transition-all duration-150',
        'h-6.5 gap-1.5 px-2.5 active:scale-95 select-none',
        copied
          ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shadow-xs'
          : 'border-border/60 bg-secondary text-secondary-foreground hover:border-border hover:bg-muted hover:text-foreground',
        className
      )}
    >
      <Icon
        icon={copied ? CheckmarkCircle02Icon : Copy01Icon}
        className={cn('size-3.5 shrink-0 transition-transform group-hover:scale-110', copied && 'text-emerald-500')}
      />
      <span>{copied ? 'Copied for LLM!' : 'Copy Profile (MD)'}</span>
    </button>
  )
}
