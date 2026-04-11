import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-change-me'
const encodedKey = new TextEncoder().encode(secretKey)

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface SessionPayload {
  user: string
  role: string
  expiresAt: string
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(encodedKey)
}

export async function decrypt(session: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function createSession(username: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION)
  const session = await encrypt({
    user: username,
    role: 'admin',
    expiresAt: expiresAt.toISOString(),
  })

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)

  if (!sessionCookie?.value) return null

  const payload = await decrypt(sessionCookie.value)
  if (!payload) return null

  // Check expiration
  if (new Date(payload.expiresAt) < new Date()) {
    await deleteSession()
    return null
  }

  return payload
}

export function validateCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  // Constant-time comparison to prevent timing attacks
  const usernameMatch = username.length === adminUsername.length &&
    timingSafeEqual(username, adminUsername)
  const passwordMatch = password.length === adminPassword.length &&
    timingSafeEqual(password, adminPassword)

  return usernameMatch && passwordMatch
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}
