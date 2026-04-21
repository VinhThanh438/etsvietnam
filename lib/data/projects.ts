/**
 * Data service: Projects
 * Reads from Supabase. Falls back to local JSON if Supabase is unreachable.
 */
import { supabase } from '@/lib/supabase'
import type { Project } from '@/lib/types'

// ── Fallback: read from local JSON (bundled at build time) ────────────────
function getFallback(): Project[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/data/projects.json') as Project[]
  } catch {
    return []
  }
}

// ── DB row → Project ──────────────────────────────────────────────────────
function rowToProject(row: Record<string, unknown>): Project {
  const data = (row.data as Partial<Project>) ?? {}
  return {
    id: (row.id as string) ?? data.id ?? '',
    slug: (row.slug as string) ?? data.slug ?? '',
    title: (row.title as string) ?? data.title ?? '',
    client: data.client ?? '',
    location: (row.location as string) ?? data.location ?? '',
    category: (row.category as string) ?? data.category ?? '',
    categoryLabel: data.categoryLabel ?? '',
    capacity: data.capacity ?? '',
    year: data.year ?? '',
    image: data.image ?? '',
    shortDescription: data.shortDescription ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    featured: (row.featured as boolean) ?? data.featured ?? false,
  }
}

// ── Public API ────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.warn('[projects] Supabase error, using fallback:', error?.message)
    return getFallback()
  }
  return data.map(rowToProject)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.warn('[projects] Supabase error, using fallback:', error?.message)
    return getFallback().filter((p) => p.featured)
  }
  return data.map(rowToProject)
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return getFallback().find((p) => p.slug === slug)
  }
  return rowToProject(data)
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error || !data) {
    return getFallback().filter((p) => p.category === category)
  }
  return data.map(rowToProject)
}
