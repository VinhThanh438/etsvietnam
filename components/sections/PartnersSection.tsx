'use client'

import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Partner } from '@/lib/types'

interface PartnersSectionProps {
  partners: Partner[]
}

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="flex-shrink-0 w-44 mx-4">
      <div className="h-20 rounded-xl border border-gray-200 bg-white flex items-center justify-center px-6 hover:border-green-300 hover:shadow-md transition-all duration-300 group">
        {/* Real logo would go via next/image when images exist */}
        <div className="flex flex-col items-center gap-1 text-center">
          <Building2 className="h-6 w-6 text-gray-300 group-hover:text-green-500 transition-colors" />
          <span className="text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors leading-tight">
            {partner.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  // Duplicate for seamless infinite scroll
  const doubled = [...partners, ...partners]

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <Container>
        <AnimatedSection className="mb-12">
          <SectionTitle
            label="Đối tác & Khách hàng"
            title="Được tin tưởng bởi các doanh nghiệp hàng đầu"
            description="ETS Vietnam tự hào là đối tác chiến lược của hơn 200 doanh nghiệp, tập đoàn lớn trong và ngoài nước."
          />
        </AnimatedSection>
      </Container>

      {/* Infinite scroll marquee */}
      <div className="overflow-hidden mt-4">
        <div className="flex marquee-track" style={{ width: 'max-content' }}>
          {doubled.map((partner, idx) => (
            <PartnerLogo key={`${partner.id}-${idx}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
