import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServices } from '@/lib/data/services'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ChevronLeft, CheckCircle, Droplets, Waves, Wind, Activity, FileText, Database } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Waves,
  Wind,
  Activity,
  FileText,
  Database,
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Không tìm thấy dịch vụ' }
  return {
    title: `${service.title} | Dịch vụ ETS VN`,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const Icon = iconMap[service.icon] || Droplets

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-1.5 text-green-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Tất cả dịch vụ
          </Link>
          <AnimatedSection className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Icon className="h-8 w-8 md:h-10 md:w-10 text-green-300" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-green-100 text-lg max-w-2xl">{service.shortDescription}</p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Chi tiết dịch vụ</h2>
              <div className="prose prose-green max-w-none mb-10">
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {service.description}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Phạm vi công việc</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placeholder image for service */}
              <div className="aspect-[21/9] rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Icon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">Hình ảnh minh họa hệ thống {service.title.toLowerCase()}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AnimatedSection direction="right" delay={0.1}>
                <div className="rounded-2xl bg-green-700 p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Bạn cần tư vấn?</h3>
                  <p className="text-green-100 mb-6 text-sm leading-relaxed">
                    Đội ngũ chuyên gia của ETS VN sẵn sàng giải đáp mọi thắc mắc và cung cấp báo giá chi tiết.
                  </p>
                  <Link
                    href="/lien-he"
                    className="block w-full text-center bg-white text-green-700 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    Liên hệ ngay
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.2}>
                <div className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Dịch vụ khác</h3>
                  <div className="space-y-4">
                    {(await getServices()).filter(s => s.slug !== slug).slice(0, 4).map(s => (
                      <Link
                        key={s.slug}
                        href={`/dich-vu/${s.slug}`}
                        className="group flex items-center gap-3 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-green-500 transition-colors" />
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
