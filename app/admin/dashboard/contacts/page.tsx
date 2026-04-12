'use client'

import { useEffect, useState, useCallback } from 'react'
import { Mail, Phone, Clock, Trash2, Eye, CheckCircle, Search } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  submittedAt: string
  read: boolean
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    const res = await fetch('/api/admin/contacts')
    if (res.ok) setContacts(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const markAsRead = async (contact: Contact) => {
    setSelected(contact)
    if (!contact.read) {
      await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contact.id, read: true }),
      })
      await fetchData()
    }
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      await fetchData()
      setDeleteConfirm(null)
      if (selected?.id === id) setSelected(null)
    }
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })
  }

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const unreadCount = contacts.filter(c => !c.read).length

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.75rem', background: 'var(--admin-bg)',
    border: '1px solid #334155', borderRadius: '8px', color: 'var(--admin-text)', fontSize: '0.875rem', outline: 'none',
  }

  if (loading) return <div style={{ color: 'var(--admin-text-muted)', padding: '2rem', textAlign: 'center' }}>Đang tải...</div>

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--admin-text)' }}>Liên hệ</h1>
        <p style={{ color: 'var(--admin-text-light)', fontSize: '0.8125rem' }}>
          {contacts.length} tin nhắn{unreadCount > 0 && ` · ${unreadCount} chưa đọc`}
        </p>
      </div>

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
        <input type="text" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1rem' }}>
        {/* List */}
        <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden', maxHeight: '600px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>
              {search ? 'Không tìm thấy.' : 'Chưa có tin nhắn nào.'}
            </div>
          ) : filtered.map((c, i) => (
            <div key={c.id} onClick={() => markAsRead(c)}
              style={{
                padding: '1rem 1.25rem', cursor: 'pointer',
                borderBottom: i < filtered.length - 1 ? '1px solid #334155' : 'none',
                background: selected?.id === c.id ? 'var(--admin-bg)' : !c.read ? 'var(--admin-surface)' : 'transparent',
                borderLeft: selected?.id === c.id ? '3px solid #22c55e' : '3px solid transparent',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{
                  color: 'var(--admin-text)', fontSize: '0.875rem',
                  fontWeight: c.read ? 400 : 600,
                }}>{c.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {!c.read && (
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e',
                    }} />
                  )}
                  <span style={{ fontSize: '0.6875rem', color: '#475569' }}>
                    {formatDateTime(c.submittedAt)}
                  </span>
                </div>
              </div>
              <p style={{ color: 'var(--admin-text-light)', fontSize: '0.8125rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.message}
              </p>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} color={selected.read ? '#22c55e' : 'var(--admin-text-light)'} />
                <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>
                  {selected.read ? 'Đã đọc' : 'Chưa đọc'}
                </span>
              </div>
              <button onClick={() => setDeleteConfirm(selected.id)} style={{
                background: '#450a0a60', border: 'none', borderRadius: '6px',
                padding: '6px', cursor: 'pointer', color: '#f87171',
              }}><Trash2 size={14} /></button>
            </div>

            <h3 style={{ color: 'var(--admin-text)', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
              {selected.name}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="#64748b" />
                <a href={`tel:${selected.phone}`} style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  {selected.phone}
                </a>
              </div>
              {selected.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} color="#64748b" />
                  <a href={`mailto:${selected.email}`} style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', textDecoration: 'none' }}>
                    {selected.email}
                  </a>
                </div>
              )}
              {selected.service && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Eye size={14} color="#64748b" />
                  <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
                    Quan tâm: {selected.service}
                  </span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} color="#64748b" />
                <span style={{ color: 'var(--admin-text-light)', fontSize: '0.8125rem' }}>
                  {formatDateTime(selected.submittedAt)}
                </span>
              </div>
            </div>

            <div style={{
              background: 'var(--admin-bg)', borderRadius: '8px', padding: '1rem',
              border: '1px solid #334155',
            }}>
              <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {selected.message}
              </p>
            </div>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--admin-modal-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ color: 'var(--admin-text)', marginBottom: '0.5rem' }}>Xóa tin nhắn?</h3>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Hành động này không thể hoàn tác.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '0.5rem 1rem', background: 'var(--admin-border)', border: 'none', borderRadius: '8px', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '0.5rem 1rem', background: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
