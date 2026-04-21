import { ContactSection } from '@/components/sections/ContactSection'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PageBanner } from '@/components/ui/PageBanner'
import { getSiteConfig } from '@/lib/data/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Liên hệ | Yêu cầu tư vấn môi trường',
  description: 'Liên hệ với đội ngũ kỹ sư ETS VN để được tư vấn giải pháp xử lý nước thải, nước cấp và môi trường phù hợp.',
}

export default async function ContactPage() {
  const config = await getSiteConfig()
  return (
    <>
      <PageBanner>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Hỗ trợ 24/7
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
              <p className="text-green-200 text-lg">
                Chúng tôi sẵn sàng tư vấn và hỗ trợ bạn tìm giải pháp phù hợp nhất
              </p>
            </div>
          </AnimatedSection>
        </PageBanner>
      <ContactSection config={config} />
    </>
  )
}

