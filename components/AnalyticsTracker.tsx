'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function AnalyticsTracker() {
  const pathname = usePathname()
  const trackedUrl = useRef<string | null>(null)

  useEffect(() => {
    // Only track if the pathname has changed to prevent double-firing in strict mode
    if (trackedUrl.current === pathname) return
    trackedUrl.current = pathname

    // Avoid tracking admin page views to not skew data
    if (pathname.startsWith('/admin')) return

    const track = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'pageview',
            referrer: document.referrer
          })
        })
      } catch (e) {
        // Silent block for trackers
      }
    }

    track()
  }, [pathname])

  return null
}
