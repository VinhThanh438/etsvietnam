'use client'

import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { Partner } from '@/lib/types'
import { Building2 } from 'lucide-react'
import NextImage from 'next/image'
import { useState } from 'react'

interface PartnersSectionProps {
  partners: Partner[]
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex-shrink-0 w-56 mx-6">
      <div className="h-32 rounded-2xl bg-white flex items-center justify-center px-8 hover:scale-105 transition-all duration-500 group relative overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500/20">
        <div className="flex flex-col items-center gap-2 text-center relative z-10 w-full h-full justify-center">
          {partner.logo && !imageError ? (
            <div className="relative w-full h-20 flex items-center justify-center">
              <NextImage
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain transition-all duration-500"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <>
              <Building2 className="h-10 w-10 text-gray-300 group-hover:text-green-500 transition-colors duration-500" />
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400 group-hover:text-gray-900 transition-colors duration-500 leading-tight">
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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <NextImage
          src="/images/partner-bg2.jfif"
          alt="Partners background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gray-950/30" />
      </div>

      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent opacity-40" />

      <Container className="relative z-10">
        <AnimatedSection className="mb-16">
          <SectionTitle
            dark
            label="Đối tác & Khách hàng"
            title="Chúng tôi hân hạnh đồng hành cùng các đơn vị đầu ngành"
            description="ETS VN tự hào là đối tác chiến lược của nhiều doanh nghiệp, tập đoàn lớn trong lĩnh vực xây dựng và môi trường."
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
