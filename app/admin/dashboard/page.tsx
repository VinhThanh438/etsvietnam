'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderKanban, Wrench, Newspaper, Users, Mail, ArrowRight, Activity, TrendingUp, Search, Eye } from 'lucide-react'

interface Stats {
  projects: number
  services: number
  news: number
  partners: number
  contacts: number
  unreadContacts: number
  analytics?: {
    pageviews: number
    seoTraffic: number
    events: number
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, services, news, partners, contacts, analytics] = await Promise.all([
          fetch('/api/admin/projects').then(r => r.json()),
          fetch('/api/admin/services').then(r => r.json()),
          fetch('/api/admin/news').then(r => r.json()),
          fetch('/api/admin/partners').then(r => r.json()),
          fetch('/api/admin/contacts').then(r => r.json()),
          fetch('/api/admin/analytics').then(r => r.json()),
        ])
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          news: Array.isArray(news) ? news.length : 0,
          partners: Array.isArray(partners) ? partners.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          unreadContacts: Array.isArray(contacts)
            ? contacts.filter((c: { read: boolean }) => !c.read).length
            : 0,
          analytics: analytics?.pageviews !== undefined ? analytics : { pageviews: 0, seoTraffic: 0, events: 0 }
        })
      } catch {
        // silent fail
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Dự án', value: stats?.projects ?? '...', icon: FolderKanban, color: '#3b82f6', href: '/admin/dashboard/projects' },
    { label: 'Dịch vụ', value: stats?.services ?? '...', icon: Wrench, color: '#8b5cf6', href: '/admin/dashboard/services' },
    { label: 'Bài viết', value: stats?.news ?? '...', icon: Newspaper, color: '#22c55e', href: '/admin/dashboard/news' },
    { label: 'Đối tác', value: stats?.partners ?? '...', icon: Users, color: '#f59e0b', href: '/admin/dashboard/partners' },
    { label: 'Liên hệ', value: stats?.contacts ?? '...', icon: Mail, color: '#ef4444', href: '/admin/dashboard/contacts',
      badge: stats?.unreadContacts ? `${stats.unreadContacts} mới` : undefined },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: '0.25rem' }}>
          Tổng quan
        </h1>
        <p style={{ color: 'var(--admin-text-light)', fontSize: '0.875rem' }}>
          Quản lý và theo dõi nội dung trên trang web ETS Việt Nam
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              style={{
                background: 'var(--admin-surface)',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '1.25rem',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.2s, transform 0.2s',
                position: 'relative',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = card.color
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--admin-border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${card.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={20} color={card.color} />
                </div>
                {card.badge && (
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    background: '#ef4444',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}>
                    {card.badge}
                  </span>
                )}
              </div>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--admin-text)',
                marginBottom: '0.25rem',
              }}>
                {card.value}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{card.label}</span>
                <ArrowRight size={14} color="#64748b" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Analytics Summary */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--admin-text)', marginBottom: '1rem' }}>
          Theo dõi Hiệu suất & SEO (Tháng này)
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { label: 'Tổng lượt truy cập', value: stats?.analytics?.pageviews?.toLocaleString() ?? '...', change: 'Real-time', isUp: true, icon: Eye, color: '#3b82f6' },
            { label: 'Theo dõi sự kiện (Click/Form)', value: stats?.analytics?.events?.toLocaleString() ?? '...', change: 'Real-time', isUp: true, icon: Activity, color: '#f59e0b' },
            { label: 'Lưu lượng tự nhiên (SEO)', value: stats?.analytics?.seoTraffic?.toLocaleString() ?? '...', change: 'Real-time', isUp: true, icon: TrendingUp, color: '#10b981' },
            { label: 'Điểm SEO trang', value: '96/100', change: 'Audit mới nhất', isUp: true, icon: Search, color: '#8b5cf6' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                style={{
                  background: 'var(--admin-surface)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>{stat.label}</span>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Icon size={16} color={stat.color} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: '0.25rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                    <span style={{ color: stat.isUp ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                      {stat.change}
                    </span>
                    <span style={{ color: 'var(--admin-text-muted)' }}>so với tháng trước</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'var(--admin-surface)',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '1.5rem',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--admin-text)', marginBottom: '1rem' }}>
          Thao tác nhanh
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '0.75rem',
        }}>
          {[
            { label: 'Thêm dự án mới', href: '/admin/dashboard/projects?action=new' },
            { label: 'Viết bài mới', href: '/admin/dashboard/news?action=new' },
            { label: 'Thêm đối tác', href: '/admin/dashboard/partners?action=new' },
            { label: 'Cập nhật cài đặt', href: '/admin/dashboard/settings' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              style={{
                padding: '0.75rem 1rem',
                background: 'var(--admin-bg)',
                border: '1px solid #334155',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--admin-text-muted)',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#22c55e'
                e.currentTarget.style.color = '#22c55e'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--admin-border)'
                e.currentTarget.style.color = 'var(--admin-text-muted)'
              }}
            >
              {action.label}
              <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
