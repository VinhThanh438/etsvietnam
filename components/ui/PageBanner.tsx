import { Container } from '@/components/ui/Container'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageBannerProps {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function PageBanner({ children, className, containerClassName }: PageBannerProps) {
  return (
    <section
      style={{
        backgroundImage: "linear-gradient(to right, rgba(30, 30, 30, 0.85), rgba(6, 36, 17, 0.85)), url('/images/banner.png')",
      }}
      className={cn('bg-cover bg-center py-22 text-white', className)}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}
