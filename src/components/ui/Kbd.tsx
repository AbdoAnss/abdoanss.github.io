import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export function Kbd({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        'font-mono pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm border border-border/60 bg-muted px-1.5 text-[10px] font-semibold text-muted-foreground select-none shadow-xs',
        className
      )}
      data-slot="kbd"
      {...props}
    >
      {children}
    </kbd>
  )
}
