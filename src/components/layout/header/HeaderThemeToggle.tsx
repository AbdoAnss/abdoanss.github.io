'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { useHotkey } from '@tanstack/react-hotkeys'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export function HeaderThemeToggle({ className, ...props }: ComponentProps<typeof Button>) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  useHotkey('T', () => {
    toggleTheme()
  })

  if (!mounted) {
    return (
      <Button
        className={cn('size-8 opacity-0 pointer-events-none', className)}
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        {...props}
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn('size-8 text-foreground hover:bg-muted transition-colors', className)}
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            {...props}
          >
            <span className="sr-only">Toggle theme</span>
            {resolvedTheme === 'dark' ? (
              <Icon className="size-4" icon={Sun03Icon} />
            ) : (
              <Icon className="size-4" icon={Moon02Icon} />
            )}
          </Button>
        }
      />
      <TooltipContent>
        Toggle theme <Kbd>T</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
