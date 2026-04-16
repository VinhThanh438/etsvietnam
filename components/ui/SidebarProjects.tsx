import Link from 'next/link'
import { getProjects } from '@/lib/data/projects'
import { ChevronRight, MapPin } from 'lucide-react'

export async function SidebarProjects() {
  const allProjects = await getProjects()
  
  // Get unique categories
  const categories = Array.from(new Set(allProjects.map(p => p.categoryLabel)))
  
  // Get top 5 featured projects
  const featuredProjects = allProjects.filter(p => p.featured).slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 uppercase">
          <h3 className="font-bold text-gray-900 text-sm tracking-widest">Lĩnh vực dự án</h3>
        </div>
        <div className="flex flex-col">
          {categories.map((cat, idx) => {
            const children = allProjects.filter(p => p.categoryLabel === cat)
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
                      href={`/du-an/${child.slug}`}
                      className="text-sm text-gray-500 hover:text-green-600 pl-6 leading-snug relative before:content-[''] before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-gray-300 before:rounded-full hover:before:bg-green-500 transition-colors line-clamp-2 overflow-hidden"
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
          <h3 className="font-bold text-gray-900 text-sm tracking-widest">Dự án tiêu biểu</h3>
        </div>
        <div className="flex flex-col">
          {featuredProjects.map((project, idx) => (
            <Link 
              key={project.slug}
              href={`/du-an/${project.slug}`}
              className={`px-5 py-4 flex flex-col gap-1.5 hover:bg-gray-50 hover:text-green-600 transition-colors ${idx !== featuredProjects.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug transition-colors">{project.title}</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                {project.location}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
