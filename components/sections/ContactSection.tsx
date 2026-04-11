'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import type { SiteConfig } from '@/lib/types'

interface ContactSectionProps {
  config: SiteConfig
}

export function ContactSection({ config }: ContactSectionProps) {
  const { company } = config
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Có lỗi xảy ra. Vui lòng thử lại.')
      }
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại sau.')
    } finally {
      setSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Điện thoại', value: company.phone, href: `tel:${company.phone}` },
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: 'Địa chỉ', value: company.address, href: '#map' },
    { icon: Clock, label: 'Giờ làm việc', value: 'Thứ 2 – Thứ 7: 7:30 – 17:30', href: null },
  ]

  const services = [
    'Xử lý nước thải', 'Xử lý nước cấp', 'Xử lý khí thải',
    'Quan trắc môi trường', 'Tư vấn môi trường', 'Khác',
  ]

  return (
    <section className="py-24 bg-white">
      <Container>
        <AnimatedSection className="mb-16">
          <SectionTitle
            label="Liên hệ"
            title="Cần tư vấn giải pháp?"
            description="Điền thông tin bên dưới, đội ngũ kỹ sư của chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ làm việc."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-3" direction="left">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl bg-green-50 border border-green-100">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Đã gửi thành công!</h3>
                <p className="text-gray-600">
                  Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0901 234 567"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="email@congty.vn"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Dịch vụ quan tâm
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all bg-white"
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Mô tả nhu cầu của bạn (công suất, loại nước thải, vị trí...)"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className={`w-full ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  iconRight={<Send className="h-5 w-5" />}
                  disabled={submitting}
                >
                  {submitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                </Button>
              </form>
            )}
          </AnimatedSection>

          {/* Contact Info + Map */}
          <AnimatedSection className="lg:col-span-2 space-y-6" direction="right" delay={0.1}>
            {/* Contact details */}
            <div className="rounded-2xl bg-green-700 text-white p-7">
              <h3 className="font-bold text-lg mb-6">Thông tin liên hệ</h3>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-3">
                    <div className="shrink-0 h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-green-100" />
                    </div>
                    <div>
                      <p className="text-green-200 text-xs mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium hover:text-green-200 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div id="map" className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.9143904780528!2d105.79027444842995!3d21.03953583605579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab377049923b%3A0x4a0e449e61022860!2zTMOgbmcgUXXhu5FjIHThur8gVGjEg25nIExvbmcsIE5naGlhIERvLCBIYSBOb2ksIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1775668053293!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ETS VN Location"
              />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
