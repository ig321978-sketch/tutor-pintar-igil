import {
  adalahRespons,
  adalahUuid,
  bacaBody,
  galatBacaBody,
  jawab,
  sesiBelajar,
  skemaBelumAda,
} from "@/lib/belajar-server";
import { TEKS_BEASISWA_APRESIASI } from "@/lib/pembayaran-qris";

export const dynamic = "force-dynamic";

/**
 * GET  /api/payments/notices  — lencana beasiswa apresiasi yang belum dibaca.
 * POST /api/payments/notices  { id } — tandai dibaca lewat RPC yang sudah ada.
 */
export async function GET() {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { data, error } = await sesi.supabase
    .from("account_notices")
    .select("id, body, student_id, created_at")
    .eq("kind", "beasiswa_apresiasi_18")
    .is("seen_at", null)
    .order("created_at", { ascending: false })
    .limit(5);
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap", lencana: [] });
  if (error) return jawab({ status: "galat", pesan: "Pemberitahuan belum bisa dibaca." }, 500);
  const lencana = (data ?? []).map((b) => ({
    id: b.id as string,
    teks: typeof b.body === "string" ? b.body : TEKS_BEASISWA_APRESIASI,
    anak: typeof b.student_id === "string" ? b.student_id : null,
  }));
  return jawab({ status: "ok", lencana });
}

export async function POST(req: Request) {
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  if (!adalahUuid(body.id)) return galatBacaBody();
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { error } = await sesi.supabase.rpc("tandai_pemberitahuan_dibaca", { p_notice: body.id });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: "Pemberitahuan belum bisa ditutup." }, 422);
  return jawab({ status: "ok" });
}
