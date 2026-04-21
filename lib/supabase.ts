import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[Supabase] Missing env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
})

/**
 * Admin client — uses the Service Role key to bypass Row Level Security.
 * ONLY use in API routes / server-side code. NEVER expose to the browser.
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey ?? supabaseAnonKey, // falls back to anon if service key not set
  { auth: { persistSession: false } }
)
