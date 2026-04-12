import { NextResponse } from 'next/server'
import { getAnalytics, saveAnalytics } from '@/lib/data/analytics'

export async function POST(request: Request) {
  try {
    const { type, referrer } = await request.json()
    const data = await getAnalytics()

    if (type === 'pageview') {
      data.pageviews += 1
      if (referrer && (referrer.includes('google.com') || referrer.includes('bing.com') || referrer.includes('yahoo.com') || referrer.includes('coccoc.com'))) {
        data.seoTraffic += 1
      }
    } else if (type === 'event') {
      data.events += 1
    }

    data.lastUpdated = new Date().toISOString()
    await saveAnalytics(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
