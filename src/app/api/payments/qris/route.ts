import {
  adalahRespons,
  adalahUuid,
  bacaBody,
  galatBacaBody,
  jawab,
  pesanGalat,
  sesiBelajar,
  skemaBelumAda,
} from "@/lib/belajar-server";
import { gambarQris, tagihQris } from "@/lib/midtrans-qris";
import { idOrderQris, modePembayaranServer, persetujuanLengkap } from "@/lib/pembayaran-qris";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface OrderBaru {
  order_id?: unknown;
  qr_string?: unknown;
  reused?: unknown;
  gross_amount?: unknown;
  consent_timestamp?: unknown;
}

/**
 * POST /api/payments/qris  { anak, akad, pdp }
 * Membuat order Rp 50.000 setelah dua persetujuan wali, lalu mengembalikan gambar QR.
 * mock tidak memanggil Midtrans. sandbox dan production memakai POST /v2/charge.
 */
export async function POST(req: Request) {
  const mode = modePembayaranServer();
  if (mode === "tertutup") {
    return jawab({ status: "galat", pesan: "Pembayaran belum diaktifkan di server." }, 503);
  }
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const anak = body.anak;
  const akad = body.akad === true;
  const pdp = body.pdp === true;
  if (!adalahUuid(anak) || !persetujuanLengkap(akad, pdp)) {
    return jawab({ status: "galat", pesan: "Centang kedua persetujuan orang tua atau wali dulu." }, 400);
  }

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;

  const buat = await sesi.supabase.rpc("buat_order_qris", {
    p_student: anak,
    p_consent_akad: true,
    p_consent_pdp: true,
  });
  if (skemaBelumAda(buat.error)) {
    return jawab({ status: "belum_siap", pesan: "Tabel pembayaran belum dipasang di database." });
  }
  if (buat.error) return jawab({ status: "galat", pesan: pesanGalat(buat.error) }, 422);

  const order = (buat.data ?? null) as OrderBaru | null;
  const orderId = typeof order?.order_id === "string" ? order.order_id : "";
  if (!idOrderQris(orderId)) {
    return jawab({ status: "galat", pesan: "Order pembayaran belum terbentuk." }, 502);
  }

  let muatan = typeof order?.qr_string === "string" ? order.qr_string : "";
  let transaksi: string | null = null;
  if (!muatan) {
    try {
      if (mode === "mock") {
        muatan = `IGIL-MOCK-${orderId}`;
      } else {
        const charge = await tagihQris(orderId);
        muatan = charge.qrString;
        transaksi = charge.transactionId;
      }
    } catch {
      return jawab({ status: "galat", pesan: "QRIS belum terbit. Coba lagi sebentar." }, 502);
    }
    const simpan = await sesi.supabase.rpc("lengkapi_qris_pending", {
      p_order_id: orderId,
      p_qr_string: muatan,
      p_transaction_id: transaksi,
    });
    if (simpan.error && !/sudah terbit/i.test(simpan.error.message ?? "")) {
      return jawab({ status: "galat", pesan: pesanGalat(simpan.error) }, 422);
    }
  }

  let gambar = "";
  try {
    gambar = await gambarQris(muatan);
  } catch {
    return jawab({ status: "galat", pesan: "Gambar QR belum bisa dibuat." }, 502);
  }

  return jawab({
    status: "ok",
    orderId,
    grossAmount: 50000,
    mode,
    simulasi: mode === "mock",
    reused: order?.reused === true,
    consentTimestamp: order?.consent_timestamp ?? null,
    qrDataUrl: gambar,
  });
}
