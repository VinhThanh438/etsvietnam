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
        backgroundImage: "linear-gradient(135deg, rgba(10, 54, 34, 0.85), rgba(6, 26, 19, 0.9)), url('/images/banner.png')",
      }}
      className={cn('bg-cover bg-center py-22 text-white', className)}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}
