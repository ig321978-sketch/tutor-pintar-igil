import { NextResponse } from "next/server";

import { prosesNotifikasiMidtrans } from "@/lib/midtrans-qris";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/payments/midtrans-webhook
 * Tanda tangan SHA512(order_id + status_code + gross_amount + server key) memakai teks mentah,
 * supaya "50000.00" tidak berubah saat JSON diurai. Ledger hanya untuk settlement/capture + accept.
 */
export async function POST(req: Request) {
  const mentah = await req.text();
  if (mentah.length > 20_000) {
    return NextResponse.json({ ok: false, pesan: "Badan terlalu besar" }, { status: 400 });
  }
  const hasil = await prosesNotifikasiMidtrans(mentah);
  const res = NextResponse.json(hasil.tubuh, { status: hasil.http });
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}
