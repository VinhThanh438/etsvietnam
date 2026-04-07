'use client'

import Link from 'next/link'
import { ArrowRight, Droplets, Waves, Wind, Activity, FileText, Database } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection, StaggerContainer, fadeUpVariant } from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import type { Service } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Waves,
  Wind,
  Activity,
  FileText,
  Database,
}

const colorMap: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100', hover: 'hover:border-green-300 hover:bg-green-50' },
  blue:  { bg: 'bg-blue-50',  icon: 'text-blue-600',  border: 'border-blue-100',  hover: 'hover:border-blue-300 hover:bg-blue-50'  },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100', hover: 'hover:border-amber-300 hover:bg-amber-50' },
  purple:{ bg: 'bg-purple-50',icon: 'text-purple-600',border: 'border-purple-100',hover: 'hover:border-purple-300 hover:bg-purple-50'},
  teal:  { bg: 'bg-teal-50',  icon: 'text-teal-600',  border: 'border-teal-100',  hover: 'hover:border-teal-300 hover:bg-teal-50'  },
  slate: { bg: 'bg-slate-50', icon: 'text-slate-600', border: 'border-slate-100', hover: 'hover:border-slate-300 hover:bg-slate-50' },
}

interface ServicesSectionProps {
  services: Service[]
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] || Droplets
  const colors = colorMap[service.color] || colorMap.green

  return (
    <motion.div variants={fadeUpVariant}>
      <Link
        href={`/dich-vu/${service.slug}`}
        className={`group block rounded-2xl border bg-white p-7 transition-all duration-300 shadow-sm hover:shadow-lg ${colors.border} ${colors.hover}`}
      >
        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-7 w-7 ${colors.icon}`} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {service.shortDescription}
        </p>
        <ul className="space-y-1 mb-5">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
              <span className={`h-1.5 w-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')}`} />
              {f}
            </li>
          ))}
        </ul>
        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${colors.icon} group-hover:gap-2.5 transition-all`}>
          Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
  )
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <AnimatedSection className="mb-16">
          <SectionTitle
            label="Dịch vụ của chúng tôi"
            title="Giải pháp toàn diện cho mọi nhu cầu môi trường"
            description="Từ thiết kế, thi công đến vận hành và bảo trì, ETS Vietnam đồng hành cùng doanh nghiệp trong toàn bộ vòng đời hệ thống."
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </StaggerContainer>

        <AnimatedSection className="mt-12 text-center" delay={0.2}>
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group"
          >
            Xem tất cả dịch vụ
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  )
}
