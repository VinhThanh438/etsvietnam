import { getFeaturedNews } from '@/lib/data/news'
import { getFeaturedProjects } from '@/lib/data/projects'
import { getServices } from '@/lib/data/services'
import { getPartners, getSiteConfig } from '@/lib/data/site'
import type { Metadata } from 'next'

import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  return {
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
  }
}

export default async function HomePage() {
  const [config, services, projects, articles, partners] = await Promise.all([
    getSiteConfig(),
    getServices(),
    getFeaturedProjects(),
    getFeaturedNews(),
    getPartners(),
  ])

  // Dynamically calculate years of experience for stats
  const dynamicStats = config.stats.map(stat => {
    if (stat.label.toLowerCase().includes('kinh nghiệm')) {
      return {
        ...stat,
        value: `${new Date().getFullYear() - parseInt(config.company.founded)}+`
      }
    }
    return stat
  })

  return (
    <>
      <HeroSection slides={config.heroSlides} stats={dynamicStats} />
      <AboutSection config={{ ...config, stats: dynamicStats }} />
      <ExpertiseSection />
      <ServicesSection services={services} limit={3} />
      <ProjectsSection projects={projects} showViewAll />
      <PartnersSection partners={partners} />
      <ContactSection config={config} />
    </>
  )
}
