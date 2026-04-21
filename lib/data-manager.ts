/**
 * Data management utilities — file upload helpers only.
 * JSON read/write logic has been removed; all data now lives in Supabase.
 */
import fs from 'fs/promises'
import path from 'path'

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
export async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder)
  await ensureDir(uploadDir)

  const buffer = Buffer.from(await file.arrayBuffer())
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
 * Delete a file from the public directory
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
    return files.map((f) => `/uploads/${subfolder}/${f}`)
  } catch {
    return []
  }
}
