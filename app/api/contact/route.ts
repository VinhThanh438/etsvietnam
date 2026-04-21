import { NextRequest } from 'next/server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { supabaseAdmin } from '@/lib/supabase'
import { sendContactNotification } from '@/lib/mailer'

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 1 lần gửi / 24 giờ / IP
    const ip = getClientIp(request)
    const limiter = rateLimit(`contact:${ip}`, {
      maxRequests: 1,
      windowMs: 24 * 60 * 60 * 1000,
    })

    if (!limiter.success) {
      const waitMs = limiter.resetAt - Date.now()
      const waitHours = Math.ceil(waitMs / (1000 * 60 * 60))
      const waitMins = Math.ceil(waitMs / (1000 * 60))
      const waitText = waitHours >= 1 ? `${waitHours} giờ nữa` : `${waitMins} phút nữa`
      return Response.json(
        { error: `Bạn đã gửi yêu cầu rồi. Vui lòng thử lại sau ${waitText}.` },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, phone, email, service, message } = body

    if (!name || !phone || !message) {
      return Response.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' },
        { status: 400 }
      )
    }
    if (name.length < 2 || name.length > 100) {
      return Response.json({ error: 'Tên không hợp lệ.' }, { status: 400 })
    }
    if (!/^[0-9\s+()-]{8,15}$/.test(phone.replace(/\s/g, ''))) {
      return Response.json({ error: 'Số điện thoại không hợp lệ.' }, { status: 400 })
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Email không hợp lệ.' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('contacts').insert({
      name: name.trim(),
      email: (email ?? '').trim(),
      phone: phone.trim(),
      service: (service ?? '').trim(),
      message: message.trim(),
      submitted_at: new Date().toISOString(),
      read: false,
    })

    if (error) {
      console.error('[Contact API] DB error:', error.message)
      return Response.json({ error: 'Lỗi hệ thống. Vui lòng thử lại sau.' }, { status: 500 })
    }

    sendContactNotification({
      name: name.trim(),
      email: (email ?? '').trim(),
      phone: phone.trim(),
      service: (service ?? '').trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    }).catch((err) => console.error('[Contact API] Email error:', err))

    return Response.json({
      success: true,
      message: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.',
    })
  } catch {
    return Response.json({ error: 'Lỗi hệ thống. Vui lòng thử lại sau.' }, { status: 500 })
  }
}
