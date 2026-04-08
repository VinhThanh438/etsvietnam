import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNewsBySlug, getNews } from '@/lib/data/news'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ChevronLeft, Clock, User, Tag, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getNews()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) return { title: 'Không tìm thấy bài viết' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-1.5 text-green-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Tất cả bài viết
          </Link>
          <AnimatedSection>
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-green-100 mb-4 inline-block">
              {article.categoryLabel}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 max-w-3xl">{article.title}</h1>
            <div className="flex flex-wrap gap-5 text-sm text-green-200">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readingTime} đọc
              </span>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Article content */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection className="lg:col-span-2">
              {/* Featured image */}
              <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center mb-10">
                <span className="text-gray-400 text-sm">Hình ảnh bài viết</span>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-green-500 pl-5 mb-8 italic">
                {article.excerpt}
              </p>

              {/* Content */}
              <div className="prose prose-green max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {article.content.replace(/^#.*$/gm, '').trim()}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-3">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 border border-green-100">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Về tác giả</h3>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{article.author}</p>
                    <p className="text-xs text-gray-500">Chuyên gia ETS VN</p>
                  </div>
                </div>
                <div className="pt-5 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">Cần tư vấn thêm?</p>
                  <Link
                    href="/lien-he"
                    className="block text-center rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition-colors text-sm"
                  >
                    Liên hệ chuyên gia
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  )
}
