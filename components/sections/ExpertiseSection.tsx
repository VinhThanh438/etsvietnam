"use client";

import {
  AnimatedSection,
  StaggerContainer,
  fadeUpVariant,
} from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

const expertises = [
  {
    icon: Settings,
    title: "Giải pháp Công nghệ & Kỹ thuật",
    description:
      "Tư vấn và thiết kế các quy trình công nghệ xử lý nước thải, khí thải và chất thải rắn tiên tiến, tối ưu chi phí vận hành.",
    tags: ["Xử lý nước thải", "Xử lý khí thải", "Chất thải rắn"],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500",
  },
  {
    icon: Zap,
    title: "Thi công & Thiết bị Đồng bộ",
    description:
      "Cung cấp và lắp đặt hệ thống thiết bị xử lý môi trường trọn gói, đảm bảo tính đồng bộ và hiệu suất cao nhất.",
    tags: ["Thiết bị xử lý", "Lắp đặt trọn gói", "Bảo trì hệ thống"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: ClipboardCheck,
    title: "Tư vấn Dự án & Pháp lý",
    description:
      "Lập báo cáo nghiên cứu khả thi, báo cáo kinh tế kỹ thuật và hoàn thiện hồ sơ pháp lý cho các dự án đầu tư môi trường.",
    tags: ["Báo cáo ĐTM", "Nghiên cứu khả thi", "Hồ sơ pháp lý"],
    color: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-500",
  },
];

export function ExpertiseSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: Sticky Content */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <AnimatedSection direction="left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-6">
                Năng lực cốt lõi
              </span>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                Lĩnh vực hoạt động <br />
                <span className="text-green-600">toàn diện</span> của ETS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Với hơn {new Date().getFullYear() - 2018} năm kinh nghiệm, chúng
                tôi không chỉ cung cấp dịch vụ đơn thuần, mà mang đến giải pháp
                kỹ thuật tổng thể cho mọi vấn đề môi trường của doanh nghiệp.
              </p>

              <div className="space-y-4">
                {[
                  "Cam kết đạt tiêu chuẩn QCVN",
                  "Công nghệ tiết kiệm năng lượng",
                  "Hỗ trợ pháp lý trọn đời",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors group"
                >
                  Nhận tư vấn kỹ thuật
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Side: Expertise Cards */}
          <div className="lg:w-2/3">
            <StaggerContainer className="grid gap-6">
              {expertises.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUpVariant}
                  className="group relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-green-200 hover:bg-white hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                    >
                      <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs font-medium text-gray-500 group-hover:border-green-100 group-hover:text-green-600 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Decorative background number */}
                  <span className="absolute top-8 right-8 text-6xl font-black text-gray-900/5 select-none transition-colors group-hover:text-green-500/10">
                    0{index + 1}
                  </span>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
