'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Play, Shield, Award, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gray-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-green-950/30 to-blue-950/40" />

        {/* Animated green orb */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-green-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated blue orb */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
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
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
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
            ETS Vietnam chuyên thiết kế và thi công hệ thống xử lý nước thải, nước cấp, 
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

        {/* Floating stats card */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4 w-52">
            {[
              { value: '500+', label: 'Dự án' },
              { value: '200+', label: 'Khách hàng' },
              { value: '15+', label: 'Năm kinh nghiệm' },
              { value: '30+', label: 'Kỹ sư chuyên gia' },
            ].map(({ value, label }) => (
              <div key={label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <p className="text-2xl font-bold text-green-400">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs">Cuộn xuống</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  )
}
