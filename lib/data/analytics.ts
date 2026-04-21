/**
 * Data service: Analytics
 * Reads/writes from Supabase. Falls back gracefully on error.
 */
import { supabaseAdmin } from '@/lib/supabase'

export interface Analytics {
  pageviews: number
  seoTraffic: number
  events: number
  lastUpdated: string
}

const DEFAULT_ANALYTICS: Analytics = {
  pageviews: 0,
  seoTraffic: 0,
  events: 0,
  lastUpdated: new Date().toISOString(),
}

export async function getAnalytics(): Promise<Analytics> {
  const { data, error } = await supabaseAdmin
    .from('analytics')
    .select('*')
    .eq('id', 'main')
    .single()

  if (error || !data) {
    return { ...DEFAULT_ANALYTICS }
  }

  return {
    pageviews: (data.pageviews as number) ?? 0,
    seoTraffic: (data.seo_traffic as number) ?? 0,
    events: (data.events as number) ?? 0,
    lastUpdated: (data.last_updated as string) ?? new Date().toISOString(),
  }
}

export async function saveAnalytics(analytics: Analytics): Promise<void> {
  const { error } = await supabaseAdmin
    .from('analytics')
    .upsert(
      {
        id: 'main',
        pageviews: analytics.pageviews,
        seo_traffic: analytics.seoTraffic,
        events: analytics.events,
        last_updated: analytics.lastUpdated,
      },
      { onConflict: 'id' }
    )

  if (error) {
    console.error('[analytics] Failed to save:', error.message)
  }
}

/**
 * Atomic increment — avoids read-modify-write race conditions.
 * Uses Supabase RPC for safe concurrent updates.
 */
export async function incrementAnalytics(
  field: 'pageviews' | 'seo_traffic' | 'events'
): Promise<void> {
  const { error } = await supabaseAdmin.rpc('increment_analytics', { field_name: field })
  if (error) {
    // Fallback: read-modify-write
    const current = await getAnalytics()
    const updated = { ...current, lastUpdated: new Date().toISOString() }
    if (field === 'pageviews') updated.pageviews += 1
    if (field === 'seo_traffic') updated.seoTraffic += 1
    if (field === 'events') updated.events += 1
    await saveAnalytics(updated)
  }
}
