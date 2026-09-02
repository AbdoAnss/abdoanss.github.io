import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import { Container } from '@/components/layout/Container'
import { PageTitle } from '@/components/layout/PageTitle'
import { PostCard } from '@/components/posts/PostCard'
import { Icon } from '@/components/ui/Icon'
import { getAllPosts } from '@/lib/posts'
import { getDictionary, getLocalizedPath, type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface LocalizedPostsPageProps {
  params: Promise<{
    lang: string
  }>
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'de' },
  ]
}

export async function generateMetadata({ params }: LocalizedPostsPageProps): Promise<Metadata> {
  const { lang } = await params
  if (lang !== 'fr' && lang !== 'de') {
    return {}
  }
  const dict = getDictionary(lang as Locale)

  return {
    title: dict.posts.title,
    description: dict.posts.all_subtitle,
    alternates: {
      canonical: `/${lang}/posts`,
    },
  }
}

export default async function LocalizedPostsPage({ params }: LocalizedPostsPageProps) {
  const { lang } = await params
  if (lang !== 'fr' && lang !== 'de') {
    notFound()
  }
  const locale = lang as Locale
  const dict = getDictionary(locale)
  const posts = getAllPosts()

  return (
    <Container>
      <section>
        <div className="mb-6">
          <Link
            href={getLocalizedPath('/', locale)}
            className="group inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <Icon icon={ArrowLeft01Icon} className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>{dict.nav.back_home}</span>
          </Link>

          <PageTitle className="mb-2">{dict.posts.all_title}</PageTitle>
          <p className="text-sm text-muted-foreground">
            {dict.posts.all_subtitle}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="space-y-3.5">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </Container>
  )
}
