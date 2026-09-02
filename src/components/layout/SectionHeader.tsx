import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export function SectionHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function SectionHeaderTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'font-heading text-xs font-semibold tracking-wider text-foreground uppercase',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function SectionHeaderText({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-1.5 text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}
