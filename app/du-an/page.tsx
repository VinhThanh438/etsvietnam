import type { Metadata } from 'next'
import { getSiteConfig } from '@/lib/data/site'
import { getProjects } from '@/lib/data/projects'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Dự án | Công trình đã thực hiện',
  description: 'Danh sách các dự án xử lý nước thải, nước cấp, khí thải và môi trường của ETS VN trên toàn quốc.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Công trình tiêu biểu
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Dự án đã thực hiện</h1>
              <p className="text-green-200 text-lg">
                {projects.length}+ công trình hoàn thành trên toàn quốc — từ nhà máy đến khu đô thị
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <ProjectsSection projects={projects} showViewAll={false} />
    </>
  )
}
