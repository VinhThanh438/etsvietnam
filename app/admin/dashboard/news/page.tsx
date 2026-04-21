/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import type { NewsArticle } from '@/lib/types'
import { formatDate, slugify } from '@/lib/utils'
import { Bold, Hash, Heading, Image, Italic, Link2, List, Loader2, Pencil, Plus, Save, Search, Star, Trash2, Video, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const categoryOptions = [
  { value: 'cong-nghe', label: 'Công nghệ' },
  { value: 'phap-ly', label: 'Pháp lý' },
  { value: 'tin-tuc', label: 'Tin tức' },
  { value: 'huong-dan', label: 'Hướng dẫn' },
  { value: 'du-an', label: 'Dự án' },
]

const emptyArticle: Partial<NewsArticle> = {
  title: '', slug: '', excerpt: '', content: '', author: '', category: 'tin-tuc',
  categoryLabel: 'Tin tức', image: '', publishedAt: new Date().toISOString().split('T')[0],
  readingTime: '5 phút', featured: false, tags: [],
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Partial<NewsArticle> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [tagsInput, setTagsInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const fetchData = useCallback(async () => {
    const res = await fetch('/api/admin/news')
    if (res.ok) setArticles(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // eslint-disable-next-line react-hooks/immutability
    if (params.get('action') === 'new') openNew()
  }, [])

  const openNew = () => {
    setEditing({ ...emptyArticle })
    setIsNew(true)
    setTagsInput('')
    setImageFile(null)
  }

  const openEdit = (article: NewsArticle) => {
    setEditing({ ...article })
    setIsNew(false)
    setTagsInput(article.tags.join(', '))
    setImageFile(null)
  }

  // Rich editor toolbar actions
  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = contentRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const content = editing?.content || ''
    const selected = content.substring(start, end)
    const newContent = content.substring(0, start) + before + selected + after + content.substring(end)
    setEditing({ ...editing, content: newContent })
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + selected.length
    }, 0)
  }

  const insertImage = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'news')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const { url } = await res.json()
        insertAtCursor(`\n![${file.name}](${url})\n`)
      }
    }
    input.click()
  }

  const insertYoutube = () => {
    const url = prompt('Nhập URL video YouTube:')
    if (!url) return
    // Extract video ID
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/)
    if (match) {
      insertAtCursor(`\n<youtube>${match[1]}</youtube>\n`)
    } else {
      insertAtCursor(`\n<youtube>${url}</youtube>\n`)
    }
  }

  const handleSave = async () => {
    if (!editing?.title) return
    setSaving(true)

    try {
      let imageUrl = editing.image || ''

      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('folder', 'news')
        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        if (uploadRes.ok) {
          const { url } = await uploadRes.json()
          imageUrl = url
        }
      }

      const slug = editing.slug || slugify(editing.title)
      const cat = categoryOptions.find(c => c.value === editing.category)
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)

      const data = {
        ...editing,
        id: isNew ? slug : editing.id,
        slug,
        image: imageUrl,
        categoryLabel: cat?.label || editing.categoryLabel,
        tags,
      }

      const res = await fetch('/api/admin/news', {
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
    const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      await fetchData()
      setDeleteConfirm(null)
    }
  }

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
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
  const toolbarBtnStyle: React.CSSProperties = {
    background: 'var(--admin-border)', border: 'none', borderRadius: '6px',
    padding: '6px 8px', cursor: 'pointer', color: 'var(--admin-text-muted)',
    display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem',
  }

  if (loading) return <div style={{ color: 'var(--admin-text-muted)', padding: '2rem', textAlign: 'center' }}>Đang tải...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--admin-text)' }}>Bài viết</h1>
          <p style={{ color: 'var(--admin-text-light)', fontSize: '0.8125rem' }}>{articles.length} bài viết</p>
        </div>
        <button onClick={openNew} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
        }}>
          <Plus size={16} /> Viết bài mới
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
        <input type="text" placeholder="Tìm kiếm bài viết hoặc hashtag..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
      </div>

      {/* Articles list */}
      <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        {filtered.map((a, i) => (
          <div key={a.id} style={{
            display: 'flex', gap: '1rem', padding: '1rem 1.25rem', alignItems: 'center',
            borderBottom: i < filtered.length - 1 ? '1px solid #334155' : 'none',
          }}>
            {a.image && (
              <img src={a.image} alt="" style={{
                width: '56px', height: '56px', borderRadius: '8px',
                objectFit: 'cover', border: '1px solid #334155', flexShrink: 0,
              }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                {a.featured && <Star size={12} color="#f59e0b" fill="#f59e0b" />}
                <span style={{ color: 'var(--admin-text)', fontSize: '0.9rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', padding: '1px 6px', borderRadius: '4px', background: '#22c55e20', color: '#4ade80' }}>{a.categoryLabel}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>{formatDate(a.publishedAt)}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>{a.author}</span>
              </div>
              {a.tags?.length > 0 && (
                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.375rem', flexWrap: 'wrap' }}>
                  {a.tags.map(t => (
                    <span key={t} style={{ fontSize: '0.6875rem', padding: '1px 6px', borderRadius: '4px', background: '#3b82f620', color: '#60a5fa' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
              <button onClick={() => openEdit(a)} style={{
                background: 'var(--admin-border)', border: 'none', borderRadius: '6px',
                padding: '6px', cursor: 'pointer', color: 'var(--admin-text-muted)',
              }}><Pencil size={14} /></button>
              <button onClick={() => setDeleteConfirm(a.id)} style={{
                background: '#450a0a60', border: 'none', borderRadius: '6px',
                padding: '6px', cursor: 'pointer', color: '#f87171',
              }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>
            {search ? 'Không tìm thấy bài viết nào.' : 'Chưa có bài viết nào.'}
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--admin-modal-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ color: 'var(--admin-text)', marginBottom: '0.5rem' }}>Xóa bài viết?</h3>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Hành động này không thể hoàn tác.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '0.5rem 1rem', background: 'var(--admin-border)', border: 'none', borderRadius: '8px', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '0.5rem 1rem', background: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {editing && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--admin-modal-bg)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          zIndex: 100, overflowY: 'auto', padding: '1rem',
        }}>
          <div style={{
            background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px',
            padding: '1.5rem', maxWidth: '900px', width: '100%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--admin-text)', fontSize: '1.125rem', fontWeight: 600 }}>
                {isNew ? 'Viết bài mới' : 'Chỉnh sửa bài viết'}
              </h2>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-light)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Tiêu đề bài viết *</label>
                <input style={inputStyle} value={editing.title}
                  onChange={e => setEditing({...editing, title: e.target.value, slug: slugify(e.target.value)})}
                  placeholder="Nhập tiêu đề bài viết" />
              </div>

              <div>
                <label style={labelStyle}>Danh mục</label>
                <select style={inputStyle} value={editing.category}
                  onChange={e => setEditing({...editing, category: e.target.value})}>
                  {categoryOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Tác giả</label>
                <input style={inputStyle} value={editing.author}
                  onChange={e => setEditing({...editing, author: e.target.value})}
                  placeholder="Tên tác giả" />
              </div>
              <div>
                <label style={labelStyle}>Ngày đăng</label>
                <input type="date" style={inputStyle} value={editing.publishedAt}
                  onChange={e => setEditing({...editing, publishedAt: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Thời gian đọc</label>
                <input style={inputStyle} value={editing.readingTime}
                  onChange={e => setEditing({...editing, readingTime: e.target.value})}
                  placeholder="5 phút" />
              </div>
              <div>
                <label style={labelStyle}>Slug</label>
                <input style={inputStyle} value={editing.slug}
                  onChange={e => setEditing({...editing, slug: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Ảnh đại diện</label>
                <input type="file" accept="image/*"
                  onChange={e => setImageFile(e.target.files?.[0] || null)}
                  style={{ ...inputStyle, padding: '0.5rem' }} />
                {editing.image && !imageFile && (
                  <img src={editing.image} alt="" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />
                )}
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Mô tả ngắn (excerpt)</label>
                <textarea style={{...inputStyle, minHeight: '60px', resize: 'vertical'}}
                  value={editing.excerpt}
                  onChange={e => setEditing({...editing, excerpt: e.target.value})}
                  placeholder="Tóm tắt nội dung bài viết..." />
              </div>

              {/* Rich Content Editor */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Nội dung bài viết (Markdown)</label>
                {/* Toolbar */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '0.375rem', background: 'var(--admin-bg)',
                  border: '1px solid #334155', borderBottom: 'none',
                  borderRadius: '8px 8px 0 0', padding: '0.5rem',
                }}>
                  <button type="button" onClick={() => insertAtCursor('**', '**')} style={toolbarBtnStyle} title="In đậm">
                    <Bold size={14} /> <span>Đậm</span>
                  </button>
                  <button type="button" onClick={() => insertAtCursor('*', '*')} style={toolbarBtnStyle} title="In nghiêng">
                    <Italic size={14} /> <span>Nghiêng</span>
                  </button>
                  <button type="button" onClick={() => insertAtCursor('\n## ', '\n')} style={toolbarBtnStyle} title="Tiêu đề">
                    <Heading size={14} /> <span>Tiêu đề</span>
                  </button>
                  <button type="button" onClick={() => insertAtCursor('\n- ')} style={toolbarBtnStyle} title="Danh sách">
                    <List size={14} /> <span>List</span>
                  </button>
                  <button type="button" onClick={() => insertAtCursor('[', '](url)')} style={toolbarBtnStyle} title="Liên kết">
                    <Link2 size={14} /> <span>Link</span>
                  </button>
                  <button type="button" onClick={insertImage} style={toolbarBtnStyle} title="Chèn ảnh">
                    <Image size={14} /> <span>Ảnh</span>
                  </button>
                  <button type="button" onClick={insertYoutube} style={{...toolbarBtnStyle, color: '#ef4444'}} title="Video YouTube">
                    <Video size={14} /> <span>YouTube</span>
                  </button>
                </div>
                <textarea
                  ref={contentRef}
                  style={{
                    ...inputStyle,
                    minHeight: '300px',
                    resize: 'vertical',
                    borderRadius: '0 0 8px 8px',
                    fontFamily: 'monospace',
                    lineHeight: 1.6,
                  }}
                  value={editing.content}
                  onChange={e => setEditing({...editing, content: e.target.value})}
                  placeholder="Nhập nội dung bài viết bằng Markdown...&#10;&#10;## Tiêu đề phần&#10;&#10;Nội dung đoạn văn...&#10;&#10;- Mục 1&#10;- Mục 2&#10;&#10;<youtube>VIDEO_ID</youtube>"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}><Hash size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> Hashtags (phân cách bằng dấu phẩy)</label>
                <input style={inputStyle} value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="MBR, Công nghệ xử lý, Màng lọc" />
                {tagsInput && (
                  <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {tagsInput.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                      <span key={t} style={{
                        fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px',
                        background: '#3b82f620', color: '#60a5fa',
                      }}>#{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="news-featured" checked={editing.featured}
                  onChange={e => setEditing({...editing, featured: e.target.checked})}
                  style={{ accentColor: '#22c55e' }} />
                <label htmlFor="news-featured" style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Bài viết nổi bật</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => setEditing(null)} style={{
                padding: '0.625rem 1.25rem', background: 'var(--admin-border)', border: 'none',
                borderRadius: '8px', color: 'var(--admin-text-muted)', cursor: 'pointer',
              }}>Hủy</button>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '0.625rem 1.25rem',
                background: saving ? '#374151' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                border: 'none', borderRadius: '8px', color: 'white',
                cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Đang lưu...' : 'Lưu bài viết'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
