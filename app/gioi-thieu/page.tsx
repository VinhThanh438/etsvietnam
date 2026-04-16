import { IntroductionSection } from "@/components/sections/IntroductionSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/ui/PageBanner";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getSiteConfig } from "@/lib/data/site";
import { Award, FileCheck, Phone, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giới thiệu | ETS VN",
  description:
    "Giới thiệu về CÔNG TY CỔ PHẦN MÔI TRƯỜNG ETS VIỆT NAM - thành lập từ năm 2018 trên nền tảng kế thừa năng lực sâu rộng.",
};

const milestones = [
  {
    year: "2018",
    event:
      "Thành lập ETS VIỆT NAM, kế thừa năng lực từ CECO, Lilama, Tiên Phong Xanh",
  },
  { year: "2019", event: "Phát triển mạnh mẽ đội ngũ kỹ sư chuyên môn cao" },
  {
    year: "2020",
    event: "Hoàn thành nhiều dự án môi trường trọng điểm cho các KCN",
  },
  {
    year: "2021",
    event: "Đạt mốc 4 năm xây dựng và trở thành tập thể vững mạnh",
  },
  {
    year: "2022",
    event: "Nghiên cứu & phát triển các công nghệ xử lý tiên tiến",
  },
  {
    year: "2023",
    event: "Mở rộng thị trường toàn quốc và khẳng định vị thế bền vững",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "UY TÍN",
    desc: "Toàn bộ hoạt động kinh doanh của ETS VIỆT NAM lấy khách hàng làm trọng tâm phục vụ. Hơn ai hết đội ngũ ETS VIỆT NAM luôn hết mình và đưa ra các giải pháp tối ưu nhất trong quá trình tư vấn dịch vụ và thi công cho khách hàng.",
  },
  {
    icon: Users,
    title: "CHẤT LƯỢNG",
    desc: "ETS VIỆT NAM tự hào đầu tư đổi mới, trang bị thêm máy móc thiết bị, chú trọng phát huy sáng tạo sáng kiến cải tiến kỹ thuật. Nâng cao tầm nhìn, kiến thức của kỹ sư đặc biệt trau dồi và tiếp cận các công nghệ mới trên thị trường.",
  },
  {
    icon: Award,
    title: "TIẾN ĐỘ",
    desc: "Phát huy tối đa nguồn nội lực về tài chính, nhân lực, vật tư, thiết bị tăng cường hợp tác với các đối tác tin cậy trong suốt quá trình thi công để đảm bảo tiến độ nhanh nhất, góp phần tiết kiệm chi phí của doanh nghiệp, sớm đưa công trình dự án vào khai thác sử dụng phục vụ cho sản xuất, kinh doanh.",
  },
  {
    icon: FileCheck,
    title: "HIỆU QUẢ",
    desc: "Tiêu chí quan trọng nhất của một doanh nghiệp phát triển ổn định bền vững là hiệu quả kinh tế – xã hội của hoạt động sản xuất kinh doanh. Chúng tôi không ngừng nghiên cứu, áp dụng các giải pháp tối ưu để rút ngắn thời gian thi công, tiết kiệm tối đa chi phí cho khách hàng, đảm bảo an toàn trong quá trình sử dụng công trình.",
  },
];

export default async function AboutPage() {
  const config = await getSiteConfig();
  const { company } = config;

  return (
    <>
      {/* Hero */}
      <PageBanner>
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5">
              Về chúng tôi
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 uppercase tracking-tight">
              CÔNG TY CỔ PHẦN MÔI TRƯỜNG <br />
              ETS VIỆT NAM
            </h1>
            <div className="w-20 h-1.5 bg-green-500 mx-auto mb-6 rounded-full" />
            <p className="text-green-100 text-lg opacity-90">
              {company.slogan}
            </p>
          </div>
        </AnimatedSection>
      </PageBanner>

      {/* Introduction Letter & General Info */}
      <IntroductionSection />

      {/* Core values - Modern Interactive Grid */}
      <section className="py-24 bg-gray-50">
        <Container>
          <AnimatedSection className="mb-12">
            <SectionTitle
              label="Giá trị cốt lõi"
              title="Những gì chúng tôi tin tưởng"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group relative h-[440px] rounded-[2.5rem] bg-gray-50/50 border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/10 hover:border-green-200">
                  {/* Default Content */}
                  <div className="absolute inset-0 p-10 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-10 relative">
                      <div className="absolute inset-0 bg-green-500/5 rounded-[2.5rem] animate-pulse" />
                      <Icon className="h-10 w-10 text-green-600 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4">{title}</h3>
                    <div className="w-10 h-1 bg-green-500/20 rounded-full group-hover:w-20 transition-all duration-500" />
                    <p className="mt-6 text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] bg-gray-100 px-4 py-1.5 rounded-full">Xem chi tiết</p>
                  </div>

                  {/* Hover Content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-800 p-8 flex flex-col items-start justify-start opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out overflow-y-auto custom-scrollbar">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight uppercase shrink-0">{title}</h3>
                    {/* The Green Line - Ensuring it shows for all */}
                    <div className="w-12 h-1 min-h-[4px] bg-green-400 mb-5 rounded-full shrink-0" />
                    <p className="text-white/95 text-[13px] leading-relaxed font-medium">
                      {desc}
                    </p>
                  </div>
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
            <SectionTitle
              label="Lịch sử phát triển"
              title="Hành trình xây dựng & trưởng thành"
            />
          </AnimatedSection>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-100 hidden md:block" />

            <div className="space-y-12 relative">
              {milestones.map(({ year, event }, idx) => (
                <AnimatedSection
                  key={year}
                  delay={idx * 0.1}
                  direction={idx % 2 === 0 ? "left" : "right"}
                >
                  <div
                    className={`flex items-center gap-10 md:gap-0 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div
                      className={`md:w-1/2 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}
                    >
                      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:border-green-200 group relative">
                        {/* Blob backdrop */}
                        <div
                          className={`absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-10 blur transition duration-500`}
                        />

                        <div className="relative bg-white rounded-2xl">
                          <span className="inline-block text-green-600 font-black text-3xl mb-3">
                            {year}
                          </span>
                          <p className="text-gray-700 leading-relaxed font-medium">
                            {event}
                          </p>
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
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-bg.jpg"
            alt="Contact background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bạn cần giải pháp môi trường tối ưu?
            </h2>
            <p className="text-white mb-10 text-lg opacity-90">
              Hãy để chuyên gia của ETS Việt Nam đồng hành cùng dự án của bạn
              với công nghệ tiên tiến nhất.
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
  );
}
