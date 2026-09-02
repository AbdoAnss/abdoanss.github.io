import { Suspense } from 'react'
import { FavouriteIcon, GitForkIcon } from '@hugeicons/core-free-icons'
import { Container } from '@/components/layout/Container'
import { Icon } from '@/components/ui/Icon'
import { TextLink } from '@/components/ui/TextLink'
import links from '@/data/links.json'
import { cn } from '@/lib/utils'
import { FooterYear } from './FooterYear'
import type { HTMLAttributes } from 'react'

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn('mt-auto border-t border-border/80', className)} {...props}>
      <Container
        className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row"
        variant="fluid"
      >
        <p className="group flex items-center gap-1.5">
          <span>
            &copy;{' '}
            <Suspense fallback={<span>2026</span>}>
              <FooterYear />
            </Suspense>{' '}
            Built with
          </span>
          <Icon
            className="size-3.5 shrink-0 fill-destructive text-destructive transition-transform will-change-transform group-hover:scale-125"
            icon={FavouriteIcon}
            aria-hidden={true}
          />
          <span>by Abdessamad</span>
        </p>

        <p className="inline-flex items-center gap-2">
          <span>This website is</span>
          <TextLink
            href={links.source}
            target="_blank"
            rel="noreferrer"
            icon={
              <Icon
                className="size-3.5 shrink-0 text-foreground"
                icon={GitForkIcon}
                aria-hidden={true}
              />
            }
          >
            open source
          </TextLink>
        </p>
      </Container>
    </footer>
  )
}
