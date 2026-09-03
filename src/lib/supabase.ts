import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function supabaseServer(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const kunci =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !kunci) return null;
  return createClient(url, kunci, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
