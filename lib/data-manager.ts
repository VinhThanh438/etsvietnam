/**
 * Data management utilities for reading/writing JSON data files.
 * Used by admin API routes for CRUD operations.
 */
import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

export async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename)
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content) as T
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath)
  } catch {
    await fs.mkdir(dirPath, { recursive: true })
  }
}

/**
 * Save an uploaded file to public/uploads/{subfolder}
 * Returns the public URL path
 */
export async function saveUploadedFile(
  file: File,
  subfolder: string
): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder)
  await ensureDir(uploadDir)

  const buffer = Buffer.from(await file.arrayBuffer())
  // Sanitize filename
  const timestamp = Date.now()
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
  const filename = `${timestamp}-${safeName}`
  const filePath = path.join(uploadDir, filename)

  await fs.writeFile(filePath, buffer)
  return `/uploads/${subfolder}/${filename}`
}

/**
 * Delete a file from public directory
 */
export async function deleteUploadedFile(publicPath: string): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), 'public', publicPath)
    await fs.unlink(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * List all files in an upload subfolder
 */
export async function listUploadedFiles(subfolder: string): Promise<string[]> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder)
  try {
    const files = await fs.readdir(uploadDir)
    return files.map(f => `/uploads/${subfolder}/${f}`)
  } catch {
    return []
  }
}
