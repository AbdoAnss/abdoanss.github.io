import { cva, type VariantProps } from 'cva'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const buttonVariants = cva({
  base: [
    'group/button inline-flex shrink-0 items-center justify-center rounded border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-3 focus-visible:ring-ring/50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border-border bg-background hover:bg-muted',
      ghost: 'hover:bg-muted text-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-8 gap-2 px-3',
      sm: 'h-7 gap-1.5 px-2.5 text-xs',
      icon: 'size-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode
}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      data-slot="button"
      {...props}
    >
      {children}
    </button>
  )
}
