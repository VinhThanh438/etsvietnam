'use client'

import { CheckCircle, Target, Eye, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection, StaggerContainer, fadeUpVariant } from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'

// Note: This is a Server Component — motion wrappers in children are Client Components
import type { SiteConfig } from '@/lib/types'

interface AboutSectionProps {
  config: SiteConfig
}

const highlights = [
  'Đội ngũ kỹ sư môi trường giàu kinh nghiệm',
  'Áp dụng công nghệ tiên tiến từ châu Âu',
  'Thiết kế tùy chỉnh theo yêu cầu thực tế',
  'Hỗ trợ vận hành và bảo trì dài hạn',
]

export function AboutSection({ config }: AboutSectionProps) {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image / Visual */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Main image placeholder */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-12 h-12 text-green-600" />
                    </div>
                    <p className="text-sm font-medium">Đội ngũ ETS VN</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-20 h-20 rounded-2xl bg-green-600/20 backdrop-blur-sm" />
                <div className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-blue-600/20 backdrop-blur-sm" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <p className="text-4xl font-bold text-green-600">500+</p>
                <p className="text-sm text-gray-500 mt-1">Dự án hoàn thành</p>
              </div>
              <div className="absolute -top-6 -left-6 bg-green-600 rounded-2xl shadow-xl p-5">
                <p className="text-4xl font-bold text-white">15+</p>
                <p className="text-sm text-green-100 mt-1">Năm kinh nghiệm</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection direction="right" delay={0.1}>
            <SectionTitle
              label="Về chúng tôi"
              title="Đối tác tin cậy trong lĩnh vực môi trường"
              align="left"
              className="mb-6"
            />
            <p className="text-gray-600 leading-relaxed mb-4">
              {config.company.description}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Được thành lập năm {config.company.founded}, ETS VN đã trở thành một trong những
              đơn vị hàng đầu trong lĩnh vực xử lý nước thải và môi trường tại Việt Nam với đội
              ngũ hơn 30 kỹ sư và chuyên gia giàu kinh nghiệm.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Mission / Vision cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-green-50 p-5 border border-green-100">
                <Target className="h-7 w-7 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Sứ mệnh</h3>
                <p className="text-sm text-gray-600">Cung cấp các giải pháp xử lý nước và môi trường hiệu quả, bền vững.</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-5 border border-blue-100">
                <Eye className="h-7 w-7 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Tầm nhìn</h3>
                <p className="text-sm text-gray-600">Trở thành công ty môi trường hàng đầu Đông Nam Á vào 2030.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {config.stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}
