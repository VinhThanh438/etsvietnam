import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { readJsonFile, writeJsonFile, deleteUploadedFile } from '@/lib/data-manager'
import type { Partner } from '@/lib/types'

export async function GET() {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const partners = await readJsonFile<Partner[]>('partners.json')
  return Response.json(partners)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const partners = await readJsonFile<Partner[]>('partners.json')

  const newPartner: Partner = {
    id: body.id || body.name.toLowerCase().replace(/\s+/g, '-'),
    name: body.name,
    logo: body.logo || '',
    website: body.website || '#',
  }

  partners.push(newPartner)
  await writeJsonFile('partners.json', partners)

  return Response.json({ success: true, data: newPartner }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const partners = await readJsonFile<Partner[]>('partners.json')
  const index = partners.findIndex((p) => p.id === body.id)

  if (index === -1) {
    return Response.json({ error: 'Không tìm thấy đối tác' }, { status: 404 })
  }

  const oldLogo = partners[index].logo
  partners[index] = { ...partners[index], ...body }

  if (oldLogo && oldLogo !== partners[index].logo && oldLogo.startsWith('/uploads/')) {
    await deleteUploadedFile(oldLogo)
  }

  await writeJsonFile('partners.json', partners)

  return Response.json({ success: true, data: partners[index] })
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

  const partners = await readJsonFile<Partner[]>('partners.json')
  const partnerToDelete = partners.find((p) => p.id === id)
  if (!partnerToDelete) {
    return Response.json({ error: 'Không tìm thấy đối tác' }, { status: 404 })
  }

  if (partnerToDelete.logo && partnerToDelete.logo.startsWith('/uploads/')) {
    await deleteUploadedFile(partnerToDelete.logo)
  }

  const filtered = partners.filter((p) => p.id !== id)

  await writeJsonFile('partners.json', filtered)
  return Response.json({ success: true })
}
