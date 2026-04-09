import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteConfig } from '@/lib/data/site'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CheckCircle, Award, Users, Leaf, Phone } from 'lucide-react'
import { IntroductionSection } from '@/components/sections/IntroductionSection'

export const metadata: Metadata = {
  title: 'Giới thiệu | ETS VN',
  description: 'Giới thiệu về CÔNG TY CỔ PHẦN MÔI TRƯỜNG ETS VIỆT NAM - thành lập từ năm 2018 trên nền tảng kế thừa năng lực sâu rộng.',
}

const milestones = [
  { year: '2018', event: 'Thành lập ETS VIỆT NAM, kế thừa năng lực từ CECO, Lilama, Tiên Phong Xanh' },
  { year: '2019', event: 'Phát triển mạnh mẽ đội ngũ kỹ sư chuyên môn cao' },
  { year: '2020', event: 'Hoàn thành nhiều dự án môi trường trọng điểm cho các KCN' },
  { year: '2021', event: 'Đạt mốc 4 năm xây dựng và trở thành tập thể vững mạnh' },
  { year: '2022', event: 'Nghiên cứu & phát triển các công nghệ xử lý tiên tiến' },
  { year: '2023', event: 'Mở rộng thị trường toàn quốc và khẳng định vị thế bền vững' },
]

const values = [
  { icon: CheckCircle, title: 'Chất lượng', desc: 'Cam kết giải pháp tối ưu, hiệu quả vượt mong đợi.' },
  { icon: Award, title: 'Uy tín', desc: 'Xây dựng niềm tin dựa trên kết quả thực tế.' },
  { icon: Leaf, title: 'Bền vững', desc: 'Vì một Việt Nam phát triển xanh và sạch hơn.' },
  { icon: Users, title: 'Tâm huyết', desc: 'Đội ngũ nhân sự chuyên môn cao và cùng chí hướng.' },
]

export default async function AboutPage() {
  const config = await getSiteConfig()
  const { company } = config

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 py-24 text-white">
        <Container>
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
                Về chúng tôi
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 uppercase tracking-tight">CÔNG TY CỔ PHẦN <br/>ETS VIỆT NAM</h1>
              <div className="w-20 h-1.5 bg-green-500 mx-auto mb-6 rounded-full" />
              <p className="text-green-100 text-lg opacity-90">{company.slogan}</p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Introduction Letter & General Info */}
      <IntroductionSection />

      {/* Core values */}
      <section className="py-24 bg-gray-50">
        <Container>
          <AnimatedSection className="mb-12">
            <SectionTitle label="Giá trị cốt lõi" title="Những gì chúng tôi tin tưởng" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow h-full">
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
      <section className="py-24 bg-white overflow-hidden">
        <Container>
          <AnimatedSection className="mb-16">
            <SectionTitle label="Lịch sử phát triển" title="Hành trình xây dựng & trưởng thành" />
          </AnimatedSection>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-100 hidden md:block" />
            
            <div className="space-y-12 relative">
              {milestones.map(({ year, event }, idx) => (
                <AnimatedSection key={year} delay={idx * 0.1} direction={idx % 2 === 0 ? 'left' : 'right'}>
                  <div className={`flex items-center gap-10 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:border-green-200 group relative">
                        {/* Blob backdrop */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-10 blur transition duration-500`} />
                        
                        <div className="relative bg-white rounded-2xl">
                          <span className="inline-block text-green-600 font-black text-3xl mb-3">{year}</span>
                          <p className="text-gray-700 leading-relaxed font-medium">{event}</p>
                        </div>
                      </div>
                    </div>
                    {/* Circle on line */}
                    <div className="shrink-0 z-10 hidden md:flex h-6 w-6 rounded-full bg-white border-4 border-green-500 shadow-md transform -translate-x-1/2 left-1/2 absolute" />
                    <div className="md:w-1/2" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        {/* Background images/patterns */}
        <div className="absolute inset-0 bg-green-700" />
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <Leaf className="w-[500px] h-[500px] rotate-12" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Bạn cần giải pháp môi trường tối ưu?</h2>
            <p className="text-green-100 mb-10 text-lg opacity-90">
              Hãy để chuyên gia của ETS Việt Nam đồng hành cùng dự án của bạn với công nghệ tiên tiến nhất.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-green-700 font-bold px-8 py-4 hover:bg-green-50 transition-all shadow-xl hover:-translate-y-1"
                >
                Liên hệ tư vấn ngay
                </Link>
                <a
                href={`tel:${config.company.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 text-white font-bold px-8 py-4 hover:bg-green-500 transition-all shadow-xl hover:-translate-y-1 border border-white/20"
                >
                <Phone className="w-5 h-5" />
                {config.company.phone}
                </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
