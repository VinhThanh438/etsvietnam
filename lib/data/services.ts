/**
 * Data service: Services
 * Reads from Supabase. Falls back to local JSON if Supabase is unreachable.
 */
import { supabase } from '@/lib/supabase'
import type { Service } from '@/lib/types'

function getFallback(): Service[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/data/services.json') as Service[]
  } catch {
    return []
  }
}

function rowToService(row: Record<string, unknown>): Service {
  const data = (row.data as Partial<Service>) ?? {}
  return {
    id: (row.id as string) ?? data.id ?? '',
    slug: (row.slug as string) ?? data.slug ?? '',
    icon: data.icon ?? 'Droplets',
    title: (row.title as string) ?? data.title ?? '',
    image: data.image ?? '',
    shortDescription: data.shortDescription ?? '',
    description: data.description ?? '',
    features: data.features ?? [],
    color: data.color ?? 'green',
  }
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true })

  if (error || !data) {
    console.warn('[services] Supabase error, using fallback:', error?.message)
    return getFallback()
  }
  return data.map(rowToService)
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return getFallback().find((s) => s.slug === slug)
  }
  return rowToService(data)
}
