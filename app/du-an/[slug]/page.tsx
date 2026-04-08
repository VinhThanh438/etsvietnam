import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects } from '@/lib/data/projects'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { MapPin, Calendar, Zap, ChevronLeft, Tag } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Không tìm thấy dự án' }
  return {
    title: project.title,
    description: project.shortDescription,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <Link
            href="/du-an"
            className="inline-flex items-center gap-1.5 text-green-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Tất cả dự án
          </Link>
          <AnimatedSection>
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-green-100 mb-4 inline-block">
              {project.categoryLabel}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 max-w-3xl">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-green-200">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{project.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{project.year}</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4" />{project.capacity}</span>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <AnimatedSection className="lg:col-span-2">
              {/* Image placeholder */}
              <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center mb-8">
                <span className="text-gray-400 text-sm">Hình ảnh: {project.title}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tổng quan dự án</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
                <h3 className="font-bold text-gray-900 mb-5 text-lg">Thông tin dự án</h3>
                <dl className="space-y-4">
                  {[
                    { dt: 'Chủ đầu tư', dd: project.client },
                    { dt: 'Địa điểm', dd: project.location },
                    { dt: 'Công suất', dd: project.capacity },
                    { dt: 'Năm thi công', dd: project.year },
                    { dt: 'Loại dự án', dd: project.categoryLabel },
                  ].map(({ dt, dd }) => (
                    <div key={dt} className="flex flex-col gap-0.5">
                      <dt className="text-xs text-gray-500 uppercase tracking-wider">{dt}</dt>
                      <dd className="font-semibold text-gray-800">{dd}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">Cần dự án tương tự?</p>
                  <Link
                    href="/lien-he"
                    className="block text-center rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition-colors"
                  >
                    Liên hệ tư vấn
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
