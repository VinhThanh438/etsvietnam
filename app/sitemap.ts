import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/data/projects'
import { getNews } from '@/lib/data/news'
import { getServices } from '@/lib/data/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://etsvietnam.vn'
  const [projects, articles, services] = await Promise.all([
    getProjects(),
    getNews(),
    getServices(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/dich-vu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/du-an`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tin-tuc`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/lien-he`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/du-an/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const newsPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/tin-tuc/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/dich-vu/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...projectPages, ...newsPages, ...servicePages]
}
