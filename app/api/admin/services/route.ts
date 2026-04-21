import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { deleteUploadedFile } from '@/lib/data-manager'
import type { Service } from '@/lib/types'

// ── Helper: flatten Supabase row → Service (for admin responses) ──────────
function rowToService(row: Record<string, unknown>): Service {
  const data = (row.data as Partial<Service>) ?? {}
  return {
    id: (row.id as string) ?? '',
    slug: (row.slug as string) ?? '',
    title: (row.title as string) ?? '',
    icon: data.icon ?? 'Droplets',
    image: data.image ?? '',
    shortDescription: data.shortDescription ?? '',
    description: data.description ?? '',
    features: data.features ?? [],
    color: data.color ?? 'green',
  }
}

function bodyToRow(body: Partial<Service>) {
  return {
    id: body.slug ?? body.id,
    slug: body.slug,
    title: body.title ?? '',
    data: {
      icon: body.icon ?? 'Droplets',
      image: body.image ?? '',
      shortDescription: body.shortDescription ?? '',
      description: body.description ?? '',
      features: body.features ?? [],
      color: body.color ?? 'green',
    },
  }
}

export async function GET() {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('services')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json((data as Record<string, unknown>[]).map(rowToService))
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<Service> = await request.json()
  const row = bodyToRow(body)

  const { data, error } = await supabaseAdmin
    .from('services')
    .insert(row)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true, data }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<Service> = await request.json()
  if (!body.id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const row = bodyToRow(body)

  // Fetch old image BEFORE updating (for cleanup)
  const { data: existing } = await supabaseAdmin
    .from('services')
    .select('data')
    .eq('id', body.id)
    .single()

  const { data, error } = await supabaseAdmin
    .from('services')
    .update(row)
    .eq('id', body.id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Delete old image file if replaced
  const oldImage = (existing?.data as { image?: string })?.image
  if (oldImage && oldImage !== body.image && oldImage.startsWith('/uploads/')) {
    await deleteUploadedFile(oldImage)
  }

  return Response.json({ success: true, data })
}

export async function DELETE(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const { error } = await supabaseAdmin.from('services').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ success: true })
}
