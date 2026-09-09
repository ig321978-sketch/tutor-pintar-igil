import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { adalahPeranAdmin, bacaPeranPengguna } from "@/lib/peran";

function kredensialPublik(): { url: string; kunci: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const kunci =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !kunci) return null;
  return { url, kunci };
}

export async function supabaseAuthServer(): Promise<SupabaseClient | null> {
  const kredensial = kredensialPublik();
  if (!kredensial) return null;
  const toko = await cookies();
  return createServerClient(kredensial.url, kredensial.kunci, {
    cookies: {
      getAll() {
        return toko.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            toko.set(name, value, options);
          });
        } catch {
          // Server Component tidak bisa menulis cookie; middleware yang menyegarkan sesi.
        }
      },
    },
  });
}

export async function sesiPenggunaSaatIni(): Promise<{
  user: User | null;
  peran: string | null;
  adalahAdmin: boolean;
}> {
  const supabase = await supabaseAuthServer();
  if (!supabase) {
    return { user: null, peran: null, adalahAdmin: false };
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { user: null, peran: null, adalahAdmin: false };
  }
  const peran = await bacaPeranPengguna(supabase, user);
  return { user, peran, adalahAdmin: adalahPeranAdmin(peran) };
}

export async function responsJikaBukanAdmin(): Promise<NextResponse | null> {
  const { adalahAdmin } = await sesiPenggunaSaatIni();
  if (adalahAdmin) return null;
  return NextResponse.json(
    { berhasil: false, pesan: "Unauthorized" },
    { status: 401 },
  );
}
