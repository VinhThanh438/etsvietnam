/**
 * Data service: News
 * Reads from Supabase. Falls back to local JSON if Supabase is unreachable.
 */
import { supabase } from '@/lib/supabase'
import type { NewsArticle } from '@/lib/types'

function getFallback(): NewsArticle[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/data/news.json') as NewsArticle[]
  } catch {
    return []
  }
}

function rowToArticle(row: Record<string, unknown>): NewsArticle {
  const data = (row.data as Partial<NewsArticle>) ?? {}
  return {
    id: (row.id as string) ?? data.id ?? '',
    slug: (row.slug as string) ?? data.slug ?? '',
    title: (row.title as string) ?? data.title ?? '',
    excerpt: data.excerpt ?? '',
    content: data.content ?? '',
    author: data.author ?? '',
    category: (row.category as string) ?? data.category ?? '',
    categoryLabel: data.categoryLabel ?? '',
    image: data.image ?? '',
    publishedAt: (row.published_at as string) ?? data.publishedAt ?? '',
    readingTime: data.readingTime ?? '5 phút',
    featured: (row.featured as boolean) ?? data.featured ?? false,
    tags: data.tags ?? [],
  }
}

export async function getNews(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })

  if (error || !data) {
    console.warn('[news] Supabase error, using fallback:', error?.message)
    const fallback = getFallback()
    return fallback.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }
  return data.map(rowToArticle)
}

export async function getFeaturedNews(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false })

  if (error || !data) {
    return getFallback().filter((n) => n.featured)
  }
  return data.map(rowToArticle)
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return getFallback().find((n) => n.slug === slug)
  }
  return rowToArticle(data)
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (error || !data) {
    return getFallback().filter((n) => n.category === category)
  }
  return data.map(rowToArticle)
}

export async function getNewsByTag(tag: string): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .contains('data->tags', JSON.stringify([tag]))
    .order('published_at', { ascending: false })

  if (error || !data) {
    const normalizedTag = tag.toLowerCase()
    const fallback = getFallback()
    return fallback
      .filter((n) => n.tags.some((t) => t.toLowerCase() === normalizedTag))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }
  return data.map(rowToArticle)
}

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase.from('news').select('data')

  if (error || !data) {
    const tagSet = new Set<string>()
    getFallback().forEach((n) => n.tags.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }

  const tagSet = new Set<string>()
  data.forEach((row) => {
    const tags = (row.data as { tags?: string[] })?.tags ?? []
    tags.forEach((t) => tagSet.add(t))
  })
  return Array.from(tagSet).sort()
}
