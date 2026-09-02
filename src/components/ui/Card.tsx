import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'group/card relative flex flex-col gap-2 overflow-hidden p-3.5 text-sm text-card-foreground',
        'rounded-md border border-border bg-card ring-3 ring-transparent transition-all outline-none',
        'hover:ring-ring/15 hover:border-foreground/20 focus-visible:ring-ring/50',
        className
      )}
      data-slot="card"
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 group-has-data-[slot=card-indicator]/card:pr-8', className)}
      data-slot="card-header"
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-heading text-base font-medium text-foreground', className)}
      data-slot="card-title"
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardIndicator({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'absolute top-3.5 right-3 transform-gpu text-muted-foreground/50 opacity-0 transition-opacity',
        'group-focus-within/card:opacity-100 group-hover/card:opacity-100 [&_svg]:size-4',
        className
      )}
      data-slot="card-indicator"
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-sm leading-relaxed text-muted-foreground', className)}
      data-slot="card-content"
      {...props}
    >
      {children}
    </div>
  )
}
