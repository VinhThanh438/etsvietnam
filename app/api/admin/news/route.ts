import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { deleteUploadedFile } from '@/lib/data-manager'
import type { NewsArticle } from '@/lib/types'

// ── Helper: flatten Supabase row → NewsArticle (for admin responses) ──────
function rowToArticle(row: Record<string, unknown>): NewsArticle {
  const data = (row.data as Partial<NewsArticle>) ?? {}
  return {
    id: (row.id as string) ?? '',
    slug: (row.slug as string) ?? '',
    title: (row.title as string) ?? '',
    excerpt: data.excerpt ?? '',
    content: data.content ?? '',
    author: data.author ?? '',
    category: (row.category as string) ?? data.category ?? '',
    categoryLabel: data.categoryLabel ?? '',
    image: data.image ?? '',
    publishedAt: (row.published_at as string) ?? data.publishedAt ?? '',
    readingTime: data.readingTime ?? '5 phút',
    featured: (row.featured as boolean) ?? false,
    tags: data.tags ?? [],
  }
}

function bodyToRow(body: Partial<NewsArticle>) {
  return {
    id: body.slug ?? body.id,
    slug: body.slug,
    title: body.title ?? '',
    category: body.category ?? '',
    featured: body.featured ?? false,
    published_at: body.publishedAt ?? new Date().toISOString().split('T')[0],
    data: {
      excerpt: body.excerpt ?? '',
      content: body.content ?? '',
      author: body.author ?? '',
      categoryLabel: body.categoryLabel ?? '',
      image: body.image ?? '',
      readingTime: body.readingTime ?? '5 phút',
      tags: body.tags ?? [],
    },
  }
}

export async function GET() {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json((data as Record<string, unknown>[]).map(rowToArticle))
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<NewsArticle> = await request.json()
  const row = bodyToRow(body)

  const { data, error } = await supabaseAdmin
    .from('news')
    .insert(row)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true, data }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Partial<NewsArticle> = await request.json()
  if (!body.id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const { data: existing } = await supabaseAdmin
    .from('news')
    .select('data')
    .eq('id', body.id)
    .single()

  const row = bodyToRow(body)

  const { data, error } = await supabaseAdmin
    .from('news')
    .update(row)
    .eq('id', body.id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

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

  const { data: existing } = await supabaseAdmin
    .from('news')
    .select('data')
    .eq('id', id)
    .single()

  const { error } = await supabaseAdmin.from('news').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  const image = (existing?.data as { image?: string })?.image
  if (image && image.startsWith('/uploads/')) {
    await deleteUploadedFile(image)
  }

  return Response.json({ success: true })
}
