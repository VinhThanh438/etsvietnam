import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { readJsonFile, writeJsonFile, deleteUploadedFile } from '@/lib/data-manager'
import type { Project } from '@/lib/types'

export async function GET() {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projects = await readJsonFile<Project[]>('projects.json')
  return Response.json(projects)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const projects = await readJsonFile<Project[]>('projects.json')

  const newProject: Project = {
    id: body.slug || body.id,
    slug: body.slug,
    title: body.title,
    client: body.client || '',
    location: body.location || '',
    category: body.category || '',
    categoryLabel: body.categoryLabel || '',
    capacity: body.capacity || '',
    year: body.year || new Date().getFullYear().toString(),
    image: body.image || '',
    shortDescription: body.shortDescription || '',
    description: body.description || '',
    tags: body.tags || [],
    featured: body.featured || false,
  }

  projects.push(newProject)
  await writeJsonFile('projects.json', projects)

  return Response.json({ success: true, data: newProject }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const projects = await readJsonFile<Project[]>('projects.json')
  const index = projects.findIndex((p) => p.id === body.id)

  if (index === -1) {
    return Response.json({ error: 'Không tìm thấy dự án' }, { status: 404 })
  }

  const oldImage = projects[index].image
  projects[index] = { ...projects[index], ...body }

  if (oldImage && oldImage !== projects[index].image && oldImage.startsWith('/uploads/')) {
    await deleteUploadedFile(oldImage)
  }

  await writeJsonFile('projects.json', projects)

  return Response.json({ success: true, data: projects[index] })
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

  const projects = await readJsonFile<Project[]>('projects.json')
  const projectToDelete = projects.find((p) => p.id === id)
  if (!projectToDelete) {
    return Response.json({ error: 'Không tìm thấy dự án' }, { status: 404 })
  }

  // Delete associated image file
  if (projectToDelete.image && projectToDelete.image.startsWith('/uploads/')) {
    await deleteUploadedFile(projectToDelete.image)
  }

  const filtered = projects.filter((p) => p.id !== id)

  await writeJsonFile('projects.json', filtered)
  return Response.json({ success: true })
}
