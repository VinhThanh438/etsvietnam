'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`p-2 rounded-lg border border-gray-200 transition-colors ${
          currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-green-50 hover:text-green-600'
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="flex gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border font-medium transition-all ${
              currentPage === page
                ? 'bg-green-600 text-white border-green-600 shadow-md transform scale-105'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-600'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`p-2 rounded-lg border border-gray-200 transition-colors ${
          currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-green-50 hover:text-green-600'
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  )
}
