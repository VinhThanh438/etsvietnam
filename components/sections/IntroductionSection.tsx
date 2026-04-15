"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import {
  Building2,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

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
                  Công ty Cổ phần{" "}
                  <span className="text-green-700 font-bold uppercase">
                    ETS VIỆT NAM
                  </span>{" "}
                  xin gửi tới Quý Khách hàng, đối tác lời chào trân trọng và lời
                  chúc sức khỏe!
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p>
                  Công ty Cổ phần môi trường ETS VIỆT NAM được thành lập từ năm
                  2018 trên nền tảng là sự kế thừa năng lực, kinh nghiệm, nhân
                  sự của{" "}
                  <span className="text-gray-900 font-medium">
                    Công ty Cổ phần Thiết kế Công nghiệp Hóa chất (CECO)
                  </span>
                  ,{" "}
                  <span className="text-gray-900 font-medium">
                    Công ty Cổ phần Cơ – Điện – Môi trường Lilama
                  </span>
                  ,{" "}
                  <span className="text-gray-900 font-medium">
                    Công ty TNHH Tiên Phong Xanh
                  </span>
                  …
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p>
                  Sau {new Date().getFullYear() - 2018} năm xây dựng và phát triển, chúng tôi đã có một đội ngũ
                  nhân sự có chuyên môn, tâm huyết, cùng chí hướng và trở thành
                  một tập thể vững mạnh trong lĩnh vực các giải pháp về Môi
                  Trường.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p className="bg-green-50/50 p-6 rounded-2xl border-l-4 border-green-600 italic">
                  Với mục tiêu mang tới cho Quý khách hàng các giải pháp xử lý
                  tối ưu, hiệu quả và chi phí hợp lý, đội ngũ cán bộ, nhân viên
                  của Công ty không ngừng tích lũy, học tập, nghiên cứu và phát
                  triển các công nghệ xử lý tiên tiến, hiện đại để mang lại lợi
                  ích kinh tế cho khách hàng, lợi ích môi trường cho xã hội và
                  vì một Việt Nam phát triển bền vững.
                </p>
              </AnimatedSection>
            </div>
          </div>

          {/* General Info - Right Side (4 cols) - Cards with clean aesthetic */}
          <div className="lg:col-span-12 xl:col-span-4 mt-8 xl:mt-0">
            <AnimatedSection direction="right" delay={0.5}>
              <div className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group">
                {/* Background patterns */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-50 rounded-full blur-3xl group-hover:bg-green-100/50 transition-colors" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors" />

                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10 text-gray-900">
                  <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                    <Building2 className="w-5 h-5" />
                  </span>
                  Thông tin doanh nghiệp
                </h3>

                <div className="space-y-6 relative z-10">
                  {[
                    {
                      icon: Building2,
                      label: "Tên Công Ty",
                      value: "CÔNG TY CỔ PHẦN MÔI TRƯỜNG ETS VIỆT NAM",
                    },
                    {
                      icon: Globe,
                      label: "Tên Tiếng Anh",
                      value: "ETS VIET NAM ENVIRONMENT JOINT STOCK COMPANY.",
                    },
                    {
                      icon: FileText,
                      label: "Mã Số Doanh Nghiệp",
                      value: "0108115359",
                    },
                    {
                      icon: User,
                      label: "Người Đại Diện",
                      value: "Vũ Thị Thanh Nga (Tổng giám đốc)",
                    },
                    {
                      icon: MapPin,
                      label: "Trụ sở chính",
                      value:
                        "Tầng 3, G14 Khu biệt thự ghép Làng quốc tế Thăng Long, Phường Nghĩa Đô, Thành phố Hà Nội, Việt Nam",
                    },
                    { icon: Phone, label: "Điện Thoại", value: "0879343999" },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "ets.congty@gmail.com",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className="shrink-0 w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-green-600 group-hover/item:bg-green-600 group-hover/item:text-white transition-all duration-300">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 relative z-10 flex items-center justify-between">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-gray-500">
                      Giấy phép ĐKKD
                    </span>
                  </div>
                  <a
                    href="https://www.etsvietnam.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors flex items-center gap-1.5"
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
  );
}
