import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { readJsonFile, writeJsonFile } from '@/lib/data-manager'
import type { SiteConfig } from '@/lib/types'

export async function GET() {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const config = await readJsonFile<SiteConfig>('site.json')
  return Response.json(config)
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const config = await readJsonFile<SiteConfig>('site.json')

  // Deep merge updates
  const updated: SiteConfig = {
    company: { ...config.company, ...body.company },
    seo: { ...config.seo, ...body.seo },
    stats: body.stats || config.stats,
    nav: body.nav || config.nav,
  }

  await writeJsonFile('site.json', updated)

  return Response.json({ success: true, data: updated })
}
