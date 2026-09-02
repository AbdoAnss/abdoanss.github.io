import { Container } from '@/components/layout/Container'
import { PageTitle } from '@/components/layout/PageTitle'
import { PostCard } from '@/components/posts/PostCard'
import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Technical articles, thoughts on backend engineering, and distributed systems.',
  alternates: {
    canonical: '/posts',
  },
}

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <Container>
      <section>
        <div className="mb-6">
          <PageTitle className="mb-2">All Posts</PageTitle>
          <p className="text-sm text-muted-foreground">
            Articles, system design notes, and software engineering deep-dives:
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
