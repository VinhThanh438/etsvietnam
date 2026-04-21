/**
 * Data service: Site Config + Partners
 * Reads from Supabase. Falls back to local JSON if Supabase is unreachable.
 */
import { supabase } from '@/lib/supabase'
import type { Partner, SiteConfig } from '@/lib/types'

// ── Fallbacks ─────────────────────────────────────────────────────────────

function getSiteConfigFallback(): SiteConfig {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/data/site.json') as SiteConfig
  } catch {
    return {
      company: {
        name: 'ETS VN',
        fullName: 'Công ty Cổ phần Môi trường ETS Việt Nam',
        slogan: '',
        description: '',
        phone: '',
        zaloPhone: '',
        email: '',
        address: '',
        taxCode: '',
        founded: '',
        logo: '/images/logo.jpg',
        website: '',
        facebook: '',
        zalo: '',
      },
      seo: { defaultTitle: '', titleTemplate: '', defaultDescription: '', siteUrl: '', ogImage: '' },
      stats: [],
      nav: [],
    }
  }
}

function getPartnersFallback(): Partner[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/data/partners.json') as Partner[]
  } catch {
    return []
  }
}

// ── Public API ────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase
    .from('site_config')
    .select('data')
    .eq('id', 'main')
    .single()

  if (error || !data) {
    console.warn('[site_config] Supabase error, using fallback:', error?.message)
    return getSiteConfigFallback()
  }
  return data.data as SiteConfig
}

export async function getPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.warn('[partners] Supabase error, using fallback:', error?.message)
    return getPartnersFallback()
  }

  return data.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    logo: row.logo as string,
    website: (row.website as string) ?? '#',
  }))
}
