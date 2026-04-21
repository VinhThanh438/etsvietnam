import { NewsSection } from '@/components/sections/NewsSection'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Container } from '@/components/ui/Container'
import { PageBanner } from '@/components/ui/PageBanner'
import { getAllTags, getNewsByTag } from '@/lib/data/news'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(
  { params }: { params: Promise<{ tag: string }> }
): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  return {
    title: `#${decodedTag} | Tin tức`,
    description: `Các bài viết liên quan đến ${decodedTag} - Tin tức & Kiến thức từ ETS Việt Nam`,
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage(
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const articles = await getNewsByTag(decodedTag)
  const allTags = await getAllTags()

  return (
    <>
      <PageBanner>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Bài viết theo hashtag
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                #{decodedTag}
              </h1>
              <p className="text-green-200 text-lg">
                {articles.length} bài viết liên quan
              </p>
            </div>
          </AnimatedSection>
        </PageBanner>

      {/* Tags cloud */}
      <section className="py-8 bg-gray-50">
        <Container>
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/tin-tuc/tag/${encodeURIComponent(t)}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  t.toLowerCase() === decodedTag.toLowerCase()
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-200'
                }`}
              >
                #{t}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <NewsSection articles={articles} showViewAll={false} />
    </>
  )
}
