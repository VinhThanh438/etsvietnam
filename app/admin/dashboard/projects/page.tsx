'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Save, Loader2, Search, Star } from 'lucide-react'
import type { Project } from '@/lib/types'
import { slugify } from '@/lib/utils'

const categories = [
  { value: 'xu-ly-nuoc-thai', label: 'Xử lý nước thải' },
  { value: 'xu-ly-nuoc-cap', label: 'Xử lý nước cấp' },
  { value: 'xu-ly-khi-thai', label: 'Xử lý khí thải' },
  { value: 'tu-van-moi-truong', label: 'Tư vấn môi trường' },
  { value: 'quan-trac', label: 'Quan trắc môi trường' },
]

const emptyProject: Partial<Project> = {
  title: '', client: '', location: '', category: 'xu-ly-nuoc-thai', categoryLabel: 'Xử lý nước thải',
  capacity: '', year: new Date().getFullYear().toString(), image: '',
  shortDescription: '', description: '', tags: [], featured: false, slug: '',
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Partial<Project> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [tagsInput, setTagsInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const fetchData = useCallback(async () => {
    const res = await fetch('/api/admin/projects')
    if (res.ok) setProjects(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('action') === 'new') openNew()
  }, [])

  const openNew = () => {
    setEditing({ ...emptyProject })
    setIsNew(true)
    setTagsInput('')
    setImageFile(null)
  }

  const openEdit = (project: Project) => {
    setEditing({ ...project })
    setIsNew(false)
    setTagsInput(project.tags.join(', '))
    setImageFile(null)
  }

  const handleSave = async () => {
    if (!editing?.title) return
    setSaving(true)

    try {
      let imageUrl = editing.image || ''

      // Upload image if new file selected
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('folder', 'projects')
        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        if (uploadRes.ok) {
          const { url } = await uploadRes.json()
          imageUrl = url
        }
      }

      const slug = editing.slug || slugify(editing.title)
      const cat = categories.find(c => c.value === editing.category)
      const data = {
        ...editing,
        id: isNew ? slug : editing.id,
        slug,
        image: imageUrl,
        categoryLabel: cat?.label || editing.categoryLabel,
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      }

      const res = await fetch('/api/admin/projects', {
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
    const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      await fetchData()
      setDeleteConfirm(null)
    }
  }

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  )

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.75rem', background: 'var(--admin-bg)',
    border: '1px solid #334155', borderRadius: '8px', color: 'var(--admin-text)',
    fontSize: '0.875rem', outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8125rem', fontWeight: 500,
    color: 'var(--admin-text-muted)', marginBottom: '0.375rem',
  }

  if (loading) return <div style={{ color: 'var(--admin-text-muted)', padding: '2rem', textAlign: 'center' }}>Đang tải...</div>

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--admin-text)' }}>Dự án</h1>
          <p style={{ color: 'var(--admin-text-light)', fontSize: '0.8125rem' }}>{projects.length} dự án</p>
        </div>
        <button onClick={openNew} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
        }}>
          <Plus size={16} /> Thêm dự án
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
        <input
          type="text" placeholder="Tìm kiếm dự án..." value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: '2.5rem' }}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                {['', 'Tên dự án', 'Khách hàng', 'Địa điểm', 'Năm', 'Danh mục', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600,
                    color: 'var(--admin-text-light)', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1e293b' }}
                  onMouseOver={e => e.currentTarget.style.background = '#1e293b80'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '0.625rem 1rem', width: '24px' }}>
                    {p.featured && <Star size={14} color="#f59e0b" fill="#f59e0b" />}
                  </td>
                  <td style={{ padding: '0.625rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {p.image && (
                        <img src={p.image} alt="" style={{
                          width: '40px', height: '40px', borderRadius: '6px',
                          objectFit: 'cover', border: '1px solid #334155',
                        }} />
                      )}
                      <span style={{ color: 'var(--admin-text)', fontSize: '0.875rem', fontWeight: 500 }}>{p.title}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.625rem 1rem', color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{p.client}</td>
                  <td style={{ padding: '0.625rem 1rem', color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{p.location}</td>
                  <td style={{ padding: '0.625rem 1rem', color: 'var(--admin-text-muted)', fontSize: '0.8125rem' }}>{p.year}</td>
                  <td style={{ padding: '0.625rem 1rem' }}>
                    <span style={{
                      fontSize: '0.75rem', padding: '2px 8px', borderRadius: '9999px',
                      background: '#22c55e20', color: '#4ade80',
                    }}>{p.categoryLabel}</span>
                  </td>
                  <td style={{ padding: '0.625rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEdit(p)} style={{
                        background: 'var(--admin-border)', border: 'none', borderRadius: '6px',
                        padding: '6px', cursor: 'pointer', color: 'var(--admin-text-muted)',
                      }}><Pencil size={14} /></button>
                      <button onClick={() => setDeleteConfirm(p.id)} style={{
                        background: '#450a0a60', border: 'none', borderRadius: '6px',
                        padding: '6px', cursor: 'pointer', color: '#f87171',
                      }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>
                    {search ? 'Không tìm thấy dự án nào.' : 'Chưa có dự án nào.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--admin-modal-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{
            background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px',
            padding: '1.5rem', maxWidth: '400px', width: '90%',
          }}>
            <h3 style={{ color: 'var(--admin-text)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Xóa dự án?
            </h3>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Hành động này không thể hoàn tác.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                padding: '0.5rem 1rem', background: 'var(--admin-border)', border: 'none',
                borderRadius: '8px', color: 'var(--admin-text-muted)', cursor: 'pointer', fontSize: '0.875rem',
              }}>Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{
                padding: '0.5rem 1rem', background: '#ef4444', border: 'none',
                borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.875rem',
              }}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {editing && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--admin-modal-bg)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          zIndex: 100, overflowY: 'auto', padding: '2rem 1rem',
        }}>
          <div style={{
            background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px',
            padding: '1.5rem', maxWidth: '700px', width: '100%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--admin-text)', fontSize: '1.125rem', fontWeight: 600 }}>
                {isNew ? 'Thêm dự án mới' : 'Chỉnh sửa dự án'}
              </h2>
              <button onClick={() => setEditing(null)} style={{
                background: 'none', border: 'none', color: 'var(--admin-text-light)', cursor: 'pointer',
              }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Tên dự án *</label>
                <input style={inputStyle} value={editing.title} onChange={e => setEditing({...editing, title: e.target.value, slug: slugify(e.target.value)})} />
              </div>
              <div>
                <label style={labelStyle}>Khách hàng</label>
                <input style={inputStyle} value={editing.client} onChange={e => setEditing({...editing, client: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Địa điểm</label>
                <input style={inputStyle} value={editing.location} onChange={e => setEditing({...editing, location: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Danh mục</label>
                <select style={inputStyle} value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})}>
                  {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Công suất</label>
                <input style={inputStyle} value={editing.capacity} onChange={e => setEditing({...editing, capacity: e.target.value})} placeholder="VD: 500 m³/ngày" />
              </div>
              <div>
                <label style={labelStyle}>Năm</label>
                <input style={inputStyle} value={editing.year} onChange={e => setEditing({...editing, year: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Slug</label>
                <input style={inputStyle} value={editing.slug} onChange={e => setEditing({...editing, slug: e.target.value})} />
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
                <label style={labelStyle}>Tags (phân cách bằng dấu phẩy)</label>
                <input style={inputStyle} value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="MBR, UASB, Nước thải công nghiệp" />
              </div>
              <div>
                <label style={labelStyle}>Hình ảnh</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)}
                  style={{ ...inputStyle, padding: '0.5rem' }} />
                {editing.image && !imageFile && (
                  <img src={editing.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
                <input type="checkbox" id="featured" checked={editing.featured}
                  onChange={e => setEditing({...editing, featured: e.target.checked})}
                  style={{ accentColor: '#22c55e' }} />
                <label htmlFor="featured" style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Nổi bật</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => setEditing(null)} style={{
                padding: '0.625rem 1.25rem', background: 'var(--admin-border)', border: 'none',
                borderRadius: '8px', color: 'var(--admin-text-muted)', cursor: 'pointer', fontSize: '0.875rem',
              }}>Hủy</button>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '0.625rem 1.25rem',
                background: saving ? '#374151' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                border: 'none', borderRadius: '8px', color: 'white', cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem',
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
