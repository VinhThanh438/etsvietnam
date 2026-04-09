'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Building2, Phone, Mail, MapPin, User, Globe, FileText } from 'lucide-react'

export function IntroductionSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Introduction - Left Side (8 cols) */}
          <div className="lg:col-span-12 xl:col-span-8">
            <AnimatedSection>
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700 mb-5 border border-green-100">
                  <FileText className="w-4 h-4" />
                  Lời nói đầu
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Kính gửi Quý khách hàng!
                </h2>
              </div>
            </AnimatedSection>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <AnimatedSection delay={0.1}>
                <p>
                  Công ty Cổ phần <span className="text-green-700 font-bold uppercase">ETS VIỆT NAM</span> xin gửi tới Quý Khách hàng, đối tác lời chào trân trọng và lời chúc sức khỏe!
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p>
                  Công ty Cổ phần ETS VIỆT NAM được thành lập từ năm 2018 trên nền tảng là sự kế thừa năng lực, kinh nghiệm, nhân sự của <span className="text-gray-900 font-medium">Công ty Cổ phần Thiết kế Công nghiệp Hóa chất (CECO)</span>, <span className="text-gray-900 font-medium">Công ty Cổ phần Cơ – Điện – Môi trường Lilama</span>, <span className="text-gray-900 font-medium">Công ty TNHH Tiên Phong Xanh</span>…
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p>
                  Sau 4 năm xây dựng và phát triển, chúng tôi đã có một đội ngũ nhân sự có chuyên môn, tâm huyết, cùng chí hướng và trở thành một tập thể vững mạnh trong lĩnh vực các giải pháp về Môi Trường.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p className="bg-green-50/50 p-6 rounded-2xl border-l-4 border-green-600 italic">
                  "Với mục tiêu mang tới cho Quý khách hàng các giải pháp xử lý tối ưu, hiệu quả và chi phí hợp lý, đội ngũ cán bộ, nhân viên của Công ty không ngừng tích lũy, học tập, nghiên cứu và phát triển các công nghệ xử lý tiên tiến, hiện đại để mang lại lợi ích kinh tế cho khách hàng, lợi ích môi trường cho xã hội và vì một Việt Nam phát triển bền vững."
                </p>
              </AnimatedSection>
            </div>
          </div>

          {/* General Info - Right Side (4 cols) - Cards with glassmorphism */}
          <div className="lg:col-span-12 xl:col-span-4 mt-8 xl:mt-0">
            <AnimatedSection direction="right" delay={0.5}>
              <div className="relative p-8 rounded-3xl bg-slate-900 text-white shadow-2xl overflow-hidden group">
                {/* Background patterns */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-colors" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
                
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-green-400">
                    <Building2 className="w-5 h-5" />
                  </span>
                  Thông tin chung
                </h3>

                <div className="space-y-6 relative z-10">
                  {[
                    { icon: Building2, label: 'Tên Công Ty', value: 'CÔNG TY CỔ PHẦN ETS VIỆT NAM', color: 'text-green-400' },
                    { icon: Globe, label: 'Tên Tiếng Anh', value: 'ETS VIỆT NAM ENVIRONMENT JOINT STOCK COMPANY.', color: 'text-blue-400' },
                    { icon: FileText, label: 'Mã Số Doanh Nghiệp', value: '0108115359', color: 'text-yellow-400' },
                    { icon: User, label: 'Người Đại Diện', value: 'ĐỖ HOÀNG THU (Tổng Giám Đốc)', color: 'text-purple-400' },
                    { icon: MapPin, label: 'Địa Chỉ', value: 'Tầng 2, Tháp A, Tòa T608 Phổ Tôn Quang Phiệt, Phường Cỗ Nhuế 1, Quận Bắc Từ Liêm, HN', color: 'text-red-400' },
                    { icon: Phone, label: 'Điện Thoại', value: '0879.343.999', color: 'text-orange-400' },
                    { icon: Mail, label: 'Email', value: 'info@etsvietnam.vn', color: 'text-cyan-400' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className={`shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${item.color} group-hover/item:bg-white/10 transition-colors`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">{item.label}</p>
                        <p className="text-sm font-medium text-gray-200 group-hover/item:text-white transition-colors">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 relative z-10 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {i}
                      </div>
                    ))}
                  </div>
                  <a 
                    href="https://www.etsvietnam.vn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-green-400 hover:text-green-300 transition-colors flex items-center gap-1.5"
                  >
                    www.etsvietnam.vn
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  )
}
