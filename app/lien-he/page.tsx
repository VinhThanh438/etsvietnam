import type { Metadata } from 'next'
import { getSiteConfig } from '@/lib/data/site'
import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Liên hệ | Yêu cầu tư vấn môi trường',
  description: 'Liên hệ với đội ngũ kỹ sư ETS VN để được tư vấn giải pháp xử lý nước thải, nước cấp và môi trường phù hợp.',
}

export default async function ContactPage() {
  const config = await getSiteConfig()
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Hỗ trợ 24/7
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
              <p className="text-green-200 text-lg">
                Chúng tôi sẵn sàng tư vấn và hỗ trợ bạn tìm giải pháp phù hợp nhất
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>
      <ContactSection config={config} />
    </>
  )
}
