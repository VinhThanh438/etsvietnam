'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderKanban, Wrench, Newspaper, Users, Mail, ArrowRight } from 'lucide-react'

interface Stats {
  projects: number
  services: number
  news: number
  partners: number
  contacts: number
  unreadContacts: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, services, news, partners, contacts] = await Promise.all([
          fetch('/api/admin/projects').then(r => r.json()),
          fetch('/api/admin/services').then(r => r.json()),
          fetch('/api/admin/news').then(r => r.json()),
          fetch('/api/admin/partners').then(r => r.json()),
          fetch('/api/admin/contacts').then(r => r.json()),
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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.25rem' }}>
          Tổng quan
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
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
                background: '#1e293b',
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
                e.currentTarget.style.borderColor = '#334155'
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
                color: '#f1f5f9',
                marginBottom: '0.25rem',
              }}>
                {card.value}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>{card.label}</span>
                <ArrowRight size={14} color="#64748b" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '1.5rem',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '1rem' }}>
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
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#94a3b8',
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
                e.currentTarget.style.borderColor = '#334155'
                e.currentTarget.style.color = '#94a3b8'
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
