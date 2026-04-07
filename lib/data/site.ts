import { cache } from 'react'
import type { SiteConfig } from '@/lib/types'
import siteData from '@/data/site.json'

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  return siteData as SiteConfig
})

import type { Partner } from '@/lib/types'
import partnersData from '@/data/partners.json'

export const getPartners = cache(async (): Promise<Partner[]> => {
  return partnersData as Partner[]
})
