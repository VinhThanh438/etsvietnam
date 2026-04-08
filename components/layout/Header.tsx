'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import type { SiteConfig } from '@/lib/types'

interface HeaderProps {
  config: SiteConfig
}

export function Header({ config }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        )}
      >
        {/* Top bar */}
        <div className={cn(
          'hidden md:block transition-all duration-300 overflow-hidden',
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        )}>
          <div className="bg-green-700 text-green-50 text-sm py-1.5">
            <Container className="flex items-center justify-between">
              <p className="text-xs">
                Hơn 15 năm kinh nghiệm — 500+ dự án thành công toàn quốc
              </p>
              <a
                href={`tel:${config.company.phone}`}
                className="flex items-center gap-1.5 font-semibold hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {config.company.phone}
              </a>
            </Container>
          </div>
        </div>

        {/* Main nav */}
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                config.company.logo
                  ? "bg-transparent"
                  : "bg-green-600 shadow-md shadow-green-200 group-hover:bg-green-700"
              )}>
                {config.company.logo ? (
                  <NextImage
                    src={config.company.logo}
                    alt={config.company.name}
                    width={36}
                    height={36}
                    className="object-contain rounded-lg"
                  />
                ) : (
                  <Leaf className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="leading-tight">
                <p className={cn(
                  'font-bold text-lg leading-none transition-colors',
                  isScrolled ? 'text-gray-900' : 'text-white'
                )}>
                  ETS Việt Nam
                </p>
                <p className={cn(
                  'text-xs transition-colors',
                  isScrolled ? 'text-gray-500' : 'text-green-100'
                )}>
                  Giải pháp & Môi trường
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {config.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === item.href
                      ? 'bg-green-600 text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                        : 'text-white hover:bg-white/10'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${config.company.phone}`}
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold transition-colors",
                  isScrolled ? "text-green-700 hover:text-green-800" : "text-white hover:text-green-100"
                )}
              >
                <Phone className="h-4 w-4" />
                {config.company.phone}
              </a>
              <Link
                href="/lien-he"
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-200 hover:bg-green-700 transition-all"
              >
                Liên hệ ngay
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden transition-all duration-300 overflow-hidden bg-white border-t border-gray-100',
            isMobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <Container className="py-4 space-y-1">
            {config.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-medium transition-all',
                  pathname === item.href
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={`tel:${config.company.phone}`}
                className="flex items-center gap-2 px-4 py-3 text-green-700 font-semibold"
              >
                <Phone className="h-5 w-5" />
                {config.company.phone}
              </a>
              <Link
                href="/lien-he"
                className="mx-4 block text-center rounded-xl bg-green-600 py-3 font-semibold text-white"
              >
                Liên hệ ngay
              </Link>
            </div>
          </Container>
        </div>
      </header>
      {/* Spacer for sticky header */}
      <div className="h-8" />
    </>
  )
}
