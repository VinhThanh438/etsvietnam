import type { Metadata } from 'next'
import { Inter, Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfig } from '@/lib/data/site'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { ZaloButton } from '@/components/ui/ZaloButton'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { headers } from 'next/headers'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

const beVietnam = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-be-vietnam',
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

  // Detect admin routes to hide public shell (Header/Footer)
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || ''
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="vi" className={`${inter.variable} ${beVietnam.variable} scroll-smooth`}>
      <head />
      <body className={`${isAdmin ? 'min-h-screen' : 'min-h-screen flex flex-col'} antialiased`}>
        <AnalyticsTracker />
        
        {/* Persistent structure for Header */}
        {!isAdmin ? <Header config={config} /> : <div className="hidden" aria-hidden="true" />}
        
        <main key={isAdmin ? 'admin-root' : 'public-root'} className={isAdmin ? "relative" : "relative flex-1"}>
          {children}
        </main>
        
        {/* Persistent structure for Footer and Widgets */}
        {!isAdmin ? (
          <>
            <Footer config={config} />
            <ScrollToTop />
            <ZaloButton phone={config.company.zalo} />
          </>
        ) : (
          <div className="hidden" aria-hidden="true" />
        )}
      </body>
    </html>
  )
}

