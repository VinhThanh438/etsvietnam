import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageBanner } from '@/components/ui/PageBanner'
import { SidebarProjects } from '@/components/ui/SidebarProjects'
import { getProjects } from '@/lib/data/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dự án | Công trình đã thực hiện',
  description: 'Danh sách các dự án xử lý nước thải, nước cấp, khí thải và môi trường của ETS VN trên toàn quốc.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      {/* Page Header */}
      <PageBanner>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Công trình tiêu biểu
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Dự án đã thực hiện</h1>
              <p className="text-green-200 text-lg">
                {projects.length}+ công trình hoàn thành trên toàn quốc — từ nhà máy đến khu đô thị
              </p>
            </div>
          </AnimatedSection>
        </PageBanner>

      <Breadcrumbs items={[{ label: 'Dự án' }]} />

      <ProjectsSection 
        projects={projects}  
        showViewAll={false} 
        sidebar={<SidebarProjects />} 
      />
    </>
  )
}

