import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { Container } from './Container'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="bg-gray-50 border-b border-gray-100 py-3 shrink-0">
      <Container>
        <ol className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <li className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
              <Home className="w-3.5 h-3.5 mb-[1px]" />
              <span>Trang chủ</span>
            </Link>
          </li>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2 shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-green-600 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </Container>
    </div>
  )
}
