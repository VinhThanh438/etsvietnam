'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { Building2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Partner } from '@/lib/types'

interface PartnersSectionProps {
  partners: Partner[]
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex-shrink-0 w-48 mx-4">
      <div className="h-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center px-8 hover:border-green-500/50 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
        {/* Hover glow inside card */}
        <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex flex-col items-center gap-2 text-center relative z-10 w-full h-full justify-center">
          {partner.logo && !imageError ? (
            <div className="relative w-full h-12 flex items-center justify-center">
              <NextImage 
                src={partner.logo} 
                alt={partner.name}
                fill
                className="object-contain filter grayscale brightness-200 contrast-0 opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-500"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <>
              <Building2 className="h-7 w-7 text-white/20 group-hover:text-green-400 transition-colors duration-500" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/40 group-hover:text-white transition-colors duration-500 leading-tight">
                {partner.name}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  // Duplicate for seamless infinite scroll
  const doubled = [...partners, ...partners]

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden border-y border-white/5">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <Container className="relative z-10">
        <AnimatedSection className="mb-16">
          <SectionTitle
            dark
            label="Đối tác & Khách hàng"
            title="Sự tin hân hạnh đồng hành cùng các đơn vị đầu ngành"
            description="ETS VN tự hào là đối tác chiến lược của hơn 200 doanh nghiệp, tập đoàn lớn trong và ngoài nước."
          />
        </AnimatedSection>
      </Container>

      {/* Infinite scroll marquee */}
      <div className="relative z-10 overflow-hidden mt-4 py-8">
        <div className="flex marquee-track" style={{ width: 'max-content' }}>
          {doubled.map((partner, idx) => (
            <PartnerLogo key={`${partner.id}-${idx}`} partner={partner} />
          ))}
        </div>

        {/* Fadient overlays on sides for smooth marquee */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-20" />
      </div>
    </section>
  )
}
