'use client'

import { AnimatedSection, StaggerContainer, fadeUpVariant } from '@/components/ui/AnimatedSection'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { NewsArticle } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface NewsSectionProps {
  articles: NewsArticle[]
  showViewAll?: boolean
  sidebar?: React.ReactNode
  pagination?: React.ReactNode
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <motion.div variants={fadeUpVariant}>
      <Link
        href={`/tin-tuc/${article.slug}`}
        className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
      >
        {/* Image placeholder */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-green-300" />
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
              {article.categoryLabel}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-[calc(100%-140px)]">
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-50">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function NewsSection({ articles, showViewAll = true, sidebar, pagination }: NewsSectionProps) {
  return (
    <section className="pt-10 md:pt-16 pb-24 bg-gray-50">
      <Container>
        <AnimatedSection className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionTitle
            label="Cẩm nang môi trường"
            title="Tin tức & Kiến thức mới nhất"
            description="Cập nhật xu hướng công nghệ, quy định pháp luật và kinh nghiệm thực tiễn trong lĩnh vực môi trường."
            align="left"
            className="max-w-xl"
          />
          {showViewAll && (
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 shrink-0 text-green-600 font-semibold hover:text-green-700 transition-colors group"
            >
              Tất cả bài viết
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </AnimatedSection>

        {sidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <StaggerContainer 
                key={articles.map(a => a.id).join(',')}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </StaggerContainer>
              {pagination && <div className="mt-4">{pagination}</div>}
            </div>
            <div className="lg:col-span-1 relative hidden lg:block">
              <div className="sticky top-24">
                {sidebar}
              </div>
            </div>
            {/* Mobile/Tablet sidebar placement (below) */}
            <div className="lg:hidden mt-8">
              {sidebar}
            </div>
          </div>
        ) : (
          <>
              <StaggerContainer 
                key={articles.map(a => a.id).join(',')}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </StaggerContainer>
            {pagination && <div className="mt-4">{pagination}</div>}
          </>
        )}
      </Container>
    </section>
  )
}
