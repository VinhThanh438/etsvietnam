import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quản trị | ETS VN Admin',
  description: 'Trang quản trị nội dung ETS Việt Nam',
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-root">
      {children}
    </div>
  )
}
