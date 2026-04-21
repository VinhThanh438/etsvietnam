import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { deleteUploadedFile } from '@/lib/data-manager'
import type { Partner } from '@/lib/types'

export async function GET() {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('partners')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<Partner> = await request.json()

  const row = {
    id: body.id ?? body.name!.toLowerCase().replace(/\s+/g, '-'),
    name: body.name ?? '',
    logo: body.logo ?? '',
    website: body.website ?? '#',
  }

  const { data, error } = await supabaseAdmin
    .from('partners')
    .insert(row)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true, data }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<Partner> = await request.json()
  if (!body.id) return Response.json({ error: 'Missing id' }, { status: 400 })

  // Fetch old logo for cleanup
  const { data: existing } = await supabaseAdmin
    .from('partners')
    .select('logo')
    .eq('id', body.id)
    .single()

  const { data, error } = await supabaseAdmin
    .from('partners')
    .update({ name: body.name, logo: body.logo, website: body.website })
    .eq('id', body.id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  const oldLogo = existing?.logo as string | undefined
  if (oldLogo && oldLogo !== body.logo && oldLogo.startsWith('/uploads/')) {
    await deleteUploadedFile(oldLogo)
  }

  return Response.json({ success: true, data })
}

export async function DELETE(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const { data: existing } = await supabaseAdmin
    .from('partners')
    .select('logo')
    .eq('id', id)
    .single()

  const { error } = await supabaseAdmin.from('partners').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  const logo = existing?.logo as string | undefined
  if (logo && logo.startsWith('/uploads/')) {
    await deleteUploadedFile(logo)
  }

  return Response.json({ success: true })
}
