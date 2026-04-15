import { Resend } from 'resend'

interface ContactEmailData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  submittedAt: string
}

export async function sendContactNotification(data: ContactEmailData) {
  const apiKey = process.env.RESEND_API_KEY
  const recipientEmail = process.env.NOTIFICATION_EMAIL

  if (!apiKey || !recipientEmail) {
    console.warn('[Mailer] RESEND_API_KEY hoặc NOTIFICATION_EMAIL chưa được cấu hình.')
    return
  }

  const resend = new Resend(apiKey)

  const formattedDate = new Date(data.submittedAt).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0f4f8; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #15803d, #166534); padding: 28px 32px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; }
    .header p { color: #bbf7d0; margin: 6px 0 0; font-size: 13px; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 18px; }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #1e293b; padding: 10px 14px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #22c55e; }
    .message-box { background: #f8fafc; border-radius: 8px; padding: 16px; border-left: 3px solid #22c55e; white-space: pre-wrap; line-height: 1.6; color: #334155; font-size: 14px; }
    .footer { background: #f8fafc; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #94a3b8; font-size: 12px; margin: 0; }
    .badge { display: inline-block; background: #dcfce7; color: #15803d; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📩 Yêu cầu tư vấn mới</h1>
      <p>Có khách hàng vừa gửi form liên hệ trên website</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Họ và tên</div>
        <div class="field-value">${escapeHtml(data.name)}</div>
      </div>
      <div class="field">
        <div class="field-label">Số điện thoại</div>
        <div class="field-value"><a href="tel:${escapeHtml(data.phone)}" style="color:#15803d;text-decoration:none;">${escapeHtml(data.phone)}</a></div>
      </div>
      ${data.email ? `
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${escapeHtml(data.email)}" style="color:#15803d;text-decoration:none;">${escapeHtml(data.email)}</a></div>
      </div>
      ` : ''}
      ${data.service ? `
      <div class="field">
        <div class="field-label">Dịch vụ quan tâm</div>
        <div class="field-value"><span class="badge">${escapeHtml(data.service)}</span></div>
      </div>
      ` : ''}
      <div class="field">
        <div class="field-label">Nội dung tin nhắn</div>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
      <div class="field">
        <div class="field-label">Thời gian gửi</div>
        <div class="field-value">${formattedDate}</div>
      </div>
    </div>
    <div class="footer">
      <p>Email được gửi tự động từ hệ thống ETS Vietnam</p>
    </div>
  </div>
</body>
</html>
  `.trim()

  try {
    const { error } = await resend.emails.send({
      from: 'ETS Vietnam <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `[Tư vấn] ${data.name} - ${data.phone}${data.service ? ` - ${data.service}` : ''}`,
      html: htmlContent,
      replyTo: data.email || undefined,
    })

    if (error) {
      console.error('[Mailer] Resend error:', error)
    } else {
      console.log('[Mailer] Email gửi thành công đến:', recipientEmail)
    }
  } catch (error) {
    console.error('[Mailer] Lỗi gửi email:', error)
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
