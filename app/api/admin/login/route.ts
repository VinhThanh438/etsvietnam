import { NextRequest } from 'next/server'
import { createSession, validateCredentials } from '@/lib/auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 attempts per 15 minutes per IP
    const ip = getClientIp(request)
    const limiter = rateLimit(`login:${ip}`, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000,
    })

    if (!limiter.success) {
      const retryAfter = Math.ceil((limiter.resetAt - Date.now()) / 1000)
      return Response.json(
        { error: 'Quá nhiều lần thử. Vui lòng thử lại sau.' },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfter) },
        }
      )
    }

    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return Response.json(
        { error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' },
        { status: 400 }
      )
    }

    const isValid = validateCredentials(username, password)
    if (!isValid) {
      return Response.json(
        { error: 'Tên đăng nhập hoặc mật khẩu không đúng.' },
        { status: 401 }
      )
    }

    await createSession(username)

    return Response.json({ success: true, message: 'Đăng nhập thành công.' })
  } catch {
    return Response.json(
      { error: 'Lỗi hệ thống. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
