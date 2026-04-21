/* eslint-disable react/no-unescaped-entities */
'use client'

import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface SiteConfig {
  company: {
    name: string; fullName: string; slogan: string; description: string
    phone: string; email: string; address: string; taxCode: string
    founded: string; logo: string; teamImage?: string; website: string; facebook: string; zalo: string
  }
  seo: {
    defaultTitle: string; titleTemplate: string; defaultDescription: string
    siteUrl: string; ogImage: string
  }
  stats: { value: string; label: string }[]
  nav: { label: string; href: string }[]
  heroSlides?: { id: string; image: string }[]
}

export default function SettingsPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'company' | 'seo' | 'stats' | 'slider'>('company')

  const fetchData = useCallback(async () => {
    const res = await fetch('/api/admin/settings')
    if (res.ok) setConfig(await res.json())
    setLoading(false)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData() }, [fetchData])

  const handleSave = async () => {
    if (!config) return
    setSaving(true)
    setSaved(false)

    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    })

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.75rem', background: 'var(--admin-bg)',
    border: '1px solid #334155', borderRadius: '8px', color: 'var(--admin-text)', fontSize: '0.875rem', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--admin-text-muted)', marginBottom: '0.375rem',
  }
  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.625rem 1.25rem', background: active ? '#22c55e15' : 'transparent',
    border: 'none', borderBottom: active ? '2px solid #22c55e' : '2px solid transparent',
    color: active ? '#22c55e' : 'var(--admin-text-light)', cursor: 'pointer',
    fontSize: '0.875rem', fontWeight: active ? 600 : 400,
  })

  if (loading || !config) return <div style={{ color: 'var(--admin-text-muted)', padding: '2rem', textAlign: 'center' }}>Đang tải...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--admin-text)' }}>Cài đặt</h1>
          <p style={{ color: 'var(--admin-text-light)', fontSize: '0.8125rem' }}>Thông tin công ty, SEO & thống kê</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem',
          background: saving ? '#374151' : saved ? '#166534' : 'linear-gradient(135deg, #22c55e, #16a34a)',
          color: 'white', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer',
          fontWeight: 600, fontSize: '0.875rem',
        }}>
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Đang lưu...' : saved ? 'Đã lưu ✓' : 'Lưu thay đổi'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <button style={tabStyle(activeTab === 'company')} onClick={() => setActiveTab('company')}>Công ty</button>
        <button style={tabStyle(activeTab === 'seo')} onClick={() => setActiveTab('seo')}>SEO</button>
        <button style={tabStyle(activeTab === 'stats')} onClick={() => setActiveTab('stats')}>Thống kê</button>
        <button style={tabStyle(activeTab === 'slider')} onClick={() => setActiveTab('slider')}>Slider Trang chủ</button>
      </div>

      <div style={{ background: 'var(--admin-surface)', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem' }}>
        {/* Company Tab */}
        {activeTab === 'company' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Tên công ty (ngắn)</label>
              <input style={inputStyle} value={config.company.name}
                onChange={e => setConfig({...config, company: {...config.company, name: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Tên đầy đủ</label>
              <input style={inputStyle} value={config.company.fullName}
                onChange={e => setConfig({...config, company: {...config.company, fullName: e.target.value}})} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Slogan</label>
              <input style={inputStyle} value={config.company.slogan}
                onChange={e => setConfig({...config, company: {...config.company, slogan: e.target.value}})} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Mô tả công ty</label>
              <textarea style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} value={config.company.description}
                onChange={e => setConfig({...config, company: {...config.company, description: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Điện thoại</label>
              <input style={inputStyle} value={config.company.phone}
                onChange={e => setConfig({...config, company: {...config.company, phone: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} value={config.company.email}
                onChange={e => setConfig({...config, company: {...config.company, email: e.target.value}})} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Địa chỉ</label>
              <input style={inputStyle} value={config.company.address}
                onChange={e => setConfig({...config, company: {...config.company, address: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Mã số thuế</label>
              <input style={inputStyle} value={config.company.taxCode}
                onChange={e => setConfig({...config, company: {...config.company, taxCode: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Năm thành lập</label>
              <input style={inputStyle} value={config.company.founded}
                onChange={e => setConfig({...config, company: {...config.company, founded: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Website</label>
              <input style={inputStyle} value={config.company.website}
                onChange={e => setConfig({...config, company: {...config.company, website: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Facebook</label>
              <input style={inputStyle} value={config.company.facebook}
                onChange={e => setConfig({...config, company: {...config.company, facebook: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Zalo</label>
              <input style={inputStyle} value={config.company.zalo}
                onChange={e => setConfig({...config, company: {...config.company, zalo: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Logo URL</label>
              <input style={inputStyle} value={config.company.logo}
                onChange={e => setConfig({...config, company: {...config.company, logo: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Ảnh Đội ngũ URL</label>
              <input style={inputStyle} value={config.company.teamImage || ''} placeholder="/images/team.jpg"
                onChange={e => setConfig({...config, company: {...config.company, teamImage: e.target.value}})} />
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Tiêu đề mặc định</label>
              <input style={inputStyle} value={config.seo.defaultTitle}
                onChange={e => setConfig({...config, seo: {...config.seo, defaultTitle: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>Mẫu tiêu đề</label>
              <input style={inputStyle} value={config.seo.titleTemplate}
                onChange={e => setConfig({...config, seo: {...config.seo, titleTemplate: e.target.value}})} />
              <span style={{ fontSize: '0.6875rem', color: '#475569' }}>%s sẽ được thay bằng tiêu đề trang</span>
            </div>
            <div>
              <label style={labelStyle}>Site URL</label>
              <input style={inputStyle} value={config.seo.siteUrl}
                onChange={e => setConfig({...config, seo: {...config.seo, siteUrl: e.target.value}})} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Mô tả mặc định</label>
              <textarea style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} value={config.seo.defaultDescription}
                onChange={e => setConfig({...config, seo: {...config.seo, defaultDescription: e.target.value}})} />
            </div>
            <div>
              <label style={labelStyle}>OG Image URL</label>
              <input style={inputStyle} value={config.seo.ogImage}
                onChange={e => setConfig({...config, seo: {...config.seo, ogImage: e.target.value}})} />
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem', marginBottom: '1rem' }}>
              Các con số thống kê hiển thị trên trang chủ
            </p>
            {config.stats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <input style={{ ...inputStyle, width: '120px' }} value={stat.value} placeholder="Giá trị"
                  onChange={e => {
                    const newStats = [...config.stats]
                    newStats[i] = { ...newStats[i], value: e.target.value }
                    setConfig({...config, stats: newStats})
                  }} />
                <input style={{ ...inputStyle, flex: 1 }} value={stat.label} placeholder="Nhãn"
                  onChange={e => {
                    const newStats = [...config.stats]
                    newStats[i] = { ...newStats[i], label: e.target.value }
                    setConfig({...config, stats: newStats})
                  }} />
                <button onClick={() => {
                  const newStats = config.stats.filter((_, idx) => idx !== i)
                  setConfig({...config, stats: newStats})
                }} style={{
                  background: '#450a0a60', border: 'none', borderRadius: '6px',
                  padding: '6px', cursor: 'pointer', color: '#f87171',
                }}><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => {
              setConfig({...config, stats: [...config.stats, { value: '', label: '' }]})
            }} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
              background: 'var(--admin-border)', border: 'none', borderRadius: '8px',
              color: 'var(--admin-text-muted)', cursor: 'pointer', fontSize: '0.8125rem', marginTop: '0.5rem',
            }}>
              <Plus size={14} /> Thêm thống kê
            </button>
          </div>
        )}

        {/* Slider Tab */}
        {activeTab === 'slider' && (
          <div>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.8125rem', marginBottom: '1rem' }}>
              Quản lý danh sách ảnh nền Slider trên trang chủ. Có thể sao chép đường dẫn ảnh từ quản lý "Hình ảnh" để dán vào.
            </p>
            {config.heroSlides?.map((slide, i) => (
              <div key={slide.id || i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', background: '#334155',
                  backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0
                }} />
                <input style={{ ...inputStyle, flex: 1 }} value={slide.image} placeholder="/images/banner.png hoặc URL ảnh..."
                  onChange={e => {
                    const newSlides = [...(config.heroSlides || [])]
                    newSlides[i] = { ...newSlides[i], image: e.target.value }
                    setConfig({...config, heroSlides: newSlides})
                  }} />
                <button onClick={() => {
                  const newSlides = (config.heroSlides || []).filter((_, idx) => idx !== i)
                  setConfig({...config, heroSlides: newSlides})
                }} style={{
                  background: '#450a0a60', border: 'none', borderRadius: '6px',
                  padding: '6px', cursor: 'pointer', color: '#f87171',
                }}><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => {
              setConfig({...config, heroSlides: [...(config.heroSlides || []), { id: Date.now().toString(), image: '' }]})
            }} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
              background: 'var(--admin-border)', border: 'none', borderRadius: '8px',
              color: 'var(--admin-text-muted)', cursor: 'pointer', fontSize: '0.8125rem', marginTop: '0.5rem',
            }}>
              <Plus size={14} /> Thêm ảnh mới
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
