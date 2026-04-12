'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Shield, Award, CheckCircle, Briefcase, Users, Timer, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

export function HeroSection({ slides, stats = [] }: { slides?: { id: string, image: string }[], stats?: { value: string, label: string }[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!slides || slides.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Background Slideshow */}
        {slides && slides.length > 0 && (
          <div className="absolute inset-0 z-0">
            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute flex inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
              />
            </AnimatePresence>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gray-950/60 sm:bg-gray-950/70" />
          </div>
        )}

        {/* Fallback Base gradient if no slides */}
        {(!slides || slides.length === 0) && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-green-950/30 to-blue-950/40" />
        )}

        {/* Animated green orb */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-green-500/10 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated blue orb */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Hơn 15 năm kinh nghiệm trong lĩnh vực môi trường
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Giải pháp{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                môi trường
              </span>
              {' '}bền vững cho{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                tương lai
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              ETS Việt Nam chuyên thiết kế và thi công hệ thống xử lý nước thải, nước cấp,
              khí thải và tư vấn môi trường với hơn{' '}
              <span className="text-green-400 font-semibold">500 dự án</span> thực hiện trên toàn quốc.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button href="/du-an" size="lg" variant="primary" iconRight={<ArrowRight className="h-5 w-5" />}>
                Xem dự án
              </Button>
              <Button href="/lien-he" size="lg" variant="white">
                Liên hệ tư vấn
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              {[
                { icon: Shield, text: 'Chứng nhận ISO 9001' },
                { icon: Award, text: 'Giải thưởng Môi trường Xanh 2023' },
                { icon: CheckCircle, text: 'Đảm bảo chất lượng QCVN' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon className="h-4 w-4 text-green-500 shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats Card Wrapper */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative w-full max-w-[280px]"
            >
              {/* Decorative glow behind card */}
              <div className="absolute -inset-4 bg-green-500/20 blur-2xl rounded-[2rem] -z-10" />

              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-6 shadow-2xl overflow-hidden relative group">
                {/* Animated gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {(stats.length > 0 ? stats : [
                  { value: '500+', label: 'Dự án hoàn thành' },
                  { value: '200+', label: 'Đối tác tin cậy' },
                  { value: '15+', label: 'Năm kinh nghiệm' },
                  { value: '30+', label: 'Chuyên gia đầu ngành' },
                ]).slice(0, 4).map(({ value, label }, index) => {
                  const icons = [Briefcase, Users, Timer, GraduationCap]
                  const Icon = icons[index % icons.length]
                  return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="relative z-10 border-b border-white/10 pb-4 last:border-0 last:pb-0 group/item"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover/item:bg-green-500/20 transition-colors">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          {value}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mt-0.5">{label}</p>
                      </div>
                    </div>
                  </motion.div>
                )})}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Khám phá</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  )
}
