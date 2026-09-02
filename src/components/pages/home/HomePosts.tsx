import Link from 'next/link'
import { SectionHeader, SectionHeaderTitle } from '@/components/layout/SectionHeader'
import { PostCard } from '@/components/posts/PostCard'
import { getAllPosts } from '@/lib/posts'
import { getDictionary, getLocalizedPath, type Locale } from '@/lib/i18n'
import type { HTMLAttributes } from 'react'

export interface HomePostsProps extends HTMLAttributes<HTMLElement> {
  locale?: Locale
}

export function HomePosts({ locale = 'en', ...props }: HomePostsProps) {
  const posts = getAllPosts().slice(0, 3)
  const dict = getDictionary(locale)

  if (posts.length === 0) {
    return null
  }

  return (
    <section {...props}>
      <div className="flex items-center justify-between mb-4">
        <SectionHeader className="mb-0">
          <SectionHeaderTitle>{dict.posts.title}</SectionHeaderTitle>
        </SectionHeader>

        <Link
          href={getLocalizedPath('/posts', locale)}
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {dict.posts.view_all}
        </Link>
      </div>

      <div className="space-y-3.5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
