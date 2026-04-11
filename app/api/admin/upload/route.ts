import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { saveUploadedFile, deleteUploadedFile, listUploadedFiles } from '@/lib/data-manager'

export async function GET(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const folder = searchParams.get('folder') || 'general'

  const files = await listUploadedFiles(folder)
  return Response.json({ files })
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: 'Chỉ hỗ trợ file ảnh (JPG, PNG, WebP, GIF, SVG)' },
        { status: 400 }
      )
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        { error: 'File tối đa 5MB' },
        { status: 400 }
      )
    }

    const publicPath = await saveUploadedFile(file, folder)
    return Response.json({ success: true, url: publicPath }, { status: 201 })
  } catch {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const filePath = searchParams.get('path')

  if (!filePath) {
    return Response.json({ error: 'Missing file path' }, { status: 400 })
  }

  // Security: ensure path is within uploads directory
  if (!filePath.startsWith('/uploads/')) {
    return Response.json({ error: 'Invalid path' }, { status: 400 })
  }

  const deleted = await deleteUploadedFile(filePath)
  if (!deleted) {
    return Response.json({ error: 'File not found or could not be deleted' }, { status: 404 })
  }

  return Response.json({ success: true })
}
