import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import type { SiteConfig } from '@/lib/types'

export async function GET() {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('site_config')
    .select('data')
    .eq('id', 'main')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data?.data ?? {})
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  // Fetch current config to deep-merge
  const { data: existing } = await supabaseAdmin
    .from('site_config')
    .select('data')
    .eq('id', 'main')
    .single()

  const currentConfig = (existing?.data ?? {}) as SiteConfig

  const updated: SiteConfig = {
    company: { ...currentConfig.company, ...body.company },
    seo: { ...currentConfig.seo, ...body.seo },
    stats: body.stats ?? currentConfig.stats,
    nav: body.nav ?? currentConfig.nav,
    heroSlides:
      body.heroSlides !== undefined
        ? body.heroSlides
        : (currentConfig.heroSlides ?? []),
  }

  const { error } = await supabaseAdmin
    .from('site_config')
    .upsert({ id: 'main', data: updated }, { onConflict: 'id' })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true, data: updated })
}
