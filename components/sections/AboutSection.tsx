'use client'

import { CheckCircle, Target, Eye, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Note: This is a Server Component — motion wrappers in children are Client Components
import type { SiteConfig } from '@/lib/types'

function CountUp({ value, duration = 2 }: { value: string, duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      const numericValue = parseInt(value)
      const controls = animate(0, numericValue, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      })
      return controls.stop
    }
  }, [inView, value, duration])

  return <span ref={ref}>{displayValue}</span>
}

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: 2x2 Stat Cards Column + Highlights (lg:col-span-5) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col h-full">
            <AnimatedSection direction="left" className="flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4 mb-10">
                {/* Stat 1: Years */}
                <div className="p-7 rounded-[2rem] bg-green-600 text-white shadow-lg shadow-green-900/10 group hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between min-h-[195px]">
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                    <Target className="w-5.5 h-5.5 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-black mb-1 flex items-baseline gap-1">
                      <CountUp value={config.stats[0].value.replace(/\D/g, '')} />
                      <span className="text-2xl text-green-200">+</span>
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-green-100 leading-tight">{config.stats[0].label}</p>
                  </div>
                </div>

                {/* Stat 2: Projects */}
                <div className="p-7 rounded-[2rem] bg-white border border-gray-100 shadow-md shadow-gray-900/[0.02] group hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between min-h-[195px]">
                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-5.5 h-5.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-black mb-1 text-gray-900 flex items-baseline gap-1">
                      <CountUp value={config.stats[1].value.replace(/\D/g, '')} />
                      <span className="text-2xl text-green-500">+</span>
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 leading-tight">{config.stats[1].label}</p>
                  </div>
                </div>

                {/* Stat 3: Customers */}
                <div className="p-7 rounded-[2rem] bg-white border border-gray-100 shadow-md shadow-gray-900/[0.02] group hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between min-h-[195px]">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Users className="w-5.5 h-5.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-black mb-1 text-gray-900 flex items-baseline gap-1">
                      <CountUp value={config.stats[2].value.replace(/\D/g, '')} />
                      <span className="text-2xl text-blue-500">+</span>
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 leading-tight">{config.stats[2].label}</p>
                  </div>
                </div>

                {/* Stat 4: Experts */}
                <div className="p-7 rounded-[2rem] bg-gray-900 text-white shadow-lg shadow-gray-900/10 group hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between min-h-[195px]">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                    <Eye className="w-5.5 h-5.5 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-black mb-1 flex items-baseline gap-1">
                      <CountUp value={config.stats[3].value.replace(/\D/g, '')} />
                      <span className="text-2xl text-blue-400">+</span>
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 leading-tight">{config.stats[3].label}</p>
                  </div>
                </div>
              </div>

              {/* highlights */}
              <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                  Thế mạnh vượt trội
                </h3>
                <ul className="space-y-4">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="font-medium text-[13px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Content (lg:col-span-7) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col h-full">
            <AnimatedSection direction="right" delay={0.1} className="flex-1 flex flex-col">
              <SectionTitle
                label="Về chúng tôi"
                title="Đối tác tin cậy trong lĩnh vực môi trường"
                align="left"
                className="mb-8"
              />
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p>
                  {config.company.description}
                </p>
                <p>
                  Được thành lập phát triển từ năm {config.company.founded}, ETS VN đã khẳng định được vị thế là một trong những đơn vị dẫn đầu về giải pháp môi trường bền vững tại Việt Nam.
                </p>
              </div>

              {/* Mission / Vision cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                <div className="rounded-[2.5rem] bg-white p-12 border border-gray-100 shadow-xl shadow-gray-900/[0.03] hover:border-green-100 transition-all duration-300 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-8 shrink-0">
                    <Target className="h-7 w-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Sứ mệnh</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">Cung cấp giải pháp xử lý môi trường tối ưu, bảo vệ tài nguyên quốc gia cho thế hệ mai sau.</p>
                  </div>
                </div>
                
                <div className="rounded-[2.5rem] bg-white p-12 border border-gray-100 shadow-xl shadow-gray-900/[0.03] hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 shrink-0">
                    <Eye className="h-7 w-7 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Tầm nhìn</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">Trở thành biểu tượng niềm tin hàng đầu về kỹ thuật xử lý môi trường tại Đông Nam Á vào 2030.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  )
}
