import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Logo } from '@/components/logos/Logo'
import { HeaderLanguageSwitcher } from './HeaderLanguageSwitcher'
import { HeaderThemeToggle } from './HeaderThemeToggle'
import type { HTMLAttributes } from 'react'

export function Header(props: HTMLAttributes<HTMLElement>) {
  return (
    <header {...props}>
      <Container className="flex h-18 items-center justify-between" variant="fluid">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm py-1"
          aria-label="Home"
        >
          <Logo className="size-5 shrink-0 text-primary transition-transform group-hover:scale-105" />
          <span className="font-heading text-lg font-bold tracking-wider text-foreground">
            AA
          </span>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <nav>
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href="/posts"
                  className="rounded px-2.5 py-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  Posts
                </Link>
              </li>
            </ul>
          </nav>

          <HeaderLanguageSwitcher />
          <HeaderThemeToggle />
        </div>
      </Container>
    </header>
  )
}
