// ============================================================
// Shared TypeScript types for the ETS VN data layer
// Swap these interfaces when migrating to a CMS API
// ============================================================

export interface Service {
  id: string
  slug: string
  icon: string
  title: string
  shortDescription: string
  description: string
  features: string[]
  color: string
}

export interface Project {
  id: string
  slug: string
  title: string
  client: string
  location: string
  category: string
  categoryLabel: string
  capacity: string
  year: string
  image: string
  shortDescription: string
  description: string
  tags: string[]
  featured: boolean
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  categoryLabel: string
  image: string
  publishedAt: string
  readingTime: string
  featured: boolean
  tags: string[]
}

export interface Partner {
  id: string
  name: string
  logo: string
  website: string
}

export interface SiteConfig {
  company: {
    name: string
    fullName: string
    slogan: string
    description: string
    phone: string
    zaloPhone: string
    email: string
    address: string
    taxCode: string
    founded: string
    logo: string
    teamImage?: string
    website: string
    facebook: string
    zalo: string
  }
  seo: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
    siteUrl: string
    ogImage: string
  }
  stats: { value: string; label: string }[]
  nav: { label: string; href: string }[]
  heroSlides?: { id: string; image: string }[]
}
