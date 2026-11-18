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
export const LABEL_TOMBOL_LUNAS_AWAL = "Simulasi Lunas (Tgl 1-25)";
export const LABEL_TOMBOL_LUNAS_AKHIR = "Simulasi Lunas (Tgl 26-31)";

export const TEKS_KUNCI_JADWAL =
  "Langganan Bulan Depan Sudah Lunas! Tab Evaluasi akan terbuka serentak tanggal 1 pukul 00.00 WIB setelah reset capaian bulanan. Silakan pelajari tab Materi & Simulasi terlebih dahulu.";

export const TEKS_INFO_CUTOFF =
  "Pembayaran di atas tanggal 25 masuk ke kolam beasiswa bulan depan. Jadwal evaluasi (Latihan, Ujian, dan Praktikum) terbuka tanggal 1 bulan depan pukul 00.00 WIB.";

export type JendelaUji = "awal" | "akhir";

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
  /** ACTIVE tetapi now() belum mencapai starts_at (lunas tanggal 26–akhir bulan). */
  menunggu?: boolean;
  mulai?: string | null;
  berakhir: string | null;
}

export type AlasanPagar = "belum_masuk" | "belum_ada_anak" | "nonaktif" | "pilih_anak" | "galat";

export interface BagianWib {
  tahun: number;
  bulan: number;
  hari: number;
  jam: number;
  menit: number;
  detik: number;
}

/** Bagian kalender Asia/Jakarta. WIB tidak punya waktu musim. */
export function bagianWib(saat: Date): BagianWib {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(saat);
  const ambil = (tipe: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === tipe)?.value ?? "NaN");
  let jam = ambil("hour");
  if (jam === 24) jam = 0;
  return {
    tahun: ambil("year"),
    bulan: ambil("month"),
    hari: ambil("day"),
    jam,
    menit: ambil("minute"),
    detik: ambil("second"),
  };
}

/** Dinding jam WIB menjadi instan UTC. bulan 1–12. */
export function instanWib(tahun: number, bulan: number, hari: number, jam = 0, menit = 0, detik = 0): Date {
  return new Date(Date.UTC(tahun, bulan - 1, hari, jam - 7, menit, detik));
}

function bulanBerikut(tahun: number, bulan: number): { tahun: number; bulan: number } {
  return bulan === 12 ? { tahun: tahun + 1, bulan: 1 } : { tahun, bulan: bulan + 1 };
}

function akhirBulanWib(tahun: number, bulan: number): Date {
  const next = bulanBerikut(tahun, bulan);
  return new Date(instanWib(next.tahun, next.bulan, 1).getTime() - 1000);
}

export interface JendelaLangganan {
  lewatCutoff: boolean;
  periodMonth: string;
  startsAt: Date;
  expiresAt: Date;
}

/**
 * Jendela yang sama dengan RPC process_igil_qris_settlement.
 * Tanggal 1–25: mulai saat lunas, berakhir 23:59:59 WIB bulan itu, kolam bulan berjalan.
 * Tanggal 26–akhir: mulai tanggal 1 pukul 00:00:00 WIB bulan depan, kolam bulan depan.
 */
export function jendelaLangganan(saat: Date): JendelaLangganan {
  const w = bagianWib(saat);
  const periode = (tahun: number, bulan: number) => `${tahun}-${String(bulan).padStart(2, "0")}-01`;
  if (w.hari <= 25) {
    return {
      lewatCutoff: false,
      periodMonth: periode(w.tahun, w.bulan),
      startsAt: saat,
      expiresAt: akhirBulanWib(w.tahun, w.bulan),
    };
  }
  const next = bulanBerikut(w.tahun, w.bulan);
  return {
    lewatCutoff: true,
    periodMonth: periode(next.tahun, next.bulan),
    startsAt: instanWib(next.tahun, next.bulan, 1),
    expiresAt: akhirBulanWib(next.tahun, next.bulan),
  };
}

export function lewatTanggalDuaLima(saat: Date = new Date()): boolean {
  return bagianWib(saat).hari >= 26;
}

/**
 * Jam uji mode mock. "awal" selalu jatuh pada tanggal 1–25 yang tidak mengunci akses hari ini.
 * "akhir" selalu tanggal 26 bulan WIB berjalan, jadi starts_at menjadi tanggal 1 bulan depan.
 */
export function saatUjiJendela(jendela: JendelaUji, sekarang: Date = new Date()): Date {
  const w = bagianWib(sekarang);
  if (jendela === "awal") {
    if (w.hari <= 25) return sekarang;
    return instanWib(w.tahun, w.bulan, 25, 12, 0, 0);
  }
  return instanWib(w.tahun, w.bulan, 26, 12, 0, 0);
}

function millis(iso: string | null): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : null;
}

/** Terbuka hanya bila ACTIVE dan sekarang berada di dalam [starts_at, expires_at]. */
export function langgananAktif(
  status: string | null,
  mulai: string | null,
  berakhir: string | null,
  sekarang: number,
): boolean {
  if (status !== "ACTIVE") return false;
  const a = millis(mulai);
  const b = millis(berakhir);
  if (a === null || b === null) return false;
  return sekarang >= a && sekarang <= b;
}

/** Sudah ACTIVE, tetapi jendela evaluasi belum mulai. */
export function langgananMenunggu(
  status: string | null,
  mulai: string | null,
  berakhir: string | null,
  sekarang: number,
): boolean {
  if (status !== "ACTIVE") return false;
  const a = millis(mulai);
  const b = millis(berakhir);
  if (a === null || b === null) return false;
  return sekarang < a && a <= b;
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
