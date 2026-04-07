import React from 'react'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}

export function SectionTitle({
  label,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
}: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-xl', className)}>
      {label && (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {label}
        </span>
      )}
      <h2 className={cn('text-3xl sm:text-4xl font-bold text-gray-900 leading-tight', titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
