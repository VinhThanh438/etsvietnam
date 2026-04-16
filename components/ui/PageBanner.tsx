import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface PageBannerProps {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function PageBanner({ children, className, containerClassName }: PageBannerProps) {
  return (
    <section
      style={{
        backgroundImage: "linear-gradient(to right, rgba(41, 46, 41, 0.69), rgba(13, 26, 18, 0.69)), url('/images/banner.png')",
      }}
      className={cn('bg-cover bg-center py-22 text-white', className)}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}
