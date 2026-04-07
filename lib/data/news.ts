import { cache } from 'react'
import type { NewsArticle } from '@/lib/types'
import newsData from '@/data/news.json'

const news = newsData as NewsArticle[]

export const getNews = cache(async (): Promise<NewsArticle[]> => {
  return news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
})

export const getFeaturedNews = cache(async (): Promise<NewsArticle[]> => {
  return news.filter((n) => n.featured)
})

export const getNewsBySlug = cache(async (slug: string): Promise<NewsArticle | undefined> => {
  return news.find((n) => n.slug === slug)
})

export const getNewsByCategory = cache(async (category: string): Promise<NewsArticle[]> => {
  return news.filter((n) => n.category === category)
})
