import React from 'react'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  dark?: boolean
}

export function SectionTitle({
  label,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
  dark = false,
}: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-xl', className)}>
      {label && (
        <span className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-4",
          dark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"
        )}>
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {label}
        </span>
      )}
      <h2 className={cn(
        'text-3xl sm:text-4xl font-bold leading-tight',
        dark ? 'text-white' : 'text-gray-900',
        titleClassName
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-lg leading-relaxed",
          dark ? "text-gray-400" : "text-gray-600"
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
