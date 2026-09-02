import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'wide' | 'fluid'
  children?: ReactNode
}

export function Container({ className, variant = 'default', children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-8',
        variant === 'default' && 'max-w-176', // 44rem = 704px like hudovich.com
        variant === 'wide' && 'max-w-7xl',
        className
      )}
      data-slot="container"
      data-variant={variant}
      {...props}
    >
      {children}
    </div>
  )
}
