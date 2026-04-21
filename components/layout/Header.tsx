'use client'

import { Container } from '@/components/ui/Container'
import type { SiteConfig } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Leaf, Menu, Phone, X } from 'lucide-react'
import NextImage from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setIsMobileOpen(false)
  }

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
                ETS VIET NAM ENVIRONMENT JOINT STOCK COMPANY
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={`tel:${config.company.phone}`}
                  className="flex items-center gap-1.5 font-semibold hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-green-300" />
                  {config.company.phone}
                </a>
                <div className="w-px h-3 bg-green-600/50" />
                <a
                  href={`https://zalo.me/${(config.company.zaloPhone).replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-semibold hover:text-white transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className="h-4 w-4">
                    <path fill="#2962ff" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path><path fill="#eee" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path><path fill="#2962ff" d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"></path><path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path><path fill="#2962ff" d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"></path><path fill="#2962ff" d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"></path>
                  </svg>
                  Zalo
                </a>
              </div>
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
              {config.nav.filter(item => item.href !== '/lien-he').map((item) => (
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
                Mr. Thu
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
            {config.nav.filter(item => item.href !== '/lien-he').map((item) => (
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
                Mr. Thu
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
    </>
  )
}
