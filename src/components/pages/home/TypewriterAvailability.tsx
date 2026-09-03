'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import links from '@/data/links.json'

interface TypewriterAvailabilityProps {
  text: string
}

export function TypewriterAvailability({ text }: TypewriterAvailabilityProps) {
  const fullText = text
  const [displayedText, setDisplayedText] = useState(fullText)
  const [phase, setPhase] = useState<'holding' | 'deleting' | 'typing'>('holding')

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (phase === 'holding') {
      // Hold for 10 seconds after full text is shown
      timeout = setTimeout(() => {
        setPhase('deleting')
      }, 10000)
    } else if (phase === 'deleting') {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1))
        }, 28) // snappy erasing cadence
      } else {
        timeout = setTimeout(() => {
          setPhase('typing')
        }, 600) // brief pause before writing again
      }
    } else if (phase === 'typing') {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1))
        }, 50) // natural typing speed
      } else {
        setPhase('holding')
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, phase, fullText])

  return (
    <div className="pt-1 font-mono text-xs min-h-[1.5rem] flex items-center">
      <Link
        href={`mailto:${links.email}`}
        className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground select-none"
        title="Send an email to discuss projects"
      >
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"></span>
        </span>
        <span className="text-foreground/90 group-hover:text-foreground">
          {displayedText}
        </span>
        <span
          aria-hidden="true"
          className="inline-block w-[1.5px] h-3.5 bg-foreground/80 animate-pulse -ml-0.5"
        />
      </Link>
    </div>
  )
}
