import { basisMidtrans, kunciTandaTangan, tandaCocok, tandaMidtrans } from "@/lib/tanda-midtrans";
import {
  HARGA_LANGGANAN,
  idOrderQris,
  keputusanNotifikasi,
  modePembayaranServer,
  nominalLangganan,
} from "@/lib/pembayaran-qris";
import { supabaseLayanan } from "@/lib/supabase-service";

export { kunciTandaTangan, tandaCocok, tandaMidtrans };

function ambilMentah(mentah: string, kunci: string): string | null {
  const teks = new RegExp(`"${kunci}"\\s*:\\s*"([^"]*)"`).exec(mentah);
  if (teks) return teks[1];
  const angka = new RegExp(`"${kunci}"\\s*:\\s*(\\d+(?:\\.\\d+)?)`).exec(mentah);
  return angka ? angka[1] : null;
}

export interface HasilCharge {
  qrString: string;
  transactionId: string | null;
}

export async function tagihQris(orderId: string): Promise<HasilCharge> {
  const mode = modePembayaranServer();
  if (mode !== "sandbox" && mode !== "production") {
    throw new Error("Mode bayar bukan sandbox atau produksi");
  }
  const basis = basisMidtrans(mode);
  const kunci = (process.env.MIDTRANS_SERVER_KEY ?? "").trim();
  if (!basis || !kunci) throw new Error("Kunci Midtrans belum dipasang");
  if (!idOrderQris(orderId)) throw new Error("Order tidak valid");

  const pengakuisisi = (process.env.MIDTRANS_QRIS_ACQUIRER ?? "gopay").trim() || "gopay";
  const otorisasi = `Basic ${Buffer.from(`${kunci}:`).toString("base64")}`;
  const res = await fetch(`${basis}/v2/charge`, {
    method: "POST",
    headers: {
      Authorization: otorisasi,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      payment_type: "qris",
      transaction_details: { order_id: orderId, gross_amount: HARGA_LANGGANAN },
      item_details: [
        {
          id: "igil-langganan-30",
          price: HARGA_LANGGANAN,
          quantity: 1,
          name: "Langganan belajar mandiri IGIL 30 hari",
        },
      ],
      qris: { acquirer: pengakuisisi },
    }),
    signal: AbortSignal.timeout(20_000),
    cache: "no-store",
  });

  const teks = await res.text();
  if (!res.ok) {
    console.error("Midtrans charge gagal", res.status);
    throw new Error("QRIS belum terbit");
  }
  let tubuh: { qr_string?: unknown; transaction_id?: unknown; status_code?: unknown };
  try {
    tubuh = JSON.parse(teks) as { qr_string?: unknown; transaction_id?: unknown; status_code?: unknown };
  } catch {
    throw new Error("QRIS belum terbit");
  }
  if (typeof tubuh.qr_string !== "string" || tubuh.qr_string.length < 8) {
    console.error("Midtrans tanpa qr_string", tubuh.status_code ?? res.status);
    throw new Error("QRIS belum terbit");
  }
  return {
    qrString: tubuh.qr_string,
    transactionId: typeof tubuh.transaction_id === "string" ? tubuh.transaction_id : null,
  };
}

export async function gambarQris(muatan: string): Promise<string> {
  const dimuat = await import("qrcode");
  const api = typeof dimuat.default?.toDataURL === "function" ? dimuat.default : null;
  if (!api) throw new Error("Gambar QR belum bisa dibuat");
  return api.toDataURL(muatan, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 280,
    color: { dark: "#000000", light: "#ffffff" },
  });
}

export async function prosesNotifikasiMidtrans(mentah: string): Promise<{ http: number; tubuh: Record<string, unknown> }> {
  let json: unknown;
  try {
    json = JSON.parse(mentah);
  } catch {
    return { http: 400, tubuh: { ok: false, pesan: "Badan tidak valid" } };
  }
  if (!json || typeof json !== "object") {
    return { http: 400, tubuh: { ok: false, pesan: "Badan tidak valid" } };
  }

  const orderId = ambilMentah(mentah, "order_id") ?? "";
  const statusCode = ambilMentah(mentah, "status_code") ?? "";
  const gross = ambilMentah(mentah, "gross_amount") ?? "";
  const tanda = ambilMentah(mentah, "signature_key") ?? "";
  const transaksi = ambilMentah(mentah, "transaction_status") ?? "";
  const fraud = ambilMentah(mentah, "fraud_status") ?? "";
  const transaksiId = ambilMentah(mentah, "transaction_id");

  const kunci = kunciTandaTangan();
  if (!kunci || !idOrderQris(orderId) || !tanda || !statusCode) {
    return { http: 401, tubuh: { ok: false, pesan: "Tanda tangan tidak sah" } };
  }
  const hitung = tandaMidtrans(orderId, statusCode, gross, kunci);
  if (!tandaCocok(tanda, hitung)) {
    return { http: 401, tubuh: { ok: false, pesan: "Tanda tangan tidak sah" } };
  }

  const layanan = supabaseLayanan();
  if (!layanan) {
    return { http: 503, tubuh: { ok: false, pesan: "Layanan pembayaran belum siap" } };
  }

  const putusan = keputusanNotifikasi({ transactionStatus: transaksi, fraudStatus: fraud, gross });
  const nominal = putusan === "lunas" && nominalLangganan(gross) ? HARGA_LANGGANAN : 0;
  const { data, error } = await layanan.rpc("process_igil_qris_settlement", {
    p_order_id: orderId,
    p_transaction_status: transaksi,
    p_fraud_status: fraud,
    p_gross_amount: nominal,
    p_midtrans_transaction_id: transaksiId,
    p_payload: json,
  });
  if (error) {
    console.error("RPC pelunasan gagal", error.code ?? "");
    return { http: 500, tubuh: { ok: false } };
  }
  const baris = (data ?? {}) as { applied?: boolean; idempotent?: boolean; alasan?: string; expires_at?: string };
  return {
    http: 200,
    tubuh: {
      ok: true,
      applied: baris.applied === true,
      idempotent: baris.idempotent === true,
      alasan: baris.alasan ?? null,
      expires_at: baris.expires_at ?? null,
    },
  };
}
