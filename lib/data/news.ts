import type { NewsArticle } from '@/lib/types'
import fs from 'fs'
import path from 'path'

function readNews(): NewsArticle[] {
  const filePath = path.join(process.cwd(), 'data', 'news.json')
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as NewsArticle[]
}

export async function getNews(): Promise<NewsArticle[]> {
  return readNews().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getFeaturedNews(): Promise<NewsArticle[]> {
  return readNews().filter((n) => n.featured)
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  return readNews().find((n) => n.slug === slug)
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  return readNews().filter((n) => n.category === category)
}

export async function getNewsByTag(tag: string): Promise<NewsArticle[]> {
  const normalizedTag = tag.toLowerCase()
  return readNews()
    .filter((n) => n.tags.some((t) => t.toLowerCase() === normalizedTag))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getAllTags(): Promise<string[]> {
  const tagSet = new Set<string>()
  readNews().forEach((n) => n.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}
