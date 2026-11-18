import {
  adalahRespons,
  bacaBody,
  galatBacaBody,
  jawab,
  sesiBelajar,
} from "@/lib/belajar-server";
import { kunciTandaTangan, prosesNotifikasiMidtrans, tandaMidtrans } from "@/lib/midtrans-qris";
import { idOrderQris, modePembayaranServer } from "@/lib/pembayaran-qris";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/payments/mock-settle  { orderId }
 * Hanya mode mock. Menyusun notifikasi lunas bertanda tangan, lalu jalur yang sama dengan webhook.
 * Hanya order milik rumah yang sedang masuk.
 */
export async function POST(req: Request) {
  if (modePembayaranServer() !== "mock") {
    return jawab({ status: "galat", pesan: "Simulasi lunas hanya ada di mode mock." }, 404);
  }
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  if (!idOrderQris(orderId)) return galatBacaBody();

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const milik = await sesi.supabase
    .from("payment_orders")
    .select("order_id")
    .eq("order_id", orderId)
    .maybeSingle();
  if (milik.error || !milik.data) {
    return jawab({ status: "galat", pesan: "Order ini tidak ada di akunmu." }, 404);
  }

  const kunci = kunciTandaTangan();
  if (!kunci) {
    return jawab({ status: "galat", pesan: "Kunci tanda tangan pembayaran belum dipasang." }, 503);
  }
  const gross = "50000.00";
  const statusCode = "200";
  const mentah = JSON.stringify({
    order_id: orderId,
    status_code: statusCode,
    gross_amount: gross,
    transaction_status: "settlement",
    fraud_status: "accept",
    transaction_id: `mock-${orderId}`,
    payment_type: "qris",
    signature_key: tandaMidtrans(orderId, statusCode, gross, kunci),
  });
  const hasil = await prosesNotifikasiMidtrans(mentah);
  return jawab(hasil.tubuh, hasil.http);
}
