import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <p className="text-8xl font-bold text-green-100 mb-4">404</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Trang không tìm thấy</h1>
          <p className="text-gray-500 mb-8">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển đến địa chỉ khác.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/" iconLeft={<Home className="h-5 w-5" />}>
              Về trang chủ
            </Button>
            <Button href="/lien-he" variant="outline">
              Liên hệ hỗ trợ
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
