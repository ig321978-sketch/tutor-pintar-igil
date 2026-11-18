/**
 * Aturan murni pembayaran langganan IGIL (tanpa jaringan, tanpa React).
 * Angka wajib sama dengan supabase/migrations/09_pembayaran_qris_token.sql.
 */

export const HARGA_LANGGANAN = 50_000;
export const HARI_LANGGANAN = 30;
export const TIER1_TUNAI = 36_000;
export const TIER2_TOKEN = 9_000;
export const OPERASIONAL_KOTOR = 5_000;
export const MDR_QRIS = 350;
export const OPERASIONAL_BERSIH_QRIS = 4_650;
export const OPERASIONAL_BERSIH_TOKEN = 5_000;

export const TEKS_AKAD =
  "Setuju bahwa Rp 50.000 adalah pembelian layanan akses belajar mandiri EdTech IGIL selama 30 hari (jual-beli putus, bukan iuran/undian), dan Program Beasiswa Prestasi IGIL dinilai murni berdasarkan parameter kompetensi objektif IGIL.";

export const TEKS_PDP =
  "Persetujuan eksplisit Orang Tua/Wali (sesuai UU PDP No. 27/2022) atas pemrosesan data akademik serta rekaman suara/kamera anak saat verifikasi akhir.";

export const TEKS_BEASISWA_APRESIASI =
  "Selamat! Kamu meraih Beasiswa Apresiasi IGIL — Langganan Bulan Depan Gratis (Aktif Otomatis)";

export const LABEL_TOMBOL_QRIS = "Tampilkan QRIS Rp 50.000";
export const LABEL_TOMBOL_LUNAS = "Simulasi Lunas (Dev Mode)";

export type ModePembayaran = "mock" | "sandbox" | "production";
export type MetodeBayar = "QRIS" | "SCHOLARSHIP_TOKEN_18PCT";

export interface PecahanBayar {
  gross_amount: number;
  tier1_300k_cash_pool: number;
  tier2_50k_token_pool: number;
  operational_gross: number;
  mdr_fee_estimate: number;
  operational_net: number;
}

export function modePembayaran(nilai: string | undefined, produksi: boolean): ModePembayaran | "tertutup" {
  const m = (nilai ?? "").trim().toLowerCase();
  if (m === "mock" || m === "sandbox" || m === "production") return m;
  if (!m && !produksi) return "mock";
  return "tertutup";
}

export function modePembayaranServer(): ModePembayaran | "tertutup" {
  return modePembayaran(process.env.NEXT_PUBLIC_PAYMENT_MODE, process.env.NODE_ENV === "production");
}

export function bagiPembayaran(metode: MetodeBayar): PecahanBayar {
  const mdr = metode === "QRIS" ? MDR_QRIS : 0;
  const bersih = metode === "QRIS" ? OPERASIONAL_BERSIH_QRIS : OPERASIONAL_BERSIH_TOKEN;
  return {
    gross_amount: HARGA_LANGGANAN,
    tier1_300k_cash_pool: TIER1_TUNAI,
    tier2_50k_token_pool: TIER2_TOKEN,
    operational_gross: OPERASIONAL_KOTOR,
    mdr_fee_estimate: mdr,
    operational_net: bersih,
  };
}

/** Gross mentah notifikasi, persis "50000" atau "50000.00", tanpa pembulatan. */
export function nominalLangganan(gross: string): boolean {
  if (!/^\d+(\.\d{1,2})?$/.test(gross)) return false;
  const [utuh, pecahan = ""] = gross.split(".");
  return utuh === "50000" && /^0*$/.test(pecahan);
}

export function bolehLunas(transactionStatus: string, fraudStatus: string): boolean {
  const status = transactionStatus.trim().toLowerCase();
  const fraud = fraudStatus.trim().toLowerCase();
  return (status === "settlement" || status === "capture") && fraud === "accept";
}

export type KeputusanNotifikasi = "lunas" | "tolak_nominal" | "catat_saja";

export function keputusanNotifikasi(opsi: {
  transactionStatus: string;
  fraudStatus: string;
  gross: string;
}): KeputusanNotifikasi {
  if (!bolehLunas(opsi.transactionStatus, opsi.fraudStatus)) return "catat_saja";
  if (!nominalLangganan(opsi.gross)) return "tolak_nominal";
  return "lunas";
}

export function persetujuanLengkap(akad: boolean, pdp: boolean): boolean {
  return akad === true && pdp === true;
}

export function idOrderQris(nilai: string): boolean {
  return /^IGIL[0-9a-f]{32}$/i.test(nilai);
}

export interface AnakLangganan {
  id: string;
  nama: string;
  aktif: boolean;
  berakhir: string | null;
}

export type AlasanPagar = "belum_masuk" | "belum_ada_anak" | "nonaktif" | "pilih_anak" | "galat";

export function langgananAktif(status: string | null, berakhir: string | null, sekarang: number): boolean {
  if (status !== "ACTIVE" || !berakhir) return false;
  const t = Date.parse(berakhir);
  return Number.isFinite(t) && t > sekarang;
}

/**
 * Gerbang halaman Praktikum. `skemaSiap` false = tabel langganan belum dipasang, halaman tetap terbuka
 * supaya migrasi yang belum dijalankan tidak mengunci belajar. Setelah skema ada, yang tidak aktif terkunci.
 */
export function putuskanPagar(opsi: {
  skemaSiap: boolean;
  admin: boolean;
  masuk: boolean;
  anak: readonly AnakLangganan[];
  anakDipilih: string | null;
}): { boleh: true } | { boleh: false; alasan: AlasanPagar } {
  if (!opsi.skemaSiap) return { boleh: true };
  if (opsi.admin && opsi.masuk) return { boleh: true };
  if (!opsi.masuk) return { boleh: false, alasan: "belum_masuk" };
  if (opsi.anak.length === 0) return { boleh: false, alasan: "belum_ada_anak" };
  if (opsi.anakDipilih) {
    const dipilih = opsi.anak.find((a) => a.id === opsi.anakDipilih);
    if (!dipilih || !dipilih.aktif) return { boleh: false, alasan: "nonaktif" };
    return { boleh: true };
  }
  if (opsi.anak.length === 1) {
    return opsi.anak[0].aktif ? { boleh: true } : { boleh: false, alasan: "nonaktif" };
  }
  return { boleh: false, alasan: "pilih_anak" };
}
