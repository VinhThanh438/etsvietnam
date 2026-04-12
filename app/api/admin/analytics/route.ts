import { NextResponse } from 'next/server'
import { getAnalytics } from '@/lib/data/analytics'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getAnalytics()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ pageviews: 0, seoTraffic: 0, events: 0 }, { status: 500 })
  }
}
