import type { SiteConfig } from '@/lib/types'
import type { Partner } from '@/lib/types'
import fs from 'fs'
import path from 'path'

function readJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', filename)
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as T
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return readJson<SiteConfig>('site.json')
}

export async function getPartners(): Promise<Partner[]> {
  return readJson<Partner[]>('partners.json')
}
