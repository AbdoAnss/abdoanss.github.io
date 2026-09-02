import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

export interface TextLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode
  icon?: ReactNode
}

export function TextLink({ className, children, icon, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        'group/text-link inline-flex items-center gap-1 font-medium text-foreground transition-colors',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'relative inline-block',
          'group-hover/text-link:after:h-0.5',
          'after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary after:transition-all'
        )}
      >
        {children}
      </span>
      {icon}
    </Link>
  )
}
