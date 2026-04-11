'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Save, Loader2, Search } from 'lucide-react'
import type { Partner } from '@/lib/types'

const emptyPartner: Partial<Partner> = { name: '', logo: '', website: '#' }

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Partial<Partner> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const fetchData = useCallback(async () => {
    const res = await fetch('/api/admin/partners')
    if (res.ok) setPartners(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('action') === 'new') openNew()
  }, [])

  const openNew = () => { setEditing({ ...emptyPartner }); setIsNew(true); setImageFile(null) }
  const openEdit = (p: Partner) => { setEditing({ ...p }); setIsNew(false); setImageFile(null) }

  const handleSave = async () => {
    if (!editing?.name) return
    setSaving(true)
    try {
      let logoUrl = editing.logo || ''
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('folder', 'partners')
        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        if (uploadRes.ok) {
          const { url } = await uploadRes.json()
          logoUrl = url
        }
      }
      const data = { ...editing, logo: logoUrl, id: isNew ? editing.name!.toLowerCase().replace(/\s+/g, '-') : editing.id }
      const res = await fetch('/api/admin/partners', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) { await fetchData(); setEditing(null) }
    } catch { /* silent */ }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/partners?id=${id}`, { method: 'DELETE' })
    if (res.ok) { await fetchData(); setDeleteConfirm(null) }
  }

  const filtered = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.75rem', background: '#0f172a',
    border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', fontSize: '0.875rem', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.375rem',
  }

  if (loading) return <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center' }}>Đang tải...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9' }}>Đối tác</h1>
          <p style={{ color: '#64748b', fontSize: '0.8125rem' }}>{partners.length} đối tác</p>
        </div>
        <button onClick={openNew} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
        }}>
          <Plus size={16} /> Thêm đối tác
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input type="text" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {filtered.map(p => (
          <div key={p.id} style={{
            background: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
            padding: '1.25rem', textAlign: 'center', position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.375rem', marginBottom: '0.75rem' }}>
              <button onClick={() => openEdit(p)} style={{
                background: '#334155', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#94a3b8',
              }}><Pencil size={12} /></button>
              <button onClick={() => setDeleteConfirm(p.id)} style={{
                background: '#450a0a60', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#f87171',
              }}><Trash2 size={12} /></button>
            </div>
            {p.logo && (
              <div style={{
                width: '80px', height: '80px', margin: '0 auto 0.75rem', borderRadius: '8px',
                background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <img src={p.logo} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            )}
            <p style={{ color: '#f1f5f9', fontSize: '0.875rem', fontWeight: 500 }}>{p.name}</p>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>Xóa đối tác?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Hành động này không thể hoàn tác.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '0.5rem 1rem', background: '#334155', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}>Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '0.5rem 1rem', background: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', maxWidth: '450px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#f1f5f9', fontSize: '1.125rem', fontWeight: 600 }}>{isNew ? 'Thêm đối tác' : 'Chỉnh sửa'}</h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Tên đối tác *</label>
                <input style={inputStyle} value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Website</label>
                <input style={inputStyle} value={editing.website} onChange={e => setEditing({...editing, website: e.target.value})} placeholder="https://" />
              </div>
              <div>
                <label style={labelStyle}>Logo</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)}
                  style={{ ...inputStyle, padding: '0.5rem' }} />
                {editing.logo && !imageFile && (
                  <div style={{ marginTop: '0.5rem', background: '#f8fafc', borderRadius: '6px', padding: '0.5rem', display: 'inline-block' }}>
                    <img src={editing.logo} alt="" style={{ height: '40px', objectFit: 'contain' }} />
                  </div>
                )}
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
