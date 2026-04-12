import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data/analytics.json')

export interface Analytics {
  pageviews: number
  seoTraffic: number
  events: number
  lastUpdated: string
}

export async function getAnalytics(): Promise<Analytics> {
  try {
    const file = await fs.readFile(filePath, 'utf8')
    return JSON.parse(file)
  } catch (error) {
    const defaultData = { pageviews: 0, seoTraffic: 0, events: 0, lastUpdated: new Date().toISOString() }
    await saveAnalytics(defaultData)
    return defaultData
  }
}

export async function saveAnalytics(data: Analytics) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}
