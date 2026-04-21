import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { deleteUploadedFile } from '@/lib/data-manager'
import type { Project } from '@/lib/types'

// ── Helper: flatten Supabase row → Project object (for admin responses) ──
function rowToProject(row: Record<string, unknown>): Project {
  const data = (row.data as Partial<Project>) ?? {}
  return {
    id: (row.id as string) ?? '',
    slug: (row.slug as string) ?? '',
    title: (row.title as string) ?? '',
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
    featured: (row.featured as boolean) ?? false,
  }
}

// ── Helper: map request body → Supabase row ──────────────────────────────
function bodyToRow(body: Partial<Project>) {
  return {
    id: body.slug ?? body.id,
    slug: body.slug,
    title: body.title ?? '',
    location: body.location ?? '',
    category: body.category ?? '',
    featured: body.featured ?? false,
    data: {
      client: body.client ?? '',
      location: body.location ?? '',
      category: body.category ?? '',
      categoryLabel: body.categoryLabel ?? '',
      capacity: body.capacity ?? '',
      year: body.year ?? new Date().getFullYear().toString(),
      image: body.image ?? '',
      shortDescription: body.shortDescription ?? '',
      description: body.description ?? '',
      tags: body.tags ?? [],
    },
  }
}

export async function GET() {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json((data as Record<string, unknown>[]).map(rowToProject))
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<Project> = await request.json()
  const row = bodyToRow(body)

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert(row)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true, data }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<Project> = await request.json()
  if (!body.id) return Response.json({ error: 'Missing id' }, { status: 400 })

  // Fetch old image for cleanup
  const { data: existing } = await supabaseAdmin
    .from('projects')
    .select('data')
    .eq('id', body.id)
    .single()

  const row = bodyToRow(body)

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(row)
    .eq('id', body.id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Delete old image file if replaced
  const oldImage = (existing?.data as { image?: string })?.image
  const newImage = body.image
  if (oldImage && oldImage !== newImage && oldImage.startsWith('/uploads/')) {
    await deleteUploadedFile(oldImage)
  }

  return Response.json({ success: true, data })
}

export async function DELETE(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

  // Fetch image before deleting
  const { data: existing } = await supabaseAdmin
    .from('projects')
    .select('data')
    .eq('id', id)
    .single()

  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  const image = (existing?.data as { image?: string })?.image
  if (image && image.startsWith('/uploads/')) {
    await deleteUploadedFile(image)
  }

  return Response.json({ success: true })
}
