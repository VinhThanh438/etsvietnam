import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfig } from '@/lib/data/site'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { ZaloButton } from '@/components/ui/ZaloButton'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  return {
    title: {
      default: config.seo.defaultTitle,
      template: config.seo.titleTemplate,
    },
    description: config.seo.defaultDescription,
    keywords: ['xử lý nước thải', 'xử lý nước cấp', 'xử lý khí thải', 'môi trường', 'ETS VN', 'quan trắc môi trường'],
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: config.seo.siteUrl,
      siteName: config.company.name,
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: config.seo.siteUrl,
    },
    icons: {
      icon: [
        { url: config.company.logo || '/images/logo.jpg', type: 'image/jpeg' },
        { url: '/favicon.ico', sizes: 'any' }
      ],
      apple: [
        { url: config.company.logo || '/images/logo.jpg', type: 'image/jpeg' }
      ],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = await getSiteConfig()

  return (
    <html lang="vi" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header config={config} />
        <main className="flex-1">{children}</main>
        <Footer config={config} />
        <ScrollToTop />
        <ZaloButton phone={config.company.zalo} />
      </body>
    </html>
  )
}
