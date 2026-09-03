'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ParisClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    function updateClock() {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/Paris',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        setTime(formatter.format(new Date()))
      } catch {
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      }
    }

    updateClock()
    const interval = setInterval(updateClock, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:text-foreground',
        className
      )}
      title="Current local time in Paris, France (CET/CEST)"
    >
      <span className="relative flex size-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
      </span>
      <span>
        {time ? (
          <span className="font-medium text-foreground">{time}</span>
        ) : (
          <span className="opacity-60">--:--</span>
        )}{' '}
        in Paris, France
      </span>
    </div>
  )
}
