import Link from 'next/link'
import { getNews } from '@/lib/data/news'
import { ChevronRight, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export async function SidebarNews() {
  const allNews = await getNews()
  
  // Get unique categories
  const categories = Array.from(new Set(allNews.map(n => n.categoryLabel)))
  
  // Get top 5 recent/featured news
  const recentNews = allNews.slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 uppercase">
          <h3 className="font-bold text-gray-900 text-sm tracking-widest">Danh mục tin tức</h3>
        </div>
        <div className="flex flex-col">
          {categories.map((cat, idx) => {
            const children = allNews.filter(n => n.categoryLabel === cat)
            return (
              <details 
                key={cat} 
                className={`group ${idx !== categories.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <summary className="px-5 py-3.5 flex items-center justify-between cursor-pointer list-none hover:bg-green-50 transition-colors [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600 group-hover:text-green-600">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 group-open:rotate-90 transition-transform" />
                    <span className="font-medium">{cat}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full group-hover:bg-green-100 group-hover:text-green-700 transition-colors">{children.length}</span>
                </summary>
                <div className="px-5 pb-4 pt-1 flex flex-col gap-3">
                  {children.map(child => (
                    <Link 
                      key={child.slug}
                      href={`/tin-tuc/${child.slug}`}
                      className="text-sm text-gray-500 hover:text-green-600 pl-6 leading-snug relative before:content-[''] before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-gray-300 before:rounded-full hover:before:bg-green-500 transition-colors"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </details>
            )
          })}
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 uppercase">
          <h3 className="font-bold text-gray-900 text-sm tracking-widest">Bài viết mới nhất</h3>
        </div>
        <div className="flex flex-col">
          {recentNews.map((news, idx) => (
            <Link 
              key={news.slug}
              href={`/tin-tuc/${news.slug}`}
              className={`px-5 py-4 flex flex-col gap-1.5 hover:bg-gray-50 hover:text-green-600 transition-colors ${idx !== recentNews.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug transition-colors">{news.title}</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(news.publishedAt)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
