/* eslint-disable @next/next/no-img-element */
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { PageBanner } from '@/components/ui/PageBanner'
import { getServiceBySlug, getServices } from '@/lib/data/services'
import { Activity, CheckCircle, Database, Droplets, Factory, FileText, Settings, ShieldCheck, Waves, Wind, Wrench, Zap } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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
  Settings,
  ShieldCheck,
  Factory,
  Zap,
  Wrench,
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
      <PageBanner>
          <AnimatedSection className="flex flex-col md:flex-row gap-8 items-start mt-8">
            <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Icon className="h-8 w-8 md:h-10 md:w-10 text-green-300" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-green-100 text-lg max-w-2xl">{service.shortDescription}</p>
            </div>
          </AnimatedSection>
        </PageBanner>

      <Breadcrumbs items={[
        { label: 'Dịch vụ', href: '/dich-vu' },
        { label: service.title }
      ]} />

      {/* Content */}
      <section className="pt-10 md:pt-12 pb-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection className="lg:col-span-2">
              {/* Service Image (Schematic/Technical) */}
              {service.image ? (
                <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-4">
                  <img 
                    src={service.image} 
                    alt={`Sơ đồ kỹ thuật ${service.title}`} 
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div className="aspect-[21/9] rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 flex items-center justify-center mb-12">
                  <div className="text-center text-gray-400">
                    <Icon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Hình ảnh minh họa hệ thống {service.title.toLowerCase()}</p>
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Chi tiết hoạt động</h2>
              <div className="prose prose-green max-w-none mb-10">
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {service.description}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Phạm vi công việc</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100/80 hover:bg-white hover:shadow-md transition-all">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
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
