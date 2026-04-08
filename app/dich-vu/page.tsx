import type { Metadata } from 'next'
import { getServices } from '@/lib/data/services'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Dịch vụ | Giải pháp môi trường toàn diện',
  description: 'Các giải pháp xử lý nước thải, nước cấp, khí thải và tư vấn môi trường chuyên nghiệp từ ETS VN.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Dịch vụ kỹ thuật
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Giải pháp & Dịch vụ</h1>
              <p className="text-green-200 text-lg">
                Chúng tôi cung cấp hệ sinh thái dịch vụ môi trường trọn gói, từ tư vấn đến vận hành.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <ServicesSection services={services} />
    </>
  )
}
