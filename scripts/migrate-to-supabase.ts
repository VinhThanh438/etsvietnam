/**
 * migrate-to-supabase.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Reads all local JSON files and bulk-inserts them into Supabase tables.
 * Run ONCE after creating the database schema.
 *
 * Usage:
 *   npx ts-node --project tsconfig.json scripts/migrate-to-supabase.ts
 *
 * Or with tsx (faster):
 *   npx tsx scripts/migrate-to-supabase.ts
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set
 *     in .env.local  (or exported in your shell).
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'

// ── Load .env.local ───────────────────────────────────────────────────────
const envFile = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    if (key && !process.env[key]) {
      process.env[key] = rest.join('=').trim()
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

function readJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
}

// ── Type definitions (mirrors lib/types.ts) ───────────────────────────────

interface Project {
  id: string; slug: string; title: string; client: string; location: string
  category: string; categoryLabel: string; capacity: string; year: string
  image: string; shortDescription: string; description: string
  tags: string[]; featured: boolean
}
interface NewsArticle {
  id: string; slug: string; title: string; excerpt: string; content: string
  author: string; category: string; categoryLabel: string; image: string
  publishedAt: string; readingTime: string; featured: boolean; tags: string[]
}
interface Service {
  id: string; slug: string; icon: string; title: string; image?: string
  shortDescription: string; description: string; features: string[]; color: string
}
interface Partner { id: string; name: string; logo: string; website: string }

// ── Migrate helpers ───────────────────────────────────────────────────────

async function migrateProjects() {
  console.log('\n📦 Migrating projects...')
  const projects = readJson<Project[]>('projects.json')
  const rows = projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    category: p.category,
    featured: p.featured,
    data: {
      client: p.client,
      categoryLabel: p.categoryLabel,
      capacity: p.capacity,
      year: p.year,
      image: p.image,
      shortDescription: p.shortDescription,
      description: p.description,
      tags: p.tags,
    },
  }))

  const { error } = await supabase.from('projects').upsert(rows, { onConflict: 'id' })
  if (error) console.error('  ❌ projects:', error.message)
  else console.log(`  ✅ ${rows.length} projects inserted/upserted`)
}

async function migrateNews() {
  console.log('\n📰 Migrating news...')
  const articles = readJson<NewsArticle[]>('news.json')
  const rows = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.category,
    featured: a.featured,
    published_at: a.publishedAt,
    data: {
      excerpt: a.excerpt,
      content: a.content,
      author: a.author,
      categoryLabel: a.categoryLabel,
      image: a.image,
      readingTime: a.readingTime,
      tags: a.tags,
    },
  }))

  const { error } = await supabase.from('news').upsert(rows, { onConflict: 'id' })
  if (error) console.error('  ❌ news:', error.message)
  else console.log(`  ✅ ${rows.length} articles inserted/upserted`)
}

async function migrateServices() {
  console.log('\n🔧 Migrating services...')
  const services = readJson<Service[]>('services.json')
  const rows = services.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    data: {
      icon: s.icon,
      image: s.image ?? '',
      shortDescription: s.shortDescription,
      description: s.description,
      features: s.features,
      color: s.color,
    },
  }))

  const { error } = await supabase.from('services').upsert(rows, { onConflict: 'id' })
  if (error) console.error('  ❌ services:', error.message)
  else console.log(`  ✅ ${rows.length} services inserted/upserted`)
}

async function migratePartners() {
  console.log('\n🤝 Migrating partners...')
  const partners = readJson<Partner[]>('partners.json')
  const rows = partners.map((p, idx) => ({
    id: p.id,
    name: p.name,
    logo: p.logo,
    website: p.website,
    sort_order: idx,
  }))

  const { error } = await supabase.from('partners').upsert(rows, { onConflict: 'id' })
  if (error) console.error('  ❌ partners:', error.message)
  else console.log(`  ✅ ${rows.length} partners inserted/upserted`)
}

async function migrateSiteConfig() {
  console.log('\n⚙️  Migrating site config...')
  const config = readJson<object>('site.json')

  const { error } = await supabase
    .from('site_config')
    .upsert({ id: 'main', data: config }, { onConflict: 'id' })

  if (error) console.error('  ❌ site_config:', error.message)
  else console.log('  ✅ site_config upserted')
}

async function migrateAnalytics() {
  console.log('\n📊 Migrating analytics...')
  let analyticsData = { pageviews: 0, seoTraffic: 0, events: 0, lastUpdated: new Date().toISOString() }
  try {
    const raw = readJson<typeof analyticsData>('analytics.json')
    analyticsData = raw
  } catch {
    console.log('  ℹ️  No analytics.json found, inserting defaults')
  }

  const { error } = await supabase
    .from('analytics')
    .upsert({
      id: 'main',
      pageviews: analyticsData.pageviews,
      seo_traffic: analyticsData.seoTraffic,
      events: analyticsData.events,
      last_updated: analyticsData.lastUpdated,
    }, { onConflict: 'id' })

  if (error) console.error('  ❌ analytics:', error.message)
  else console.log('  ✅ analytics upserted')
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting migration to Supabase...')
  console.log(`   URL: ${supabaseUrl}`)

  await migrateProjects()
  await migrateNews()
  await migrateServices()
  await migratePartners()
  await migrateSiteConfig()
  await migrateAnalytics()

  console.log('\n🎉 Migration complete! You can now safely remove or archive the data/*.json files.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
