import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar03Icon, ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import { Container } from '@/components/layout/Container'
import { PageTitle } from '@/components/layout/PageTitle'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { renderMarkdown } from '@/lib/markdown'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url: `https://abdoanss.github.io/posts/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const htmlContent = await renderMarkdown(post.content)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    url: `https://abdoanss.github.io/posts/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Abdessamad Anssem',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Container>
        <article className="post">
          <div className="mb-6">
            <Link
              href="/posts"
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <Icon icon={ArrowLeft01Icon} className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to posts</span>
            </Link>

            <PageTitle className="mb-3">{post.title}</PageTitle>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5 text-muted-foreground" icon={Calendar03Icon} aria-hidden={true} />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="post leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </Container>
    </>
  )
}
