import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Klien service role. Hanya untuk route server (webhook dan tugas akhir bulan). */
export function supabaseLayanan(): SupabaseClient | null {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/$/, "");
  const kunci = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  if (!url || !kunci) return null;
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|net)$/i.test(url)) return null;
  return createClient(url, kunci, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
