'use client'

import { useState, useRef, useEffect } from 'react'
import { File02Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { buttonVariants } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

interface ResumeDropdownProps {
  label: string
  className?: string
}

export function ResumeDropdown({ label, className }: ResumeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'secondary' }), 'gap-1.5 cursor-pointer', className)}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Icon icon={File02Icon} />
        <span>{label}</span>
        <Icon
          icon={ArrowDown01Icon}
          className={cn('size-3.5 opacity-70 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      <div
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!isOpen}
        className={cn(
          'absolute left-0 top-full mt-1.5 z-50 min-w-[190px] rounded-md border border-border bg-popover text-popover-foreground shadow-md p-1 outline-none transition-all duration-100',
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto visible'
            : 'opacity-0 scale-95 pointer-events-none invisible'
        )}
      >
        <a
          href="/resume-en.pdf"
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-between gap-3 px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors hover:bg-muted text-foreground cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-muted text-foreground border border-border/50">
              EN
            </span>
            <span>English (EN)</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono uppercase">PDF</span>
        </a>

        <a
          href="/resume-fr.pdf"
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-between gap-3 px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors hover:bg-muted text-foreground cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-muted text-foreground border border-border/50">
              FR
            </span>
            <span>Français (FR)</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono uppercase">PDF</span>
        </a>
      </div>
    </div>
  )
}
