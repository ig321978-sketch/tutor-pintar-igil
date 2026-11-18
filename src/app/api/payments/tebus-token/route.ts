import { NextResponse } from "next/server";

import { adalahUuid, bacaBody, galatBacaBody } from "@/lib/belajar-server";
import { supabaseLayanan } from "@/lib/supabase-service";
import { responsJikaBukanAdmin } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/payments/tebus-token  { bulan: "2026-11-01", pemenang: [uuid, ...] }
 * Khusus admin. Memanggil redeem_tier2_scholarship_tokens lewat service role.
 */
export async function POST(req: Request) {
  const tolak = await responsJikaBukanAdmin();
  if (tolak) return tolak;

  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const bulan = typeof body.bulan === "string" ? body.bulan.trim() : "";
  if (!/^\d{4}-\d{2}(-\d{2})?$/.test(bulan)) {
    return NextResponse.json({ ok: false, pesan: "Bulan tidak valid." }, { status: 400 });
  }
  if (!Array.isArray(body.pemenang) || body.pemenang.length > 500) {
    return NextResponse.json({ ok: false, pesan: "Daftar pemenang tidak valid." }, { status: 400 });
  }
  const pemenang = body.pemenang.filter((id): id is string => adalahUuid(id));
  if (pemenang.length !== body.pemenang.length) {
    return NextResponse.json({ ok: false, pesan: "Ada identitas siswa yang tidak valid." }, { status: 400 });
  }

  const layanan = supabaseLayanan();
  if (!layanan) {
    return NextResponse.json({ ok: false, pesan: "Service role belum dipasang." }, { status: 503 });
  }
  const { data, error } = await layanan.rpc("redeem_tier2_scholarship_tokens", {
    p_source_month: bulan.length === 7 ? `${bulan}-01` : bulan,
    p_winners: pemenang,
  });
  if (error) {
    return NextResponse.json({ ok: false, pesan: error.message }, { status: 422 });
  }
  return NextResponse.json({ ok: true, hasil: data });
}
