import { NextResponse } from "next/server";
import { adalahPeranAdmin, bacaPeranPengguna } from "@/lib/peran";
import { supabaseAuthServer } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = (await req.json()) as { email?: unknown; password?: unknown };
  } catch {
    return NextResponse.json(
      { berhasil: false, pesan: "Request JSON tidak valid." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json(
      { berhasil: false, pesan: "Email dan kata sandi wajib diisi." },
      { status: 400 },
    );
  }

  const supabase = await supabaseAuthServer();
  if (!supabase) {
    return NextResponse.json(
      {
        berhasil: false,
        pesan: "Supabase Auth belum terhubung di server.",
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data.user) {
    const pesan = /invalid login|invalid credentials/i.test(error?.message ?? "")
      ? "Email atau kata sandi tidak valid."
      : error?.message || "Email atau kata sandi tidak valid.";
    return NextResponse.json({ berhasil: false, pesan }, { status: 401 });
  }

  const peran = await bacaPeranPengguna(supabase, data.user);
  return NextResponse.json({
    berhasil: true,
    peran,
    adalahAdmin: adalahPeranAdmin(peran),
  });
}
