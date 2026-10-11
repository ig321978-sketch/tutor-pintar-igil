import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { kredensialSupabasePublik } from "@/lib/kredensial-supabase";
import { adalahPeranAdmin, bacaPeranPengguna } from "@/lib/peran";

function kredensialPublik(): { url: string; kunci: string } | null {
  return kredensialSupabasePublik();
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
  let user: User | null = null;
  try {
    const hasil = await supabase.auth.getUser();
    user = hasil.data.user;
  } catch {
    return { user: null, peran: null, adalahAdmin: false };
  }
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
