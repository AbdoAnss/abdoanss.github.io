import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
}

export function PageTitle({ className, children, ...props }: PageTitleProps) {
  return (
    <h1
      className={cn('font-heading text-xl font-semibold text-foreground xs:text-2xl', className)}
      {...props}
    >
      {children}
    </h1>
  )
}
