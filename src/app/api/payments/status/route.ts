import { adalahRespons, adalahUuid, jawab, sesiBelajar, skemaBelumAda } from "@/lib/belajar-server";
import { idOrderQris, langgananAktif } from "@/lib/pembayaran-qris";

export const dynamic = "force-dynamic";

/**
 * GET /api/payments/status?order=IGIL...
 * Status satu order milik rumah yang masuk, plus masa aktif langganan anak itu.
 */
export async function GET(req: Request) {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const orderId = new URL(req.url).searchParams.get("order") ?? "";
  if (!idOrderQris(orderId)) {
    return jawab({ status: "galat", pesan: "Order tidak valid." }, 400);
  }

  const order = await sesi.supabase
    .from("payment_orders")
    .select("order_id, status, ledger_applied, student_id, consent_timestamp")
    .eq("order_id", orderId)
    .maybeSingle();
  if (skemaBelumAda(order.error)) return jawab({ status: "belum_siap" });
  if (order.error) return jawab({ status: "galat", pesan: "Status pembayaran belum bisa dibaca." }, 500);
  if (!order.data) return jawab({ status: "galat", pesan: "Order ini tidak ada di akunmu." }, 404);

  const siswa = typeof order.data.student_id === "string" ? order.data.student_id : "";
  let berakhir: string | null = null;
  let aktif = false;
  if (adalahUuid(siswa)) {
    const sub = await sesi.supabase
      .from("subscriptions")
      .select("status, expires_at")
      .eq("student_id", siswa)
      .maybeSingle();
    if (!sub.error && sub.data) {
      const status = typeof sub.data.status === "string" ? sub.data.status : null;
      berakhir = typeof sub.data.expires_at === "string" ? sub.data.expires_at : null;
      aktif = langgananAktif(status, berakhir, Date.now());
    }
  }

  return jawab({
    status: "ok",
    orderId,
    orderStatus: order.data.status,
    lunas: order.data.ledger_applied === true,
    consentTimestamp: order.data.consent_timestamp ?? null,
    langgananAktif: aktif,
    berakhir,
  });
}
