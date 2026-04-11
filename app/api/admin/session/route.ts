import { verifySession } from '@/lib/auth'

export async function GET() {
  const session = await verifySession()
  if (!session) {
    return Response.json({ authenticated: false }, { status: 401 })
  }
  return Response.json({ authenticated: true, user: session.user })
}
