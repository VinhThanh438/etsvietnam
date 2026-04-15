/* eslint-disable @next/next/no-img-element */
'use client'

import { CheckCircle, Copy, FolderOpen, Image as ImageIcon, Loader2, Trash2, Upload } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const folders = [
  { value: 'projects', label: 'Dự án' },
  { value: 'news', label: 'Bài viết' },
  { value: 'partners', label: 'Đối tác' },
  { value: 'general', label: 'Chung' },
]

export default function MediaPage() {
  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [currentFolder, setCurrentFolder] = useState('projects')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/upload?folder=${currentFolder}`)
    if (res.ok) {
      const data = await res.json()
      setFiles(data.files || [])
    }
    setLoading(false)
  }, [currentFolder])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchFiles() }, [fetchFiles])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList?.length) return

    setUploading(true)
    for (const file of Array.from(fileList)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', currentFolder)
      await fetch('/api/admin/upload', { method: 'POST', body: formData })
    }
    await fetchFiles()
    setUploading(false)
  }

  const handleDelete = async (filePath: string) => {
    await fetch(`/api/admin/upload?path=${encodeURIComponent(filePath)}`, { method: 'DELETE' })
    await fetchFiles()
    setDeleteConfirm(null)
  }

  const copyUrl = (path: string) => {
    navigator.clipboard.writeText(path)
    setCopied(path)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--admin-text)' }}>Quản lý hình ảnh</h1>
          <p style={{ color: 'var(--admin-text-light)', fontSize: '0.8125rem' }}>{files.length} file trong thư mục</p>
        </div>
        <label style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
          borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
        }}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Đang tải...' : 'Tải ảnh lên'}
          <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Folder tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {folders.map(f => (
          <button key={f.value} onClick={() => setCurrentFolder(f.value)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
              background: currentFolder === f.value ? '#22c55e15' : 'var(--admin-surface)',
              color: currentFolder === f.value ? '#22c55e' : 'var(--admin-text-muted)',
              cursor: 'pointer', fontSize: '0.8125rem',
              fontWeight: currentFolder === f.value ? 600 : 400,
              outline: currentFolder === f.value ? '1px solid #22c55e40' : '1px solid #334155',
            }}>
            <FolderOpen size={14} /> {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: 'var(--admin-text-muted)', padding: '2rem', textAlign: 'center' }}>Đang tải...</div>
      ) : files.length === 0 ? (
        <div style={{
          background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px',
          padding: '3rem', textAlign: 'center',
        }}>
          <ImageIcon size={48} color="#334155" style={{ margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--admin-text-light)' }}>Thư mục trống</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
          {files.map(f => (
            <div key={f} style={{
              background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '10px',
              overflow: 'hidden', position: 'relative',
            }}>
              <div style={{
                height: '120px', background: 'var(--admin-surface-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                <img src={f} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
              </div>
              <div style={{ padding: '0.5rem 0.625rem' }}>
                <p style={{
                  color: 'var(--admin-text-muted)', fontSize: '0.6875rem', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.375rem',
                }}>
                  {f.split('/').pop()}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  <button onClick={() => copyUrl(f)} style={{
                    flex: 1, background: 'var(--admin-border)', border: 'none', borderRadius: '5px',
                    padding: '4px', cursor: 'pointer', color: copied === f ? '#22c55e' : 'var(--admin-text-muted)',
                    fontSize: '0.6875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                  }}>
                    {copied === f ? <><CheckCircle size={10} /> Đã sao</> : <><Copy size={10} /> URL</>}
                  </button>
                  <button onClick={() => setDeleteConfirm(f)} style={{
                    background: '#450a0a60', border: 'none', borderRadius: '5px',
                    padding: '4px 6px', cursor: 'pointer', color: '#f87171',
                  }}><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--admin-modal-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ color: 'var(--admin-text)', marginBottom: '0.5rem' }}>Xóa file?</h3>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>File sẽ bị xóa vĩnh viễn.</p>
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
