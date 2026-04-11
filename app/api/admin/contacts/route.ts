import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { readJsonFile, writeJsonFile } from '@/lib/data-manager'

interface ContactSubmission {
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
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const contacts = await readJsonFile<ContactSubmission[]>('contacts.json')
  // Sort by newest first
  contacts.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  return Response.json(contacts)
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const contacts = await readJsonFile<ContactSubmission[]>('contacts.json')
  const index = contacts.findIndex((c) => c.id === body.id)

  if (index === -1) {
    return Response.json({ error: 'Không tìm thấy' }, { status: 404 })
  }

  contacts[index] = { ...contacts[index], ...body }
  await writeJsonFile('contacts.json', contacts)

  return Response.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const id = searchParams.get('id')

  if (!id) {
    return Response.json({ error: 'Missing id' }, { status: 400 })
  }

  const contacts = await readJsonFile<ContactSubmission[]>('contacts.json')
  const filtered = contacts.filter((c) => c.id !== id)
  await writeJsonFile('contacts.json', filtered)

  return Response.json({ success: true })
}
