import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteConfig } from '@/lib/data/site'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CheckCircle, Target, Eye, Award, Users, Leaf, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Giới thiệu | ETS VN',
  description: 'Giới thiệu về CÔNG TY CỔ PHẦN MÔI TRƯỜNG ETS VIỆT NAM - hơn 15 năm kinh nghiệm trong lĩnh vực môi trường.',
}

const milestones = [
  { year: '2010', event: 'Thành lập ETS VN tại TP. Hồ Chí Minh' },
  { year: '2013', event: 'Mở rộng chi nhánh tại Hà Nội và Đà Nẵng' },
  { year: '2016', event: 'Hoàn thành dự án thứ 100, vươn ra thị trường quốc tế' },
  { year: '2019', event: 'Chứng nhận ISO 9001:2015 và ISO 14001:2015' },
  { year: '2021', event: 'Đạt mốc 400 dự án, nhận Bằng khen của Bộ TN&MT' },
  { year: '2023', event: 'Giải thưởng Môi trường Xanh, 500+ dự án hoàn thành' },
]

const values = [
  { icon: CheckCircle, title: 'Chất lượng', desc: 'Cam kết sản phẩm đạt tiêu chuẩn quốc tế, bền vững.' },
  { icon: Award, title: 'Uy tín', desc: 'Hơn 15 năm xây dựng niềm tin với khách hàng.' },
  { icon: Leaf, title: 'Bền vững', desc: 'Giải pháp thân thiện môi trường, vì tương lai xanh.' },
  { icon: Users, title: 'Đồng hành', desc: 'Hỗ trợ khách hàng suốt vòng đời hệ thống.' },
]

export default async function AboutPage() {
  const config = await getSiteConfig()
  const { company } = config

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-22 text-white">
        <Container>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Về chúng tôi
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">ETS VN</h1>
              <p className="text-green-200 text-lg">{company.slogan}</p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <SectionTitle label="Giới thiệu" title="Thông điệp từ lãnh đạo" align="left" className="mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">{company.description}</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Với phương châm <em className="text-green-700 font-medium">"Chất lượng là danh dự"</em>,
                chúng tôi không ngừng đầu tư vào công nghệ và con người để mang lại giải pháp tốt
                nhất cho từng dự án.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-green-50 p-5 border border-green-100">
                  <Target className="h-7 w-7 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Sứ mệnh</h3>
                  <p className="text-sm text-gray-600">Cung cấp giải pháp xử lý nước và môi trường hiệu quả, bền vững cho xã hội.</p>
                </div>
                <div className="rounded-2xl bg-blue-50 p-5 border border-blue-100">
                  <Eye className="h-7 w-7 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tầm nhìn</h3>
                  <p className="text-sm text-gray-600">Top 5 công ty môi trường hàng đầu Đông Nam Á vào năm 2030.</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Users className="w-16 h-16 text-green-400 mx-auto mb-2" />
                  <p className="text-sm">Đội ngũ ETS VN</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="py-20 bg-gray-50">
        <Container>
          <AnimatedSection className="mb-12">
            <SectionTitle label="Giá trị cốt lõi" title="Những gì chúng tôi tin tưởng" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 mb-4">
                    <Icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <Container>
          <AnimatedSection className="mb-16">
            <SectionTitle label="Lịch sử phát triển" title="Hành trình 15 năm xây dựng" />
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-100 hidden md:block" />
            <div className="space-y-8">
              {milestones.map(({ year, event }, idx) => (
                <AnimatedSection key={year} delay={idx * 0.05}>
                  <div className={`flex items-center gap-6 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm inline-block">
                        <span className="text-green-600 font-bold text-xl">{year}</span>
                        <p className="text-gray-700 mt-1">{event}</p>
                      </div>
                    </div>
                    <div className="shrink-0 z-10 hidden md:flex h-5 w-5 rounded-full bg-green-500 border-4 border-white shadow-md" />
                    <div className="md:w-1/2" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-700 text-white">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng hợp tác?</h2>
            <p className="text-green-200 mb-8">
              Liên hệ ngay để được tư vấn giải pháp phù hợp với nhu cầu của bạn.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-green-700 font-bold px-8 py-4 hover:bg-green-50 transition-colors shadow-lg"
            >
              Liên hệ tư vấn ngay
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
