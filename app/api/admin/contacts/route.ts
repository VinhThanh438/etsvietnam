import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  submittedAt: string
  read: boolean
}

export async function GET() {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('contacts')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Map snake_case columns → camelCase for the frontend
  const mapped = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    message: row.message,
    submittedAt: row.submitted_at,
    read: row.read,
  }))

  return Response.json(mapped)
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  if (!body.id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('contacts')
    .update({ read: body.read })
    .eq('id', body.id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const session = await verifySession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const { error } = await supabaseAdmin.from('contacts').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ success: true })
}
