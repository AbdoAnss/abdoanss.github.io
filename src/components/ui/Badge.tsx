import { cva, type VariantProps } from 'cva'
import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export const badgeVariants = cva({
  base: [
    'group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden',
    'rounded-full border border-transparent font-medium whitespace-nowrap outline-0 transition-all',
    'focus-visible:ring-3 focus-visible:ring-ring/50',
    '[&>svg]:pointer-events-none',
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-400',
    },
    size: {
      sm: 'h-5 gap-1 px-2 text-xs [&>svg]:size-3.5',
      md: 'h-6.5 gap-1.75 px-2.5 text-xs [&>svg]:size-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children?: ReactNode
}

export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} data-slot="badge" {...props}>
      {children}
    </span>
  )
}
