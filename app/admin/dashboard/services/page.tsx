'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Save, Loader2, Search } from 'lucide-react'
import type { Service } from '@/lib/types'
import { slugify } from '@/lib/utils'

const colorOptions = ['green', 'blue', 'amber', 'purple', 'teal', 'slate', 'red', 'orange']
const iconOptions = ['Droplets', 'Waves', 'Wind', 'Flame', 'FileText', 'Activity', 'Wrench', 'Shield', 'Zap', 'Factory']

const emptyService: Partial<Service> = {
  title: '', slug: '', icon: 'Droplets', shortDescription: '', description: '', features: [], color: 'green',
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Partial<Service> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [featuresInput, setFeaturesInput] = useState('')

  const fetchData = useCallback(async () => {
    const res = await fetch('/api/admin/services')
    if (res.ok) setServices(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openNew = () => {
    setEditing({ ...emptyService })
    setIsNew(true)
    setFeaturesInput('')
  }

  const openEdit = (service: Service) => {
    setEditing({ ...service })
    setIsNew(false)
    setFeaturesInput(service.features.join('\n'))
  }

  const handleSave = async () => {
    if (!editing?.title) return
    setSaving(true)
    try {
      const slug = editing.slug || slugify(editing.title)
      const data = {
        ...editing,
        id: isNew ? slug : editing.id,
        slug,
        features: featuresInput.split('\n').map(f => f.trim()).filter(Boolean),
      }

      const res = await fetch('/api/admin/services', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchData()
        setEditing(null)
      }
    } catch { /* silent */ }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      await fetchData()
      setDeleteConfirm(null)
    }
  }

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.75rem', background: '#0f172a',
    border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9',
    fontSize: '0.875rem', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8125rem', fontWeight: 500,
    color: '#94a3b8', marginBottom: '0.375rem',
  }

  if (loading) return <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center' }}>Đang tải...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9' }}>Dịch vụ</h1>
          <p style={{ color: '#64748b', fontSize: '0.8125rem' }}>{services.length} dịch vụ</p>
        </div>
        <button onClick={openNew} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
        }}>
          <Plus size={16} /> Thêm dịch vụ
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input type="text" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filtered.map(s => (
          <div key={s.id} style={{
            background: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
            padding: '1.25rem', position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{
                fontSize: '0.75rem', padding: '2px 8px', borderRadius: '9999px',
                background: `${s.color === 'green' ? '#22c55e' : s.color === 'blue' ? '#3b82f6' : s.color === 'amber' ? '#f59e0b' : s.color === 'purple' ? '#8b5cf6' : '#64748b'}20`,
                color: s.color === 'green' ? '#4ade80' : s.color === 'blue' ? '#60a5fa' : s.color === 'amber' ? '#fbbf24' : s.color === 'purple' ? '#a78bfa' : '#94a3b8',
              }}>{s.icon}</span>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                <button onClick={() => openEdit(s)} style={{
                  background: '#334155', border: 'none', borderRadius: '6px',
                  padding: '4px 6px', cursor: 'pointer', color: '#94a3b8',
                }}><Pencil size={13} /></button>
                <button onClick={() => setDeleteConfirm(s.id)} style={{
                  background: '#450a0a60', border: 'none', borderRadius: '6px',
                  padding: '4px 6px', cursor: 'pointer', color: '#f87171',
                }}><Trash2 size={13} /></button>
              </div>
            </div>
            <h3 style={{ color: '#f1f5f9', fontSize: '1rem', fontWeight: 600, marginBottom: '0.375rem' }}>{s.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.8125rem', lineHeight: 1.5 }}>{s.shortDescription}</p>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {s.features.slice(0, 3).map(f => (
                <span key={f} style={{ fontSize: '0.6875rem', padding: '1px 6px', borderRadius: '4px', background: '#0f172a', color: '#64748b' }}>{f}</span>
              ))}
              {s.features.length > 3 && <span style={{ fontSize: '0.6875rem', color: '#475569' }}>+{s.features.length - 3}</span>}
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>Xóa dịch vụ?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Hành động này không thể hoàn tác.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '0.5rem 1rem', background: '#334155', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}>Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '0.5rem 1rem', background: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 100, overflowY: 'auto', padding: '2rem 1rem' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', maxWidth: '600px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#f1f5f9', fontSize: '1.125rem', fontWeight: 600 }}>{isNew ? 'Thêm dịch vụ' : 'Chỉnh sửa dịch vụ'}</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Tên dịch vụ *</label>
                <input style={inputStyle} value={editing.title} onChange={e => setEditing({...editing, title: e.target.value, slug: slugify(e.target.value)})} />
              </div>
              <div>
                <label style={labelStyle}>Icon</label>
                <select style={inputStyle} value={editing.icon} onChange={e => setEditing({...editing, icon: e.target.value})}>
                  {iconOptions.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Màu sắc</label>
                <select style={inputStyle} value={editing.color} onChange={e => setEditing({...editing, color: e.target.value})}>
                  {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Mô tả ngắn</label>
                <textarea style={{...inputStyle, minHeight: '60px', resize: 'vertical'}} value={editing.shortDescription} onChange={e => setEditing({...editing, shortDescription: e.target.value})} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Mô tả chi tiết</label>
                <textarea style={{...inputStyle, minHeight: '100px', resize: 'vertical'}} value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Tính năng (mỗi dòng một tính năng)</label>
                <textarea style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} value={featuresInput} onChange={e => setFeaturesInput(e.target.value)} placeholder="Nước thải sinh hoạt&#10;Nước thải công nghiệp&#10;..." />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => setEditing(null)} style={{ padding: '0.625rem 1.25rem', background: '#334155', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}>Hủy</button>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '0.625rem 1.25rem', background: saving ? '#374151' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                border: 'none', borderRadius: '8px', color: 'white', cursor: saving ? 'not-allowed' : 'pointer',
                fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
