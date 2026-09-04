'use client'

import { cn } from '@/lib/utils'

export interface AccordionFaceProps {
  isOpen: boolean
  className?: string
}

/**
 * Two spinning dots that bloom into the clean Dribbble smile face:
 * - Closed: Two quiet dots in neutral gray that spin 180° on card hover.
 * - Clicked / Open: A 360° spin with spring easing, blooming into the clean curved smile in brand color.
 * - Collapsing: The smile retracts smoothly and the dots spin back to resting position.
 */
export function AccordionFace({ isOpen, className }: AccordionFaceProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        'size-4 sm:size-4.5 shrink-0 overflow-visible select-none transition-colors duration-300',
        isOpen
          ? 'text-primary'
          : 'text-muted-foreground/60 group-hover/card:text-foreground/80',
        className
      )}
      aria-hidden="true"
    >
      <g
        className={cn(
          'transition-all duration-550 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center',
          isOpen
            ? 'rotate-[345deg] scale-105'
            : 'rotate-0 scale-100 group-hover/card:rotate-180'
        )}
      >
        {/* Left Dot / Eye */}
        <circle
          cx="0"
          cy="0"
          r="7.5"
          fill="currentColor"
          className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: isOpen
              ? 'translate(28px, 24px)'
              : 'translate(35px, 50px)',
          }}
        />

        {/* Right Dot / Eye */}
        <circle
          cx="0"
          cy="0"
          r="7.5"
          fill="currentColor"
          className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: isOpen
              ? 'translate(72px, 24px)'
              : 'translate(65px, 50px)',
          }}
        />

        {/* Clean Semicircle Smile Mouth Arc */}
        <path
          d="M 20 48 A 30 30 0 0 0 80 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          className={cn(
            'transition-all duration-450 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-[50px_58px]',
            isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
          )}
        />
      </g>
    </svg>
  )
}
