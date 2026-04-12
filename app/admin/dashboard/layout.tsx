'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, FolderKanban, Wrench, Newspaper, Users,
  Settings, Mail, LogOut, Menu, X, ChevronRight, Image, Sun, Moon
} from 'lucide-react'

const navItems = [
  { label: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Dự án', href: '/admin/dashboard/projects', icon: FolderKanban },
  { label: 'Dịch vụ', href: '/admin/dashboard/services', icon: Wrench },
  { label: 'Bài viết', href: '/admin/dashboard/news', icon: Newspaper },
  { label: 'Đối tác', href: '/admin/dashboard/partners', icon: Users },
  { label: 'Hình ảnh', href: '/admin/dashboard/media', icon: Image },
  { label: 'Liên hệ', href: '/admin/dashboard/contacts', icon: Mail },
  { label: 'Cài đặt', href: '/admin/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme')
    if (savedTheme === 'light') {
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('admin-theme', newTheme)
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/session')
        if (!res.ok) {
          router.replace('/admin')
          return
        }
      } catch {
        router.replace('/admin')
        return
      }
      setLoading(false)
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin')
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--admin-bg)',
        color: 'var(--admin-text-muted)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #334155',
            borderTopColor: '#22c55e',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem',
          }} />
          <p>Đang kiểm tra phiên đăng nhập...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div data-admin-theme={theme} style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-bg)' }}>
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '260px',
        background: 'var(--admin-surface)',
        borderRight: '1px solid var(--admin-border)',
        zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
      className="admin-sidebar"
      >
        {/* Logo */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--admin-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/admin/dashboard" style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: 'white',
              fontSize: '0.875rem',
            }}>
              ETS
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--admin-text)', fontSize: '0.9375rem' }}>
                Quản trị
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--admin-text-light)' }}>
                Content Manager
              </div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="admin-sidebar-close"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--admin-text-muted)',
              cursor: 'pointer',
              padding: '4px',
              display: 'none',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
          <div style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            color: 'var(--admin-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0 0.75rem',
            marginBottom: '0.5rem',
          }}>
            Quản lý nội dung
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.75rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#22c55e' : 'var(--admin-text-muted)',
                  background: isActive ? 'rgba(34,197,94,0.1)' : 'transparent',
                  marginBottom: '2px',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {isActive && <ChevronRight size={14} />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: Logout */}
        <div style={{
          padding: '1rem 0.75rem',
          borderTop: '1px solid var(--admin-border)',
        }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 0.75rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              color: 'var(--admin-text-light)',
              marginBottom: '4px',
            }}
          >
            Xem trang web ↗
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 0.75rem',
              borderRadius: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#ef4444',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        className="admin-main"
      >
        {/* Top Bar */}
        <header style={{
          height: '56px',
          background: 'var(--admin-surface)',
          borderBottom: '1px solid var(--admin-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="admin-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--admin-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            <Menu size={22} />
          </button>
          <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)', flex: 1 }}>
            {navItems.find(n => pathname === n.href ||
              (n.href !== '/admin/dashboard' && pathname.startsWith(n.href)))?.label || 'Tổng quan'}
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: '1px solid var(--admin-border)',
              borderRadius: '8px',
              padding: '6px',
              color: 'var(--admin-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Đổi giao diện"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
        }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
          .admin-main {
            margin-left: 260px;
          }
          .admin-menu-btn {
            display: none !important;
          }
          .admin-sidebar-close {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .admin-sidebar-close {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
