import Link from 'next/link'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { Card, CardContent, CardHeader, CardIndicator, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/lib/posts'

export function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader>
        <time className="font-mono text-xs text-muted-foreground" dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>

        <CardTitle>
          <Link className="after:absolute after:inset-0 hover:underline" href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="line-clamp-2">
        <p>{post.summary}</p>
      </CardContent>

      <CardIndicator>
        <Icon icon={ArrowRight01Icon} />
      </CardIndicator>
    </Card>
  )
}
