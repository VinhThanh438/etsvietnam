import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const variantClasses = {
  primary:
    'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg shadow-green-200',
  secondary:
    'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg shadow-blue-200',
  outline:
    'border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white bg-transparent',
  ghost:
    'text-green-700 hover:bg-green-50 bg-transparent',
  white:
    'bg-white text-green-700 hover:bg-green-50 shadow-md',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-semibold rounded-xl',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
