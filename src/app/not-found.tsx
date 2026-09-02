import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { PageTitle } from '@/components/layout/PageTitle'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <Container>
      <div className="space-y-4 text-center py-12">
        <PageTitle>404 — Page Not Found</PageTitle>
        <p className="text-muted-foreground text-sm">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div>
          <Link href="/" className={cn(buttonVariants({ variant: 'secondary' }))}>
            Back to home
          </Link>
        </div>
      </div>
    </Container>
  )
}
