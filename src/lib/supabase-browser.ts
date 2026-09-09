"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function supabaseBrowser(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const kunci = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !kunci) {
    throw new Error("Supabase belum terhubung di klien.");
  }
  return createBrowserClient(url, kunci);
}
