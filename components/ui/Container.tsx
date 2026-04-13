import React, { JSX } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto max-w-6xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  )
}
