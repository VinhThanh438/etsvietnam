import Link from 'next/link'
import NextImage from 'next/image'
import { Leaf, Phone, Mail, MapPin, ExternalLink, Globe } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import type { SiteConfig } from '@/lib/types'

interface FooterProps {
  config: SiteConfig
}

const services = [
  { label: 'Xử lý nước thải', href: '/dich-vu/xu-ly-nuoc-thai' },
  { label: 'Xử lý nước cấp', href: '/dich-vu/xu-ly-nuoc-cap' },
  { label: 'Xử lý khí thải', href: '/dich-vu/xu-ly-khi-thai' },
  { label: 'Lò đốt chất thải', href: '/dich-vu/lo-dot-chat-thai' },
  { label: 'Vận hành & Bảo trì', href: '/dich-vu/van-hanh-bao-tri' },
]

export function Footer({ config }: FooterProps) {
  const { company, nav } = config

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${company.logo ? 'bg-transparent' : 'bg-green-600'
                }`}>
                {company.logo ? (
                  <NextImage
                    src={company.logo}
                    alt={company.name}
                    width={36}
                    height={36}
                    className="object-contain rounded-lg"
                  />
                ) : (
                  <Leaf className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-none">ETS VN</p>
                <p className="text-xs text-gray-400">Giải pháp & Môi trường</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              {company.slogan}. Đối tác tin cậy trong lĩnh vực môi trường.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${company.phone}`} className="flex items-start gap-2.5 hover:text-green-400 transition-colors">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-start gap-2.5 hover:text-green-400 transition-colors">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                {company.email}
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                <span className="text-gray-400">{company.address}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Trang
            </h3>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Dịch vụ
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Liên hệ tư vấn
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              Đội ngũ kỹ sư của chúng tôi sẵn sàng hỗ trợ bạn 24/7.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
            >
              Yêu cầu tư vấn
              <ExternalLink className="h-4 w-4" />
            </Link>

            <div className="mt-6">
              <h4 className="text-white font-semibold text-sm mb-3">Theo dõi chúng tôi</h4>
              <a
                href={company.facebook}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {company.fullName}. Bảo lưu mọi quyền.</p>
          <p>Mã số doanh nghiệp: {company.taxCode}</p>
        </Container>
      </div>
    </footer>
  )
}
