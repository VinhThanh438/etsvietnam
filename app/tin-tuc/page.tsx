import type { Metadata } from 'next'
import { getNews } from '@/lib/data/news'
import { NewsSection } from '@/components/sections/NewsSection'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Tin tức | Cẩm nang môi trường',
  description: 'Cập nhật tin tức, kiến thức về công nghệ xử lý nước thải, môi trường và quy định pháp luật mới nhất.',
}

export default async function NewsPage() {
  const articles = await getNews()

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Cẩm nang môi trường
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tin tức & Kiến thức</h1>
              <p className="text-green-200 text-lg">
                Xu hướng công nghệ, quy định pháp luật và kinh nghiệm thực tiễn từ đội ngũ ETS VN
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <NewsSection articles={articles} showViewAll={false} />
    </>
  )
}
