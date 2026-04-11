import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { readJsonFile, writeJsonFile } from '@/lib/data-manager'
import type { Service } from '@/lib/types'

export async function GET() {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const services = await readJsonFile<Service[]>('services.json')
  return Response.json(services)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const services = await readJsonFile<Service[]>('services.json')

  const newService: Service = {
    id: body.slug || body.id,
    slug: body.slug,
    icon: body.icon || 'Droplets',
    title: body.title,
    shortDescription: body.shortDescription || '',
    description: body.description || '',
    features: body.features || [],
    color: body.color || 'green',
  }

  services.push(newService)
  await writeJsonFile('services.json', services)

  return Response.json({ success: true, data: newService }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const services = await readJsonFile<Service[]>('services.json')
  const index = services.findIndex((s) => s.id === body.id)

  if (index === -1) {
    return Response.json({ error: 'Không tìm thấy dịch vụ' }, { status: 404 })
  }

  services[index] = { ...services[index], ...body }
  await writeJsonFile('services.json', services)

  return Response.json({ success: true, data: services[index] })
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

  const services = await readJsonFile<Service[]>('services.json')
  const filtered = services.filter((s) => s.id !== id)

  if (filtered.length === services.length) {
    return Response.json({ error: 'Không tìm thấy dịch vụ' }, { status: 404 })
  }

  await writeJsonFile('services.json', filtered)
  return Response.json({ success: true })
}
