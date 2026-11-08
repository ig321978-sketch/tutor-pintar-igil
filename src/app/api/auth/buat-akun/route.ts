import { NextResponse } from "next/server";
import { pesanGalatAuthSupabase } from "@/lib/kredensial-supabase";
import { supabaseAuthServer } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function balas(isi: Record<string, unknown>, status = 200) {
  const res = NextResponse.json(isi, { status });
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

/**
 * POST /api/auth/buat-akun { email, password }
 * Akun orang tua. Email hanya dipakai sebagai nama masuk. IGIL tidak mengirim pemberitahuan lewat email.
 * Agar orang tua langsung masuk, "Confirm email" di Supabase Auth harus dimatikan.
 * Akun baru berperan biasa (bukan admin) sehingga hanya membuka halaman publik pilot.
 */
export async function POST(req: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = (await req.json()) as { email?: unknown; password?: unknown };
  } catch {
    return balas({ berhasil: false, pesan: "Request JSON tidak valid." }, 400);
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!EMAIL.test(email) || email.length > 120) {
    return balas({ berhasil: false, pesan: "Alamat email belum benar." }, 400);
  }
  if (password.length < 8 || password.length > 72) {
    return balas({ berhasil: false, pesan: "Kata sandi minimal 8 karakter." }, 400);
  }

  const supabase = await supabaseAuthServer();
  if (!supabase) {
    return balas({ berhasil: false, pesan: "Supabase Auth belum terhubung di server." }, 503);
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      const jaringan = /fetch failed|failed to fetch|enotfound|getaddrinfo/i.test(error.message ?? "");
      const sudahAda = /already registered|already been registered/i.test(error.message ?? "");
      return balas(
        {
          berhasil: false,
          pesan: sudahAda
            ? "Email ini sudah punya akun. Pilih Masuk."
            : pesanGalatAuthSupabase(error),
        },
        jaringan ? 503 : 400,
      );
    }
    // Email yang sudah terdaftar dikembalikan tanpa identitas agar keberadaan akun tidak bocor.
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return balas({ berhasil: false, pesan: "Email ini sudah punya akun. Pilih Masuk." }, 400);
    }
    if (!data.session) {
      return balas({
        berhasil: true,
        masuk: false,
        pesan:
          "Akun dibuat, tetapi belum bisa langsung masuk karena server meminta konfirmasi email. Hubungi pengelola IGIL.",
      });
    }
    return balas({ berhasil: true, masuk: true });
  } catch (galat) {
    return balas(
      {
        berhasil: false,
        pesan: pesanGalatAuthSupabase({ message: galat instanceof Error ? galat.message : "fetch failed" }),
      },
      503,
    );
  }
}
