import { NextResponse } from 'next/server'
import { incrementAnalytics } from '@/lib/data/analytics'

export async function POST(request: Request) {
  try {
    const { type, referrer } = await request.json()

    if (type === 'pageview') {
      await incrementAnalytics('pageviews')
      if (
        referrer &&
        (referrer.includes('google.com') ||
          referrer.includes('bing.com') ||
          referrer.includes('yahoo.com') ||
          referrer.includes('coccoc.com'))
      ) {
        await incrementAnalytics('seo_traffic')
      }
    } else if (type === 'event') {
      await incrementAnalytics('events')
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
