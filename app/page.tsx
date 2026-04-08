import type { Metadata } from 'next'
import { getSiteConfig } from '@/lib/data/site'
import { getServices } from '@/lib/data/services'
import { getFeaturedProjects } from '@/lib/data/projects'
import { getFeaturedNews } from '@/lib/data/news'
import { getPartners } from '@/lib/data/site'

import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { NewsSection } from '@/components/sections/NewsSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { ContactSection } from '@/components/sections/ContactSection'

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

  return (
    <>
      <HeroSection />
      <AboutSection config={config} />
      <ExpertiseSection />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} showViewAll />
      <NewsSection articles={articles} showViewAll />
      <PartnersSection partners={partners} />
      <ContactSection config={config} />
    </>
  )
}
