/**
 * Logika murni Simulasi Sisa Adonan Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani", dapur roti keliling. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-adonan-k5b3c.mjs.
 * Eksplorasi bebas tanpa skor. Empat alat: Coret (ketuk bagian loyang yang diambil; alat menolak bagian yang kosong), Samakan (setel penyebut bersama lalu Kurangkan;
 * alat menolak bila penyebut belum bisa dibagi kedua penyebut), Kurang (atur pembilang hasil pada penyebut sama), dan Pisah (atur bulat dan pembilang hasil).
 * Data di data-sim.ts; jawaban dihitung dari data.
 */
import { TARGET_CORET, TARGET_KURANG, TARGET_PISAH, TARGET_SAMAKAN, type SasaranCoret, type SasaranKurang, type SasaranPisah, type SasaranSamakan } from "./data-sim";
import { kpk, selisihPisah } from "./logika-data";
import { kataK5B3 } from "../eja-k5b3";

export type ModeAdonan = "coret" | "samakan" | "kurang" | "pisah";

export type KeadaanAdonan = {
  alat: "adonan";
  mode: ModeAdonan;
  /** Coret: sasaran ke berapa, indeks bagian yang dicoret, sasaran yang sudah benar. */
  coretKe: number;
  coretPilih: number[];
  coretBenar: number[];
  /** Samakan: sasaran ke berapa, penyebut bersama yang disetel (0 bila belum), sasaran yang sudah benar. */
  samakanKe: number;
  samakanV: number;
  samakanBenar: number[];
  /** Alat Samakan sudah pernah menolak Kurangkan karena penyebut belum sama. */
  tolak: boolean;
  /** Kurang: sasaran ke berapa, pembilang hasil (-1 bila belum diatur), sasaran yang sudah benar. */
  kurangKe: number;
  kurangN: number;
  kurangBenar: number[];
  /** Pisah: sasaran ke berapa, bulat dan pembilang hasil (-1 bila belum diatur), sasaran yang sudah benar. */
  pisahKe: number;
  pisahB: number;
  pisahN: number;
  pisahBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];

/* ------------------------------ Sasaran ------------------------------ */
export const sasaranCoret = (k: KeadaanAdonan): SasaranCoret => ke(TARGET_CORET, k.coretKe);
export const sasaranSamakan = (k: KeadaanAdonan): SasaranSamakan => ke(TARGET_SAMAKAN, k.samakanKe);
export const sasaranKurang = (k: KeadaanAdonan): SasaranKurang => ke(TARGET_KURANG, k.kurangKe);
export const sasaranPisah = (k: KeadaanAdonan): SasaranPisah => ke(TARGET_PISAH, k.pisahKe);
/** KPK penyebut sasaran Samakan, dan penyebut bersama sasaran Pisah. */
export const kpkSamakan = (s: SasaranSamakan): number => kpk(s.p, s.q);
export const penyebutPisah = (s: SasaranPisah): number => kpk(s.p, s.q);

export const awalAdonan = (): KeadaanAdonan => ({
  alat: "adonan",
  mode: "coret",
  coretKe: 0,
  coretPilih: [],
  coretBenar: [],
  samakanKe: 0,
  samakanV: 1,
  samakanBenar: [],
  tolak: false,
  kurangKe: 0,
  kurangN: -1,
  kurangBenar: [],
  pisahKe: 0,
  pisahB: -1,
  pisahN: -1,
  pisahBenar: [],
  salah: 0,
});
export const mulaiLagiAdonan = (): KeadaanAdonan => awalAdonan();
export const pilihModeAdonan = (k: KeadaanAdonan, mode: ModeAdonan): KeadaanAdonan => ({ ...k, mode });

/* ------------------------------ Kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataK5B3(n);
const besar = (t: string) => t.replace(/(^|[.!?] )([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase());
export { besar as hurufBesar };

/* ------------------------------ Coret ------------------------------ */
export type HasilCoret = "coret" | "batal" | "kosong" | "abaikan";
/** Ketuk satu bagian loyang: bagian berisi dicoret atau dibatalkan, bagian kosong ditolak. */
export function ketukCoret(k: KeadaanAdonan, i: number): { k: KeadaanAdonan; hasil: HasilCoret } {
  const s = sasaranCoret(k);
  if (i < 0 || i >= s.q) return { k, hasil: "abaikan" };
  if (i >= s.a) return { k, hasil: "kosong" };
  if (k.coretPilih.includes(i)) return { k: { ...k, coretPilih: k.coretPilih.filter((x) => x !== i) }, hasil: "batal" };
  return { k: { ...k, coretPilih: [...k.coretPilih, i].sort((a, b) => a - b) }, hasil: "coret" };
}
/** Periksa: banyak bagian yang dicoret harus sama dengan banyak yang diambil. Belum ada yang dicoret = ditolak. */
export function periksaCoret(k: KeadaanAdonan): { k: KeadaanAdonan; ok: boolean; kosong: boolean } {
  if (k.coretPilih.length === 0) return { k, ok: false, kosong: true };
  const s = sasaranCoret(k);
  if (k.coretPilih.length === s.c) {
    const lanjut = k.coretKe + 1;
    return { k: { ...k, coretBenar: k.coretBenar.includes(k.coretKe) ? k.coretBenar : [...k.coretBenar, k.coretKe], coretKe: lanjut, coretPilih: [] }, ok: true, kosong: false };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, kosong: false };
}
export function petunjukCoret(k: KeadaanAdonan): string {
  if (k.coretPilih.length === 0) return "Alat menolak. Belum ada bagian yang dicoret. Ketuk bagian yang diambil dulu, lalu tekan Periksa.";
  return k.coretPilih.length > sasaranCoret(k).c ? "Terlalu banyak bagian yang dicoret. Hanya bagian yang diambil pelanggan yang dicoret." : "Bagian yang dicoret belum cukup. Cocokkan dengan pesanan pelanggan.";
}
export const petunjukKosong = (): string => "Alat menolak. Bagian itu kosong, tidak ada adonan yang bisa diambil. Ketuk bagian yang berisi.";
export function kalimatCoret(k: KeadaanAdonan): string {
  return k.coretPilih.length === 0 ? "Ketuk bagian loyang yang diambil pelanggan, lalu tekan Periksa." : "Sudah dicoret. Tekan Periksa bila sudah sesuai pesanan.";
}
/** Kalimat sesudah Coret benar: sisa dari bagian yang berisi. */
export function kalimatCoretBenar(s: SasaranCoret): string {
  const sisa = s.a - s.c;
  return `Betul! Dari ${kata(s.q)} bagian, ${kata(s.a)} berisi dan ${kata(s.c)} diambil, jadi tinggal ${kata(sisa)} bagian.`;
}

/* ------------------------------ Samakan ------------------------------ */
export function ubahSamakan(k: KeadaanAdonan, delta: 1 | -1): KeadaanAdonan {
  return { ...k, samakanV: Math.max(1, Math.min(40, k.samakanV + delta)) };
}
export type HasilSamakan = "tolak" | "bukanKpk" | "benar";
/** Kurangkan: penyebut yang belum bisa dibagi kedua penyebut ditolak (menandai tantangan menolak); bukan yang terkecil diminta diganti; KPK diterima. */
export function kurangkanSamakan(k: KeadaanAdonan): { k: KeadaanAdonan; hasil: HasilSamakan } {
  const s = sasaranSamakan(k);
  const v = k.samakanV;
  if (v % s.p !== 0 || v % s.q !== 0) return { k: { ...k, tolak: true }, hasil: "tolak" };
  if (v !== kpkSamakan(s)) return { k: { ...k, salah: k.salah + 1 }, hasil: "bukanKpk" };
  const lanjut = k.samakanKe + 1;
  return { k: { ...k, samakanBenar: k.samakanBenar.includes(k.samakanKe) ? k.samakanBenar : [...k.samakanBenar, k.samakanKe], samakanKe: lanjut, samakanV: 1 }, hasil: "benar" };
}
export const petunjukTolakSamakan = (): string => "Alat menolak. Penyebut itu belum bisa dibagi oleh kedua penyebut, jadi pecahannya belum bisa dikurangkan. Cari penyebut yang cocok untuk keduanya.";
export const petunjukBukanKpk = (): string => "Penyebut itu cocok untuk keduanya, tetapi belum yang paling kecil. Pakai KPK supaya hitungannya ringkas.";
export function kalimatSamakan(): string {
  return "Setel penyebut bersama dengan tombol tambah dan kurang, lalu tekan Kurangkan.";
}
/** Kalimat sesudah Samakan benar: penyebut dan hasil. */
export function kalimatSamakanBenar(s: SasaranSamakan): string {
  const m = kpkSamakan(s);
  const x = s.a * (m / s.p);
  const y = s.c * (m / s.q);
  return `Betul! KPK dari ${kata(s.p)} dan ${kata(s.q)} adalah ${kata(m)}, jadi ${kata(x)} per ${kata(m)} dikurangi ${kata(y)} per ${kata(m)} sama dengan ${kata(x - y)} per ${kata(m)}.`;
}

/* ------------------------------ Kurang ------------------------------ */
export function ubahKurang(k: KeadaanAdonan, delta: 1 | -1): KeadaanAdonan {
  const { q } = sasaranKurang(k);
  const dari = k.kurangN < 0 ? (delta > 0 ? -1 : 0) : k.kurangN;
  return { ...k, kurangN: Math.max(0, Math.min(q, dari + delta)) };
}
export function periksaKurang(k: KeadaanAdonan): { k: KeadaanAdonan; ok: boolean } {
  if (k.kurangN < 0) return { k, ok: false };
  const s = sasaranKurang(k);
  if (k.kurangN === s.a - s.c) {
    const lanjut = k.kurangKe + 1;
    return { k: { ...k, kurangBenar: k.kurangBenar.includes(k.kurangKe) ? k.kurangBenar : [...k.kurangBenar, k.kurangKe], kurangKe: lanjut, kurangN: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKurang(k: KeadaanAdonan): string {
  if (k.kurangN < 0) return "Alat menolak. Pembilang hasil belum diatur. Atur dulu, lalu tekan Periksa.";
  return "Pembilang hasil belum tepat. Kurangkan pembilang kedua pecahan, karena penyebutnya sudah sama.";
}
export function kalimatKurang(k: KeadaanAdonan): string {
  return k.kurangN < 0 ? "Atur pembilang hasil dengan tombol tambah dan kurang." : "Bandingkan dengan hitunganmu, lalu tekan Periksa.";
}

/* ------------------------------ Pisah ------------------------------ */
export function ubahPisahB(k: KeadaanAdonan, delta: 1 | -1): KeadaanAdonan {
  const dari = k.pisahB < 0 ? (delta > 0 ? -1 : 0) : k.pisahB;
  return { ...k, pisahB: Math.max(0, Math.min(9, dari + delta)) };
}
export function ubahPisahN(k: KeadaanAdonan, delta: 1 | -1): KeadaanAdonan {
  const m = penyebutPisah(sasaranPisah(k));
  const dari = k.pisahN < 0 ? (delta > 0 ? -1 : 0) : k.pisahN;
  return { ...k, pisahN: Math.max(0, Math.min(m, dari + delta)) };
}
/** Hasil benar sasaran Pisah: bulat dan pembilang pada penyebut bersama (belum disederhanakan). */
export function hasilPisah(s: SasaranPisah): { B: number; n: number; m: number } {
  const r = selisihPisah({ b: s.b1, p: s.a1, q: s.p }, { b: s.b2, p: s.a2, q: s.q });
  return { B: r.B, n: r.n, m: r.m };
}
export function periksaPisah(k: KeadaanAdonan): { k: KeadaanAdonan; ok: boolean } {
  if (k.pisahB < 0 || k.pisahN < 0) return { k, ok: false };
  const h = hasilPisah(sasaranPisah(k));
  if (k.pisahB === h.B && k.pisahN === h.n) {
    const lanjut = k.pisahKe + 1;
    return { k: { ...k, pisahBenar: k.pisahBenar.includes(k.pisahKe) ? k.pisahBenar : [...k.pisahBenar, k.pisahKe], pisahKe: lanjut, pisahB: -1, pisahN: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPisah(k: KeadaanAdonan): string {
  if (k.pisahB < 0 || k.pisahN < 0) return "Alat menolak. Bilangan bulat atau pembilang hasil belum diatur. Atur keduanya dulu, lalu tekan Periksa.";
  return "Hasilnya belum tepat. Kurangkan bilangan bulatnya sendiri, lalu kurangkan pecahannya setelah penyebutnya sama.";
}
export function kalimatPisah(k: KeadaanAdonan): string {
  return k.pisahB < 0 || k.pisahN < 0 ? "Atur bilangan bulat dan pembilang hasil dengan tombol tambah dan kurang." : "Bandingkan dengan hitunganmu, lalu tekan Periksa.";
}
