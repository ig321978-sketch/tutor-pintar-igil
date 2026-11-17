import { adalahRespons, adalahUuid, bacaBody, galatBacaBody, jawab, sesiBelajar, skemaBelumAda } from "@/lib/belajar-server";

export const dynamic = "force-dynamic";

const STATUS = ["baru", "dibaca", "selesai"];

/**
 * GET  /api/masukan/admin?status=baru&semua=1 → { status: "ok", daftar } Kritik dan Saran (semua=1: juga Pertanyaan)
 * POST /api/masukan/admin { id, status }     → ubah status (baru, dibaca, selesai)
 * Hanya admin: RPC menolak akun lain ("Hanya admin").
 */
export async function GET(req: Request) {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const url = new URL(req.url);
  const st = url.searchParams.get("status");
  const { data, error } = await sesi.supabase.rpc("daftar_masukan_admin", {
    p_status: st && STATUS.includes(st) ? st : null,
    p_semua_jenis: url.searchParams.get("semua") === "1",
  });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: /Hanya admin/i.test(error.message) ? "bukan_admin" : "galat" }, /Hanya admin/i.test(error.message) ? 403 : 422);
  return jawab({ status: "ok", daftar: Array.isArray(data) ? data : [] });
}

export async function POST(req: Request) {
  const body = await bacaBody(req);
  if (!body || !adalahUuid(body.id) || typeof body.status !== "string" || !STATUS.includes(body.status)) return galatBacaBody();
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { error } = await sesi.supabase.rpc("ubah_status_masukan", { p_id: body.id, p_status: body.status });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: /Hanya admin/i.test(error.message) ? "bukan_admin" : "galat" }, /Hanya admin/i.test(error.message) ? 403 : 422);
  return jawab({ status: "ok" });
}
