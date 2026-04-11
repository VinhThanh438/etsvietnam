import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { readJsonFile, writeJsonFile, deleteUploadedFile } from '@/lib/data-manager'
import type { NewsArticle } from '@/lib/types'

export async function GET() {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const news = await readJsonFile<NewsArticle[]>('news.json')
  return Response.json(news)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const news = await readJsonFile<NewsArticle[]>('news.json')

  const newArticle: NewsArticle = {
    id: body.slug || body.id,
    slug: body.slug,
    title: body.title,
    excerpt: body.excerpt || '',
    content: body.content || '',
    author: body.author || '',
    category: body.category || '',
    categoryLabel: body.categoryLabel || '',
    image: body.image || '',
    publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
    readingTime: body.readingTime || '5 phút',
    featured: body.featured || false,
    tags: body.tags || [],
  }

  news.push(newArticle)
  await writeJsonFile('news.json', news)

  return Response.json({ success: true, data: newArticle }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const news = await readJsonFile<NewsArticle[]>('news.json')
  const index = news.findIndex((n) => n.id === body.id)

  if (index === -1) {
    return Response.json({ error: 'Không tìm thấy bài viết' }, { status: 404 })
  }

  const oldImage = news[index].image
  news[index] = { ...news[index], ...body }

  if (oldImage && oldImage !== news[index].image && oldImage.startsWith('/uploads/')) {
    await deleteUploadedFile(oldImage)
  }

  await writeJsonFile('news.json', news)

  return Response.json({ success: true, data: news[index] })
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

  const news = await readJsonFile<NewsArticle[]>('news.json')
  const articleToDelete = news.find((n) => n.id === id)
  if (!articleToDelete) {
    return Response.json({ error: 'Không tìm thấy bài viết' }, { status: 404 })
  }

  if (articleToDelete.image && articleToDelete.image.startsWith('/uploads/')) {
    await deleteUploadedFile(articleToDelete.image)
  }

  const filtered = news.filter((n) => n.id !== id)

  await writeJsonFile('news.json', filtered)
  return Response.json({ success: true })
}
