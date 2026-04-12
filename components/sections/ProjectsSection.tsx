'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Calendar, Zap } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection, StaggerContainer, fadeUpVariant } from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProjectsSectionProps {
  projects: Project[]
  showViewAll?: boolean
  sidebar?: React.ReactNode
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={fadeUpVariant}>
      <Link
        href={`/du-an/${project.slug}`}
        className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-200/50 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-gray-400">{project.title}</p>
              </div>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-green-600/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
              {project.categoryLabel}
            </span>
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-50">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-green-500" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-green-500" />
              {project.year}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-green-600">
              {project.capacity}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProjectsSection({ projects, showViewAll = true, sidebar }: ProjectsSectionProps) {
  return (
    <section className="pt-12 md:pt-16 pb-24 bg-white">
      <Container>
        <AnimatedSection className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionTitle
            label="Công trình tiêu biểu"
            title="Dự án đã thực hiện"
            description="Những công trình tiêu biểu chứng minh năng lực và kinh nghiệm của ETS VN."
            align="left"
            className="max-w-xl"
          />
          {showViewAll && (
            <Link
              href="/du-an"
              className="inline-flex items-center gap-2 shrink-0 text-green-600 font-semibold hover:text-green-700 transition-colors group"
            >
              Xem tất cả dự án
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </AnimatedSection>

        {sidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </StaggerContainer>
            </div>
            <div className="lg:col-span-1 relative hidden lg:block">
              <div className="sticky top-24">
                {sidebar}
              </div>
            </div>
            {/* Mobile/Tablet sidebar placement (below) */}
            <div className="lg:hidden mt-8">
              {sidebar}
            </div>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </StaggerContainer>
        )}
      </Container>
    </section>
  )
}
