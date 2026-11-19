/**
 * Logika murni Simulasi Tumpukan Kayu Kelas 3 Bab 2 Sub-Bab A "Kayu untuk Api Unggun" (kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kayu-k3b2a.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Tambah (tambah batang kayu, sepuluh batang lepas ditukar otomatis jadi satu bundel, sampai sama dengan papan jumlah), Bagan (pilih bagian yang belum diketahui),
 * Isi (isi titik-titik di depan atau di tengah dengan kartu bilangan), Periksa (jumlahkan, lalu pilih cocok atau tidak cocok), dan Rak (catat pasangan bilangan untuk dua rak yang berjumlah sama).
 * Data ada di data-sim.ts. Jumlah tidak pernah lebih dari 100.
 */
import { JUMLAH_RAK, PASANGAN_CUKUP, TARGET_BAGAN, TARGET_ISI, TARGET_PERIKSA, TARGET_TAMBAH } from "./data-sim";

export type ModeKayu = "tambah" | "bagan" | "isi" | "periksa" | "rak";

export type KeadaanKayu = {
  alat: "kayu";
  mode: ModeKayu;
  /** Tambah: sasaran ke berapa, bundel sepuluh batang, batang lepas, sudah pernah menukar sepuluh batang lepas jadi satu bundel, dan sasaran yang sudah benar. */
  tambahKe: number;
  bundel: number;
  lepas: number;
  tukar: boolean;
  tambahBenar: number[];
  /** Bagan: sasaran ke berapa, pilihan (-1 bila belum), dan sasaran yang sudah benar. */
  baganKe: number;
  baganPilih: number;
  baganBenar: number[];
  /** Isi: sasaran ke berapa, kartu yang dipilih (-1 bila belum), sasaran benar, dan apakah titik di depan dan di tengah sudah pernah benar. */
  isiKe: number;
  isiPilih: number;
  isiBenar: number[];
  depanBenar: boolean;
  tengahBenar: boolean;
  /** Periksa: sasaran ke berapa, pilihan (0 cocok, 1 tidak cocok, -1 belum), dan sasaran yang sudah benar. */
  periksaKe: number;
  periksaPilih: number;
  periksaBenar: number[];
  /** Rak: banyak batang di rak kiri (rak kanan = jumlah dikurangi rak kiri) dan pasangan yang sudah dicatat (rak kiri). */
  kiri: number;
  pasangan: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalKayu = (): KeadaanKayu => ({
  alat: "kayu",
  mode: "tambah",
  tambahKe: 0,
  bundel: Math.floor(TARGET_TAMBAH[0].a / 10),
  lepas: TARGET_TAMBAH[0].a % 10,
  tukar: false,
  tambahBenar: [],
  baganKe: 0,
  baganPilih: -1,
  baganBenar: [],
  isiKe: 0,
  isiPilih: -1,
  isiBenar: [],
  depanBenar: false,
  tengahBenar: false,
  periksaKe: 0,
  periksaPilih: -1,
  periksaBenar: [],
  kiri: 0,
  pasangan: [],
  salah: 0,
});
export const mulaiLagiKayu = (): KeadaanKayu => awalKayu();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 100 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n === 100) return "seratus";
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeKayu = (k: KeadaanKayu, mode: ModeKayu): KeadaanKayu => ({ ...k, mode });

/* ------------------------------ Tambah ------------------------------ */
export const jumlahTumpukan = (k: KeadaanKayu): number => k.bundel * 10 + k.lepas;
export const targetTambah = (k: KeadaanKayu) => TARGET_TAMBAH[k.tambahKe % TARGET_TAMBAH.length];
export type HasilTambah = { k: KeadaanKayu; ok: boolean; tukar: boolean };
/** Tambah satu batang lepas. Sepuluh batang lepas langsung menjadi satu bundel. */
export function tambahSatu(k: KeadaanKayu): HasilTambah {
  if (jumlahTumpukan(k) >= JUMLAH_RAK) return { k, ok: false, tukar: false };
  let { bundel, lepas, tukar } = k;
  let barusaja = false;
  lepas += 1;
  if (lepas === 10) {
    lepas = 0;
    bundel += 1;
    tukar = true;
    barusaja = true;
  }
  return { k: { ...k, bundel, lepas, tukar }, ok: true, tukar: barusaja };
}
/** Tambah satu bundel sepuluh batang. */
export function tambahBundel(k: KeadaanKayu): HasilTambah {
  if (jumlahTumpukan(k) + 10 > JUMLAH_RAK) return { k, ok: false, tukar: false };
  return { k: { ...k, bundel: k.bundel + 1 }, ok: true, tukar: false };
}
/** Kembali ke tumpukan awal sasaran ini. */
export function ulangiTambah(k: KeadaanKayu): KeadaanKayu {
  const t = targetTambah(k);
  return { ...k, bundel: Math.floor(t.a / 10), lepas: t.a % 10 };
}
/** Periksa tumpukan dengan papan jumlah. Bila tepat, sasaran berikutnya dibuka. */
export function periksaTambah(k: KeadaanKayu): { k: KeadaanKayu; ok: boolean } {
  const t = targetTambah(k);
  if (jumlahTumpukan(k) === t.c) {
    const ke = k.tambahKe + 1;
    const n = TARGET_TAMBAH[ke % TARGET_TAMBAH.length];
    return { k: { ...k, tambahBenar: k.tambahBenar.includes(k.tambahKe) ? k.tambahBenar : [...k.tambahBenar, k.tambahKe], tambahKe: ke, bundel: Math.floor(n.a / 10), lepas: n.a % 10 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTambah(k: KeadaanKayu): string {
  const t = targetTambah(k);
  const n = jumlahTumpukan(k);
  if (n < t.c) return "Tumpukan masih kurang dari papan jumlah. Kurangi jumlah dengan bagian yang diketahui untuk tahu banyak batang yang harus ditambah.";
  return "Tumpukan melebihi papan jumlah. Tekan ulangi, lalu tambah sebanyak jumlah dikurangi bagian yang diketahui.";
}
export function kalimatTambah(k: KeadaanKayu): string {
  const t = targetTambah(k);
  return k.tambahBenar.length > 0 && jumlahTumpukan(k) === t.a ? "Tumpukan sudah tepat! Ada papan jumlah berikutnya." : "Tambah batang sampai tumpukan sama dengan papan jumlah, lalu tekan Periksa.";
}
export function kalimatTukarKayu(): string {
  return "Sepuluh batang lepas langsung menjadi satu bundel. Sepuluh jadi satu, tempatnya naik.";
}
export function kalimatTumpukan(k: KeadaanKayu): string {
  const n = jumlahTumpukan(k);
  return `${besar(kata(k.bundel))} bundel dan ${kata(k.lepas)} batang lepas. Tumpukan ada ${kata(n)} batang.`;
}

/* ------------------------------ Pengecoh ------------------------------ */
/** Dua pengecoh untuk bilangan yang belum diketahui `u` (jumlah dua bilangan bila tidak melebihi seratus, bagian yang diketahui, atau selisih sepuluh), tanpa kembar. */
export function pengecohKayu(a: number, c: number): number[] {
  const u = c - a;
  const calon = [c + a, a, u + 10, u - 10, c];
  const hasil: number[] = [];
  for (const x of calon) if (Number.isInteger(x) && x >= 1 && x <= JUMLAH_RAK && x !== u && !hasil.includes(x)) hasil.push(x);
  return hasil.slice(0, 2);
}
/** Tiga bilangan pilihan (kata atau angka): yang benar tidak di tempat pertama (deterministik). */
export function tigaPilihan(a: number, c: number): number[] {
  const u = c - a;
  const [x, y] = pengecohKayu(a, c);
  const p = 1 + (u % 2);
  const lain = [x, y];
  return [...lain.slice(0, p), u, ...lain.slice(p)];
}

/* ------------------------------ Bagan ------------------------------ */
export const targetBagan = (k: KeadaanKayu) => TARGET_BAGAN[k.baganKe % TARGET_BAGAN.length];
export const pilihanBagan = (k: KeadaanKayu): number[] => {
  const t = targetBagan(k);
  return tigaPilihan(t.bagian, t.total);
};
export function pilihBagan(k: KeadaanKayu, i: number): KeadaanKayu {
  return i < 0 || i >= 3 ? k : { ...k, baganPilih: i };
}
export function periksaBagan(k: KeadaanKayu): { k: KeadaanKayu; ok: boolean } {
  const t = targetBagan(k);
  const pil = pilihanBagan(k);
  if (k.baganPilih >= 0 && pil[k.baganPilih] === t.total - t.bagian) return { k: { ...k, baganBenar: k.baganBenar.includes(k.baganKe) ? k.baganBenar : [...k.baganBenar, k.baganKe], baganKe: k.baganKe + 1, baganPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBagan(k: KeadaanKayu): string {
  if (k.baganPilih < 0) return "Pilih satu bilangan dulu.";
  return "Batang atas adalah jumlah semuanya. Bagian yang belum diketahui didapat dengan mengurangkan jumlah semuanya dengan bagian yang diketahui.";
}
export function kalimatBagan(k: KeadaanKayu): string {
  return k.baganBenar.length > 0 && k.baganPilih < 0 ? "Betul! Bagiannya tepat. Ada bagan berikutnya." : "Baca bagan, pilih bagian yang belum diketahui, lalu tekan Periksa.";
}

/* ------------------------------ Isi titik-titik ------------------------------ */
export const targetIsi = (k: KeadaanKayu) => TARGET_ISI[k.isiKe % TARGET_ISI.length];
export const pilihanIsi = (k: KeadaanKayu): number[] => {
  const t = targetIsi(k);
  return tigaPilihan(t.a, t.c);
};
export function pilihIsi(k: KeadaanKayu, i: number): KeadaanKayu {
  return i < 0 || i >= 3 ? k : { ...k, isiPilih: i };
}
export function periksaIsi(k: KeadaanKayu): { k: KeadaanKayu; ok: boolean } {
  const t = targetIsi(k);
  const pil = pilihanIsi(k);
  if (k.isiPilih >= 0 && pil[k.isiPilih] === t.c - t.a)
    return {
      k: {
        ...k,
        isiBenar: k.isiBenar.includes(k.isiKe) ? k.isiBenar : [...k.isiBenar, k.isiKe],
        isiKe: k.isiKe + 1,
        isiPilih: -1,
        depanBenar: k.depanBenar || t.depan,
        tengahBenar: k.tengahBenar || !t.depan,
      },
      ok: true,
    };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukIsi(k: KeadaanKayu): string {
  if (k.isiPilih < 0) return "Pilih satu kartu bilangan dulu.";
  return "Jumlah semuanya adalah bilangan setelah tanda sama dengan. Bilangan yang belum diketahui didapat dengan mengurangkan jumlah semuanya dengan bagian yang diketahui, titik-titik di depan atau di tengah sama saja.";
}
export function kalimatIsi(k: KeadaanKayu): string {
  return k.isiBenar.length > 0 && k.isiPilih < 0 ? "Betul! Titik-titiknya terisi tepat. Ada kalimat berikutnya." : "Pilih kartu bilangan untuk titik-titik, lalu tekan Periksa.";
}

/* ------------------------------ Periksa ------------------------------ */
export const targetPeriksa = (k: KeadaanKayu) => TARGET_PERIKSA[k.periksaKe % TARGET_PERIKSA.length];
export const cocokPeriksa = (a: number, u: number, c: number): boolean => a + u === c;
export function pilihPeriksa(k: KeadaanKayu, i: number): KeadaanKayu {
  return i !== 0 && i !== 1 ? k : { ...k, periksaPilih: i };
}
export function periksaPeriksa(k: KeadaanKayu): { k: KeadaanKayu; ok: boolean } {
  const t = targetPeriksa(k);
  const cocok = cocokPeriksa(t.a, t.u, t.c);
  if (k.periksaPilih >= 0 && (k.periksaPilih === 0) === cocok) return { k: { ...k, periksaBenar: k.periksaBenar.includes(k.periksaKe) ? k.periksaBenar : [...k.periksaBenar, k.periksaKe], periksaKe: k.periksaKe + 1, periksaPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPeriksa(k: KeadaanKayu): string {
  if (k.periksaPilih < 0) return "Jumlahkan dulu, lalu pilih cocok atau tidak cocok.";
  return "Jumlahkan bagian yang diketahui dengan bilangan yang ditemukan. Cocok bila hasilnya sama dengan jumlah semuanya.";
}
export function kalimatPeriksa(k: KeadaanKayu): string {
  return k.periksaBenar.length > 0 && k.periksaPilih < 0 ? "Betul! Pemeriksaannya tepat. Ada hasil berikutnya." : "Jumlahkan dua bilangan, lalu pilih cocok atau tidak cocok dengan jumlah semuanya.";
}

/* ------------------------------ Rak: banyak kemungkinan ------------------------------ */
export const kananRak = (k: KeadaanKayu): number => JUMLAH_RAK - k.kiri;
export function geserKiri(k: KeadaanKayu, delta: number): { k: KeadaanKayu; ok: boolean } {
  const baru = k.kiri + delta;
  if (baru < 0 || baru > JUMLAH_RAK) return { k, ok: false };
  return { k: { ...k, kiri: baru }, ok: true };
}
/** Catat pasangan rak kiri dan kanan (keduanya paling sedikit satu batang). Pasangan yang sama tidak dicatat dua kali. */
export function catatPasangan(k: KeadaanKayu): { k: KeadaanKayu; ok: boolean; alasan: "baru" | "sudah" | "kosong" } {
  if (k.kiri < 1 || k.kiri > JUMLAH_RAK - 1) return { k, ok: false, alasan: "kosong" };
  if (k.pasangan.includes(k.kiri)) return { k, ok: false, alasan: "sudah" };
  return { k: { ...k, pasangan: [...k.pasangan, k.kiri] }, ok: true, alasan: "baru" };
}
export const cukupPasangan = (k: KeadaanKayu): boolean => k.pasangan.length >= PASANGAN_CUKUP;
export function kalimatRak(k: KeadaanKayu): string {
  const n = k.pasangan.length;
  return n === 0 ? "Atur rak kiri, rak kanan ikut berubah. Catat pasangan yang jumlahnya sama dengan papan." : `${besar(kata(n))} pasangan sudah dicatat. Masih banyak kemungkinan lain.`;
}
