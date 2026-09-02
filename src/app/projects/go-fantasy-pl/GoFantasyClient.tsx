'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft01Icon,
  GithubIcon,
  Copy01Icon,
  Tick01Icon,
  SparklesIcon,
  FlashIcon,
  Shield01Icon,
  DatabaseIcon,
  Award01Icon,
  PackageIcon,
} from '@hugeicons/core-free-icons'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { codeExamples } from '@/data/go-fantasy-code'
import { cn } from '@/lib/utils'

export interface ApiMethod {
  ns: string
  name: string
  description: string
  type: 'sync' | 'async'
}

export const apiMethods: ApiMethod[] = [
  // Bootstrap
  { ns: 'Bootstrap', name: 'GetTeams()', description: 'All teams in the current season (from bootstrap data)', type: 'sync' },
  { ns: 'Bootstrap', name: 'GetPlayers()', description: 'All players in the current season (from bootstrap data)', type: 'sync' },
  { ns: 'Bootstrap', name: 'GetGameWeeks()', description: 'All gameweeks / events in the current season', type: 'sync' },
  { ns: 'Bootstrap', name: 'GetCurrentGameWeek()', description: 'Current active gameweek ID', type: 'sync' },
  { ns: 'Bootstrap', name: 'GetSettings()', description: 'Global FPL game settings and rules', type: 'sync' },
  // Players
  { ns: 'Players', name: 'GetAllPlayers()', description: 'All players in the current season', type: 'sync' },
  { ns: 'Players', name: 'GetPlayer(id)', description: 'One player profile by player ID', type: 'sync' },
  { ns: 'Players', name: 'GetPlayerHistory(id)', description: 'Detailed gameweek history for one player', type: 'sync' },
  { ns: 'Players', name: 'GetAllPlayersAsync(ctx)', description: 'All players via async channel result', type: 'async' },
  { ns: 'Players', name: 'GetPlayerHistoryAsync(ctx, id)', description: 'One player history via async channel result', type: 'async' },
  { ns: 'Players', name: 'GetPlayerHistoriesBatch(ctx, ids)', description: 'Multiple player histories fetched concurrently', type: 'async' },
  // Teams
  { ns: 'Teams', name: 'GetAllTeams()', description: 'All teams in the current season', type: 'sync' },
  { ns: 'Teams', name: 'GetTeam(id)', description: 'One team by team ID', type: 'sync' },
  { ns: 'Teams', name: 'GetAllTeamsAsync(ctx)', description: 'All teams via async channel result', type: 'async' },
  // Fixtures
  { ns: 'Fixtures', name: 'GetAllFixtures()', description: 'All fixtures for the season', type: 'sync' },
  { ns: 'Fixtures', name: 'GetFixture(id)', description: 'One fixture by fixture ID', type: 'sync' },
  { ns: 'Fixtures', name: 'GetAllFixturesAsync(ctx)', description: 'All fixtures via async channel result', type: 'async' },
  // Managers
  { ns: 'Managers', name: 'GetManager(id)', description: 'Manager profile by manager ID', type: 'sync' },
  { ns: 'Managers', name: 'GetCurrentTeam(managerID)', description: 'Current gameweek picks for a manager', type: 'sync' },
  { ns: 'Managers', name: 'GetManagerHistory(id)', description: 'Manager historical season performance', type: 'sync' },
  // Leagues
  { ns: 'Leagues', name: 'GetClassicLeagueStandings(id, page)', description: 'Classic league standings for a specific page', type: 'sync' },
  { ns: 'Leagues', name: 'GetH2HLeagueMatches(id, page, event)', description: 'Paginated head-to-head match results (optional event filter)', type: 'sync' },
  { ns: 'Leagues', name: 'GetH2HLeagueStandings(id, page)', description: 'Head-to-head league standings for a page', type: 'sync' },
  { ns: 'Leagues', name: 'GetTotalPages(league)', description: 'Compute total standings pages', type: 'sync' },
  // Client
  { ns: 'Client', name: 'Get(endpoint)', description: 'Rate-limited GET returning the raw HTTP response', type: 'sync' },
  { ns: 'Client', name: 'GetContext(ctx, endpoint)', description: 'Rate-limited GET with caller cancellation via context', type: 'sync' },
  { ns: 'Client', name: 'GetRaw(endpoint)', description: 'Rate-limited GET returning the undecoded body (*StatusError for non-200s)', type: 'sync' },
]

export const namespaces = ['All', 'Bootstrap', 'Players', 'Teams', 'Fixtures', 'Managers', 'Leagues', 'Client']

export interface GoFantasyClientProps {
  highlightedCode: Record<'basic' | 'async' | 'batch', string>
}

export function GoFantasyClient({ highlightedCode }: GoFantasyClientProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'async' | 'batch'>('basic')
  const [selectedNs, setSelectedNs] = useState('All')
  const [copied, setCopied] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const copyInstall = () => {
    navigator.clipboard.writeText('go get github.com/AbdoAnss/go-fantasy-pl')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyCurrentCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab])
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const filteredMethods = selectedNs === 'All'
    ? apiMethods
    : apiMethods.filter((m) => m.ns === selectedNs)

  return (
    <Container className="py-12 space-y-12 max-w-3xl">
      {/* Back button */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          '-ml-3 gap-2 text-muted-foreground hover:text-foreground'
        )}
      >
        <Icon icon={ArrowLeft01Icon} className="size-4" />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="emerald" className="font-mono text-[10px]">
            Open Source SDK
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            Go 1.22+
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            v1.0.0
          </Badge>
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          go-fantasy-pl
        </h1>

        <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
          Production-grade Go SDK for the official Premier League Fantasy API. Featuring strongly typed data models, token-bucket rate limiting, non-blocking asynchronous concurrency, and pluggable multi-tier caching (in-memory &amp; Redis).
        </p>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={copyInstall}
            className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 font-mono text-xs text-foreground hover:border-foreground/40 transition-colors cursor-pointer"
          >
            <span className="text-muted-foreground select-none">$</span>
            <span>go get github.com/AbdoAnss/go-fantasy-pl</span>
            <Icon
              icon={copied ? Tick01Icon : Copy01Icon}
              className={cn('size-3.5 transition-colors', copied ? 'text-emerald-500' : 'text-muted-foreground group-hover:text-foreground')}
            />
          </button>

          <Link
            href="https://github.com/AbdoAnss/go-fantasy-pl"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
          >
            <Icon icon={GithubIcon} className="size-4" />
            <span>GitHub Repo</span>
          </Link>

          <Link
            href="https://pkg.go.dev/github.com/AbdoAnss/go-fantasy-pl"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
          >
            <span className="text-xs font-mono">pkg.go.dev</span>
          </Link>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="space-y-4">
        <h2 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase text-center">
          What you get
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5 space-y-2 hover:border-foreground/20 transition-colors">
            <Icon icon={SparklesIcon} className="size-5 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Typed Models</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strongly typed Go structs for all official FPL API endpoints &mdash; no manual JSON deserialization required.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2 hover:border-foreground/20 transition-colors">
            <Icon icon={FlashIcon} className="size-5 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Async Helpers</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Non-blocking helpers to fetch players, teams, and fixture matrices concurrently using Go channels.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2 hover:border-foreground/20 transition-colors">
            <Icon icon={Shield01Icon} className="size-5 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Rate Limiting</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Token bucket rate limiter prevents IP bans and 429 throttling under high-frequency workloads.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2 hover:border-foreground/20 transition-colors">
            <Icon icon={DatabaseIcon} className="size-5 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Pluggable Cache</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Zero-configuration in-memory cache out of the box, with built-in support to swap in Redis for distributed clusters.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2 hover:border-foreground/20 transition-colors">
            <Icon icon={Award01Icon} className="size-5 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Full API Coverage</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Bootstrap, player stats, fixtures, game settings, managers, classic leagues, and head-to-head match histories.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2 hover:border-foreground/20 transition-colors">
            <Icon icon={PackageIcon} className="size-5 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Simple Setup</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              One <code>client.NewClient()</code> call with sensible defaults and zero mandatory environment configuration.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start / Code Tabs */}
      <section id="quickstart" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Usage Examples
          </h2>
          <button
            onClick={copyCurrentCode}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-mono cursor-pointer transition-colors"
          >
            <Icon icon={copiedCode ? Tick01Icon : Copy01Icon} className={cn("size-3.5", copiedCode && "text-emerald-500")} />
            <span>{copiedCode ? 'Copied' : 'Copy code'}</span>
          </button>
        </div>

        <div className="flex gap-2">
          {(['basic', 'async', 'batch'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'cursor-pointer rounded-md px-3.5 py-1 text-xs font-mono transition-all',
                activeTab === tab
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'bg-muted/70 text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Shiki Highlighted Code Block */}
        <div
          className="rounded-lg border border-border overflow-hidden [&>pre]:!m-0 [&>pre]:!border-0"
          dangerouslySetInnerHTML={{ __html: highlightedCode[activeTab] }}
        />
      </section>

      {/* API Reference & Specification Table */}
      <section className="space-y-6">
        <div>
          <h2 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase text-center mb-2">
            API Reference & Specification
          </h2>
          <p className="text-xs text-muted-foreground text-center">
            Filter available client methods by domain namespace:
          </p>
        </div>

        {/* Namespace Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {namespaces.map((ns) => (
            <button
              key={ns}
              onClick={() => setSelectedNs(ns)}
              className={cn(
                'cursor-pointer rounded-sm border px-2.5 py-1 text-xs font-mono transition-colors',
                selectedNs === ns
                  ? 'border-primary bg-primary/10 text-primary font-medium'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              {ns}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/30 text-muted-foreground uppercase tracking-wider font-mono">
              <tr>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredMethods.map((m) => (
                <tr key={`${m.ns}-${m.name}`} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-foreground whitespace-nowrap">
                    <span className="text-primary mr-1">{m.ns}.</span>{m.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{m.description}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={cn(
                      'rounded-xs px-1.5 py-0.5 text-[10px] font-mono border',
                      m.type === 'sync'
                        ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5'
                        : 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5'
                    )}>
                      {m.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-muted-foreground/80 font-mono text-center">
          Note: Non-existent leagues return the <code>ErrLeagueNotFound</code> sentinel error, and invalid queries surface as <code>*ErrInvalidH2HQuery</code> for <code>errors.As</code> matching.
        </p>
      </section>

      {/* Caching Architecture */}
      <section className="space-y-4">
        <h2 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase text-center">
          Caching Architecture
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <h3 className="font-heading text-sm font-semibold text-foreground">In-Memory (Default)</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Thread-safe TTL memory store. Zero dependencies, immediate speedup, perfect for scripts, worker processes, and CLI utilities.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <h3 className="font-heading text-sm font-semibold text-foreground">Redis Client</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Plug in any standard Redis connection to share cached FPL responses across multiple distributed servers and scheduled jobs.
            </p>
          </div>
        </div>
      </section>
    </Container>
  )
}
