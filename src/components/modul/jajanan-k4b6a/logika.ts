/**
 * Logika murni Simulasi Piktogram Jajanan Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini", awal cerita Bazar Kuliner Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jajanan-k4b6a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Gambar (pilih keterangan lalu tambah ikon sesuai tabel; alat menolak keterangan yang tidak habis membagi data), Baca (pilih banyak data satu baris),
 * Banding (tandai baris paling banyak dan paling sedikit), dan Jumlah (masukkan semua baris lalu pilih jumlahnya). Data di data-sim.ts; jawaban dihitung dari data.
 */
import { kataBilK4B6 } from "../eja-k4b6";
import { SKALA_GAMBAR, TARGET_BACA, TARGET_BANDING, TARGET_GAMBAR, TARGET_JUMLAH } from "./data-sim";
import { MAKS_IKON, banyakIkon, indeksMaks, indeksMin, jumlahData, jumlahIkon, type Pik } from "./logika-data";

export type ModeJajanan = "gambar" | "baca" | "banding" | "jumlah";

export type KeadaanJajanan = {
  alat: "jajanan";
  mode: ModeJajanan;
  /** Gambar: sasaran ke berapa, keterangan terpilih (0 bila belum), banyak ikon tiap baris, sasaran yang sudah benar. */
  gambarKe: number;
  gambarSkala: number;
  gambarIkon: number[];
  gambarBenar: number[];
  /** Baca: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  bacaKe: number;
  bacaPilih: number;
  bacaBenar: number[];
  /** Banding: sasaran ke berapa, tanda tiap baris (0 belum, 1 paling banyak, 2 paling sedikit), sasaran yang sudah benar. */
  bandingKe: number;
  bandingTanda: number[];
  bandingBenar: number[];
  /** Jumlah: sasaran ke berapa, baris yang sudah dimasukkan, pilihan jumlah (-1 bila belum), sasaran yang sudah benar. */
  jumlahKe: number;
  jumlahMasuk: boolean[];
  jumlahPilih: number;
  jumlahBenar: number[];
  /** Alat Gambar sudah pernah menolak keterangan yang tidak habis membagi data. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const ke = <T,>(daftar: readonly T[], n: number): T => daftar[n % daftar.length];
export const nol = (n: number): number[] => Array.from({ length: n }, () => 0);

export const awalJajanan = (): KeadaanJajanan => ({
  alat: "jajanan",
  mode: "gambar",
  gambarKe: 0,
  gambarSkala: 0,
  gambarIkon: nol(TARGET_GAMBAR[0].seri.length),
  gambarBenar: [],
  bacaKe: 0,
  bacaPilih: -1,
  bacaBenar: [],
  bandingKe: 0,
  bandingTanda: nol(TARGET_BANDING[0].seri.length),
  bandingBenar: [],
  jumlahKe: 0,
  jumlahMasuk: TARGET_JUMLAH[0].seri.map(() => false),
  jumlahPilih: -1,
  jumlahBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiJajanan = (): KeadaanJajanan => awalJajanan();
export const pilihModeJajanan = (k: KeadaanJajanan, mode: ModeJajanan): KeadaanJajanan => ({ ...k, mode });

/* ------------------------------ Kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataBilK4B6(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

/* ------------------------------ Gambar dari tabel ------------------------------ */
export const dataGambar = (k: KeadaanJajanan): Pik => ke(TARGET_GAMBAR, k.gambarKe);
/** Keterangan yang sah: semua data habis dibagi. */
export const habisMembagi = (p: Pik, s: number): boolean => p.seri.every((x) => x.banyak % s === 0);
/** Keterangan yang sah dan ikon tiap baris muat (paling banyak delapan). */
export const muatIkon = (p: Pik, s: number): boolean => p.seri.every((x) => x.banyak / s <= MAKS_IKON);
export const pikGambar = (k: KeadaanJajanan): Pik => ({ ...dataGambar(k), skala: k.gambarSkala > 0 ? k.gambarSkala : 1 });

export function pilihSkalaGambar(k: KeadaanJajanan, s: number): { k: KeadaanJajanan; ok: boolean } {
  if (!SKALA_GAMBAR.includes(s)) return { k, ok: false };
  const p = dataGambar(k);
  if (!habisMembagi(p, s)) return { k: { ...k, tolak: true, gambarSkala: 0, gambarIkon: nol(p.seri.length) }, ok: false };
  if (!muatIkon(p, s)) return { k: { ...k, gambarSkala: 0, gambarIkon: nol(p.seri.length) }, ok: false };
  return { k: { ...k, gambarSkala: s, gambarIkon: nol(p.seri.length) }, ok: true };
}
export function petunjukSkala(k: KeadaanJajanan, s: number): string {
  const p = dataGambar(k);
  if (!habisMembagi(p, s)) return "Alat menolak. Keterangan itu tidak habis membagi semua data, jadi ada ikon yang terpotong. Pilih keterangan lain.";
  if (!muatIkon(p, s)) return "Alat menolak. Dengan keterangan itu ikonnya terlalu banyak untuk satu baris. Pilih keterangan yang lebih besar.";
  return "Keterangan sudah dipilih.";
}
export function ubahIkon(k: KeadaanJajanan, i: number, delta: 1 | -1): KeadaanJajanan {
  if (k.gambarSkala === 0 || i < 0 || i >= k.gambarIkon.length) return k;
  const baru = Math.max(0, Math.min(MAKS_IKON, k.gambarIkon[i] + delta));
  return { ...k, gambarIkon: k.gambarIkon.map((n, j) => (j === i ? baru : n)) };
}
export function periksaGambar(k: KeadaanJajanan): { k: KeadaanJajanan; ok: boolean } {
  if (k.gambarSkala === 0) return { k, ok: false };
  const p = dataGambar(k);
  if (p.seri.every((s, i) => s.banyak / k.gambarSkala === k.gambarIkon[i])) {
    const baru = k.gambarKe + 1;
    return {
      k: { ...k, gambarBenar: k.gambarBenar.includes(k.gambarKe) ? k.gambarBenar : [...k.gambarBenar, k.gambarKe], gambarKe: baru, gambarSkala: 0, gambarIkon: nol(ke(TARGET_GAMBAR, baru).seri.length) },
      ok: true,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGambar(k: KeadaanJajanan): string {
  if (k.gambarSkala === 0) return "Alat menolak. Keterangan belum dipilih. Pilih keterangan dulu, lalu tambah ikonnya.";
  return "Ikonnya belum sesuai tabel. Bagi banyak data tiap baris dengan keterangan untuk mendapat banyak ikon.";
}
export function kalimatGambar(k: KeadaanJajanan): string {
  if (k.gambarBenar.length > 0 && k.gambarSkala === 0 && k.gambarIkon.every((n) => n === 0) && k.gambarKe === k.gambarBenar.length) return "Betul! Ada tabel berikutnya.";
  return k.gambarSkala === 0 ? "Pilih keterangan yang membuat semua data habis dibagi." : "Tambah atau kurangi ikon tiap baris, lalu tekan Periksa.";
}

/* ------------------------------ Baca piktogram ------------------------------ */
export const sasaranBaca = (k: KeadaanJajanan): { p: Pik; i: number } => ke(TARGET_BACA, k.bacaKe);
/** Tiga pilihan banyak data; yang benar tidak pernah di tempat pertama. */
export function opsiBaca(k: KeadaanJajanan): number[] {
  const { p, i } = sasaranBaca(k);
  const n = p.seri[i].banyak;
  const lain = [banyakIkon(p, i), n + p.skala].filter((x, j, a) => x !== n && a.indexOf(x) === j);
  const pos = 1 + (k.bacaKe % 2);
  return [...lain.slice(0, pos), n, ...lain.slice(pos)];
}
export function pilihBaca(k: KeadaanJajanan, i: number): KeadaanJajanan {
  return i < 0 || i > 2 ? k : { ...k, bacaPilih: i };
}
export function periksaBaca(k: KeadaanJajanan): { k: KeadaanJajanan; ok: boolean } {
  if (k.bacaPilih < 0) return { k, ok: false };
  const { p, i } = sasaranBaca(k);
  if (opsiBaca(k)[k.bacaPilih] === p.seri[i].banyak) {
    return { k: { ...k, bacaBenar: k.bacaBenar.includes(k.bacaKe) ? k.bacaBenar : [...k.bacaBenar, k.bacaKe], bacaKe: k.bacaKe + 1, bacaPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanJajanan): string {
  if (k.bacaPilih < 0) return "Alat menolak. Jawaban belum dipilih. Pilih satu jawaban dulu, lalu tekan Periksa.";
  return "Jawaban itu belum cocok. Hitung ikon pada baris itu, lalu kalikan dengan keterangan.";
}
export function kalimatBaca(k: KeadaanJajanan): string {
  if (k.bacaBenar.length > 0 && k.bacaPilih < 0 && k.bacaKe === k.bacaBenar.length) return "Betul! Ada papan berikutnya.";
  return k.bacaPilih < 0 ? "Hitung ikon pada baris yang ditanya, kalikan dengan keterangan, lalu pilih jawabannya." : "Jawaban sudah dipilih. Tekan Periksa bila sudah yakin.";
}

/* ------------------------------ Banding paling banyak dan paling sedikit ------------------------------ */
export const dataBanding = (k: KeadaanJajanan): Pik => ke(TARGET_BANDING, k.bandingKe);
/** Ketuk satu baris: urutan tanda tidak ada, paling banyak, paling sedikit, lalu tidak ada lagi. Tiap tanda hanya dimiliki satu baris. */
export function ubahBanding(k: KeadaanJajanan, i: number): KeadaanJajanan {
  if (i < 0 || i >= k.bandingTanda.length) return k;
  const baru = (k.bandingTanda[i] + 1) % 3;
  return { ...k, bandingTanda: k.bandingTanda.map((t, j) => (j === i ? baru : baru !== 0 && t === baru ? 0 : t)) };
}
export function periksaBanding(k: KeadaanJajanan): { k: KeadaanJajanan; ok: boolean } {
  if (!k.bandingTanda.includes(1) || !k.bandingTanda.includes(2)) return { k, ok: false };
  const p = dataBanding(k);
  if (k.bandingTanda.indexOf(1) === indeksMaks(p) && k.bandingTanda.indexOf(2) === indeksMin(p)) {
    const baru = k.bandingKe + 1;
    return { k: { ...k, bandingBenar: k.bandingBenar.includes(k.bandingKe) ? k.bandingBenar : [...k.bandingBenar, k.bandingKe], bandingKe: baru, bandingTanda: nol(ke(TARGET_BANDING, baru).seri.length) }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBanding(k: KeadaanJajanan): string {
  if (!k.bandingTanda.includes(1) || !k.bandingTanda.includes(2)) return "Alat menolak. Tandai baris paling banyak dan baris paling sedikit dulu, lalu tekan Periksa.";
  return "Tandanya belum tepat. Bandingkan banyak ikon tiap baris, karena keterangannya sama untuk semua baris.";
}
export function kalimatBanding(k: KeadaanJajanan): string {
  if (k.bandingBenar.length > 0 && k.bandingTanda.every((t) => t === 0) && k.bandingKe === k.bandingBenar.length) return "Betul! Ada papan berikutnya.";
  return k.bandingTanda.every((t) => t === 0) ? "Ketuk baris untuk menandai paling banyak, lalu ketuk lagi untuk paling sedikit." : "Tandai satu baris paling banyak dan satu baris paling sedikit, lalu tekan Periksa.";
}

/* ------------------------------ Jumlah seluruhnya ------------------------------ */
export const dataJumlah = (k: KeadaanJajanan): Pik => ke(TARGET_JUMLAH, k.jumlahKe);
export function totalMasuk(k: KeadaanJajanan): number {
  const p = dataJumlah(k);
  return p.seri.reduce((t, s, i) => t + (k.jumlahMasuk[i] ? s.banyak : 0), 0);
}
/** Tiga pilihan jumlah; yang benar tidak pernah di tempat pertama. */
export function opsiJumlah(k: KeadaanJajanan): number[] {
  const p = dataJumlah(k);
  const n = jumlahData(p);
  const lain = [jumlahIkon(p), n + p.skala];
  const pos = 1 + (k.jumlahKe % 2);
  return [...lain.slice(0, pos), n, ...lain.slice(pos)];
}
export function ubahMasuk(k: KeadaanJajanan, i: number): KeadaanJajanan {
  if (i < 0 || i >= k.jumlahMasuk.length) return k;
  return { ...k, jumlahMasuk: k.jumlahMasuk.map((m, j) => (j === i ? !m : m)) };
}
export function pilihJumlah(k: KeadaanJajanan, i: number): KeadaanJajanan {
  return i < 0 || i > 2 ? k : { ...k, jumlahPilih: i };
}
export function periksaJumlah(k: KeadaanJajanan): { k: KeadaanJajanan; ok: boolean } {
  if (k.jumlahMasuk.some((m) => !m) || k.jumlahPilih < 0) return { k, ok: false };
  const p = dataJumlah(k);
  if (opsiJumlah(k)[k.jumlahPilih] === jumlahData(p)) {
    const baru = k.jumlahKe + 1;
    return { k: { ...k, jumlahBenar: k.jumlahBenar.includes(k.jumlahKe) ? k.jumlahBenar : [...k.jumlahBenar, k.jumlahKe], jumlahKe: baru, jumlahMasuk: ke(TARGET_JUMLAH, baru).seri.map(() => false), jumlahPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJumlah(k: KeadaanJajanan): string {
  if (k.jumlahMasuk.some((m) => !m)) return "Alat menolak. Masih ada baris yang belum dimasukkan. Masukkan semua baris dulu.";
  if (k.jumlahPilih < 0) return "Alat menolak. Jumlah belum dipilih. Pilih satu jumlah dulu, lalu tekan Periksa.";
  return "Jumlah itu belum cocok. Jumlahkan semua ikon dulu, lalu kalikan dengan keterangan.";
}
export function kalimatJumlah(k: KeadaanJajanan): string {
  if (k.jumlahBenar.length > 0 && k.jumlahMasuk.every((m) => !m) && k.jumlahKe === k.jumlahBenar.length) return "Betul! Ada papan berikutnya.";
  return k.jumlahMasuk.some((m) => !m) ? "Ketuk tiap baris untuk memasukkannya ke keranjang." : "Semua baris sudah masuk. Pilih jumlahnya, lalu tekan Periksa.";
}
