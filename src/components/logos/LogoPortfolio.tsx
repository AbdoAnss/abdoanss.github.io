import type { SVGProps } from 'react'

export function LogoPortfolio(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 8 3 3-3 3" />
      <path d="M14 15h2" />
    </svg>
  )
}
