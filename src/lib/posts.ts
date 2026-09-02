import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export interface Post {
  slug: string
  title: string
  publishedAt: string
  summary: string
  tags?: string[]
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        title: (matterResult.data.title as string) || slug,
        publishedAt: (matterResult.data.date as string) || new Date().toISOString().split('T')[0],
        summary: (matterResult.data.summary as string) || (matterResult.data.description as string) || '',
        tags: (matterResult.data.tags as string[]) || [],
        content: matterResult.content,
      }
    })

  return allPostsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      title: (matterResult.data.title as string) || slug,
      publishedAt: (matterResult.data.date as string) || new Date().toISOString().split('T')[0],
      summary: (matterResult.data.summary as string) || (matterResult.data.description as string) || '',
      tags: (matterResult.data.tags as string[]) || [],
      content: matterResult.content,
    }
  } catch {
    return null
  }
}
