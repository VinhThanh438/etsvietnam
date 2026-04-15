'use client'

import { AlertCircle, Eye, EyeOff, Loader2, Lock, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Đăng nhập thất bại')
      }
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      data-admin-theme="dark"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        padding: '1rem',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            overflow: 'hidden',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image 
              src="/images/logo.jpg" 
              alt="ETS Logo" 
              width={64} 
              height={64}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--admin-text)',
            marginBottom: '0.5rem',
          }}>
            ETS VN Admin
          </h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.925rem' }}>
            Đăng nhập để quản lý nội dung
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'var(--admin-surface)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid var(--admin-border)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}>
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: '#450a0a',
              border: '1px solid #7f1d1d',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              color: '#fca5a5',
              fontSize: '0.875rem',
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--admin-text)',
              marginBottom: '0.5rem',
            }}>
              Tên đăng nhập
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--admin-text-muted)',
              }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="admin"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  background: 'var(--admin-bg)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e'
                  e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--admin-border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--admin-text)',
              marginBottom: '0.5rem',
            }}>
              Mật khẩu
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--admin-text-muted)',
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 2.75rem',
                  background: 'var(--admin-bg)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '10px',
                  color: 'var(--admin-text)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22c55e'
                  e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--admin-border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--admin-text-muted)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: loading
                ? '#374151'
                : 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          color: 'var(--admin-text-muted)',
          fontSize: '0.8125rem',
          marginTop: '2rem',
        }}>
          © {new Date().getFullYear()} ETS Việt Nam. Quản trị nội bộ.
        </p>
      </div>
    </div>
  )
}
