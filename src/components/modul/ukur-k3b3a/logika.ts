/**
 * Logika murni Simulasi Meja Ukur Kelas 3 Bab 3 Sub-Bab A "Ukuran Kandang Kak Tari" (mengukur panjang dengan satuan baku), awal cerita Kebun Binatang Mini.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ukur-k3b3a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Geser (geser benda sampai ujung kirinya tepat di angka nol, alat menolak membaca sebelum itu, lalu baca panjangnya), Baca (tulis hasil dengan satuan),
 * Alat (pilih penggaris atau meteran), dan Selisih (cari selisih dua batang). Data ada di data-sim.ts. Penggaris sepanjang dua puluh sentimeter.
 */
import { SKALA_GESER, TARGET_ALAT, TARGET_BACA, TARGET_GESER, TARGET_SELISIH } from "./data-sim";

export type ModeUkur = "geser" | "baca" | "alat" | "selisih";

export type KeadaanUkur = {
  alat: "ukur";
  mode: ModeUkur;
  /** Geser: sasaran ke berapa, posisi ujung kiri benda pada penggaris (sentimeter), sudah pernah mencoba membaca sebelum di nol (ditolak), sudah membaca di nol, pilihan (-1 bila belum), sasaran yang sudah benar. */
  geserKe: number;
  posisi: number;
  tolak: boolean;
  sudahBaca: boolean;
  geserPilih: number;
  geserBenar: number[];
  /** Baca: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  bacaKe: number;
  bacaPilih: number;
  bacaBenar: number[];
  /** Alat: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  alatKe: number;
  alatPilih: number;
  alatBenar: number[];
  /** Selisih: sasaran ke berapa, pilihan (-1 bila belum), sasaran yang sudah benar. */
  selisihKe: number;
  selisihPilih: number;
  selisihBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalUkur = (): KeadaanUkur => ({
  alat: "ukur",
  mode: "geser",
  geserKe: 0,
  posisi: TARGET_GESER[0].awal,
  tolak: false,
  sudahBaca: false,
  geserPilih: -1,
  geserBenar: [],
  bacaKe: 0,
  bacaPilih: -1,
  bacaBenar: [],
  alatKe: 0,
  alatPilih: -1,
  alatBenar: [],
  selisihKe: 0,
  selisihPilih: -1,
  selisihBenar: [],
  salah: 0,
});
export const mulaiLagiUkur = (): KeadaanUkur => awalUkur();

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
export const kataSatuan = (s: "cm" | "m"): string => (s === "m" ? "meter" : "sentimeter");
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeUkur = (k: KeadaanUkur, mode: ModeUkur): KeadaanUkur => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}

/* ------------------------------ Geser ke nol ------------------------------ */
export const targetGeser = (k: KeadaanUkur) => TARGET_GESER[k.geserKe % TARGET_GESER.length];
/** Angka di ujung kanan benda pada posisi sekarang. */
export const ujungKanan = (k: KeadaanUkur): number => k.posisi + targetGeser(k).panjang;
export const diNol = (k: KeadaanUkur): boolean => k.posisi === 0;
export type HasilGeser = { k: KeadaanUkur; ok: boolean };
/** Geser benda ke kiri (delta negatif) atau ke kanan; ujung kanan benda tidak boleh melewati ujung penggaris dan ujung kiri tidak boleh di bawah nol. */
export function geserBenda(k: KeadaanUkur, delta: number): HasilGeser {
  const baru = k.posisi + delta;
  const t = targetGeser(k);
  if (baru < 0 || baru + t.panjang > SKALA_GESER) return { k, ok: false };
  return { k: { ...k, posisi: baru, sudahBaca: false, geserPilih: -1 }, ok: true };
}
/** Minta alat membaca panjang benda. Ditolak bila ujung kiri belum tepat di angka nol. */
export function bacaGeser(k: KeadaanUkur): { k: KeadaanUkur; ok: boolean } {
  if (!diNol(k)) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, sudahBaca: true }, ok: true };
}
/** Tiga pilihan bacaan: yang benar (panjang), bacaan sebelum digeser (awal ditambah panjang), dan satu angka lain. Yang benar tidak di tempat pertama. */
export function pilihanGeser(k: KeadaanUkur): number[] {
  const t = targetGeser(k);
  const calon = [t.awal + t.panjang, t.panjang + 2, t.panjang - 1, t.panjang + 1].filter((x, i, a) => x >= 1 && x <= SKALA_GESER && x !== t.panjang && a.indexOf(x) === i);
  return sisip(t.panjang, calon.slice(0, 2), t.panjang);
}
export function pilihGeser(k: KeadaanUkur, i: number): KeadaanUkur {
  return i < 0 || i >= 3 || !k.sudahBaca ? k : { ...k, geserPilih: i };
}
export function periksaGeser(k: KeadaanUkur): { k: KeadaanUkur; ok: boolean } {
  const t = targetGeser(k);
  const pil = pilihanGeser(k);
  if (k.sudahBaca && diNol(k) && k.geserPilih >= 0 && pil[k.geserPilih] === t.panjang) {
    const ke = k.geserKe + 1;
    const n = TARGET_GESER[ke % TARGET_GESER.length];
    return { k: { ...k, geserBenar: k.geserBenar.includes(k.geserKe) ? k.geserBenar : [...k.geserBenar, k.geserKe], geserKe: ke, posisi: n.awal, sudahBaca: false, geserPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGeser(k: KeadaanUkur): string {
  if (!diNol(k)) return "Ujung kiri benda belum tepat di angka nol. Geser benda ke kiri dulu, baru alat mau membaca.";
  if (!k.sudahBaca) return "Tekan Baca dulu supaya alat membaca panjang benda.";
  if (k.geserPilih < 0) return "Pilih satu bacaan dulu.";
  return "Ujung kiri sudah di angka nol, jadi panjang benda sama dengan angka di ujung kanan. Baca angka di ujung kanan, bukan angka sebelum benda digeser.";
}
export function kalimatGeser(k: KeadaanUkur): string {
  if (k.geserBenar.length > 0 && k.posisi === targetGeser(k).awal && !k.sudahBaca) return "Betul! Ada benda berikutnya.";
  return diNol(k) ? "Ujung kiri sudah di angka nol. Tekan Baca, lalu pilih bacaan yang tepat." : "Geser benda sampai ujung kirinya tepat di angka nol.";
}
export const kalimatPosisi = (k: KeadaanUkur): string => `Ujung kiri di angka ${kata(k.posisi)}, ujung kanan di angka ${kata(ujungKanan(k))}.`;

/* ------------------------------ Baca dan tulis satuan ------------------------------ */
export const targetBaca = (k: KeadaanUkur) => TARGET_BACA[k.bacaKe % TARGET_BACA.length];
/** Tiga cara menulis hasil: angka dan satuan yang tepat, angka saja, dan angka dengan satuan yang keliru. Yang benar tidak di tempat pertama. */
export function pilihanBaca(k: KeadaanUkur): string[] {
  const t = targetBaca(k);
  const lain = t.sat === "m" ? "cm" : "m";
  return sisip(`${t.panjang} ${t.sat}`, [`${t.panjang}`, `${t.panjang} ${lain}`], t.panjang);
}
export const teksBenarBaca = (k: KeadaanUkur): string => `${targetBaca(k).panjang} ${targetBaca(k).sat}`;
export function pilihBaca(k: KeadaanUkur, i: number): KeadaanUkur {
  return i < 0 || i >= 3 ? k : { ...k, bacaPilih: i };
}
export function periksaBaca(k: KeadaanUkur): { k: KeadaanUkur; ok: boolean } {
  const pil = pilihanBaca(k);
  if (k.bacaPilih >= 0 && pil[k.bacaPilih] === teksBenarBaca(k)) return { k: { ...k, bacaBenar: k.bacaBenar.includes(k.bacaKe) ? k.bacaBenar : [...k.bacaBenar, k.bacaKe], bacaKe: k.bacaKe + 1, bacaPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanUkur): string {
  if (k.bacaPilih < 0) return "Pilih satu tulisan dulu.";
  const p = pilihanBaca(k)[k.bacaPilih];
  if (!/\s/.test(p)) return "Hasil ukur harus ditulis dengan satuan, bukan hanya angkanya.";
  return "Satuannya belum cocok. Penggaris memakai sentimeter, sedangkan meteran memakai meter.";
}
export function kalimatBaca(k: KeadaanUkur): string {
  return k.bacaBenar.length > 0 && k.bacaPilih < 0 ? "Betul! Ada benda berikutnya." : "Ujung kiri benda sudah di angka nol. Pilih cara menulis hasil ukur yang tepat, lalu tekan Periksa.";
}

/* ------------------------------ Pilih alat ukur ------------------------------ */
export const targetAlat = (k: KeadaanUkur) => TARGET_ALAT[k.alatKe % TARGET_ALAT.length];
export const alatBenar = (t: { sat: "cm" | "m" }): string => (t.sat === "m" ? "meteran" : "penggaris");
/** Tiga pilihan alat: penggaris, meteran, dan jengkal, dalam urutan yang berganti tiap sasaran; yang benar tidak selalu di tempat pertama. */
export function pilihanAlat(k: KeadaanUkur): string[] {
  const t = targetAlat(k);
  const lain = ["penggaris", "meteran", "jengkal"].filter((x) => x !== alatBenar(t));
  return sisip(alatBenar(t), lain, k.alatKe + 1);
}
export function pilihAlat(k: KeadaanUkur, i: number): KeadaanUkur {
  return i < 0 || i >= 3 ? k : { ...k, alatPilih: i };
}
export function periksaAlat(k: KeadaanUkur): { k: KeadaanUkur; ok: boolean } {
  const t = targetAlat(k);
  if (k.alatPilih >= 0 && pilihanAlat(k)[k.alatPilih] === alatBenar(t)) return { k: { ...k, alatBenar: k.alatBenar.includes(k.alatKe) ? k.alatBenar : [...k.alatBenar, k.alatKe], alatKe: k.alatKe + 1, alatPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukAlat(k: KeadaanUkur): string {
  if (k.alatPilih < 0) return "Pilih satu alat dulu.";
  if (pilihanAlat(k)[k.alatPilih] === "jengkal") return "Jengkal bukan satuan baku, hasilnya berbeda-beda untuk tiap orang. Pilih penggaris atau meteran.";
  return "Penggaris dipakai untuk benda pendek dan meteran dipakai untuk benda panjang. Satuan sentimeter berarti penggaris, satuan meter berarti meteran.";
}
export function kalimatAlat(k: KeadaanUkur): string {
  return k.alatBenar.length > 0 && k.alatPilih < 0 ? "Betul! Ada benda berikutnya." : "Lihat panjang benda, pilih alat ukur yang tepat, lalu tekan Periksa.";
}

/* ------------------------------ Selisih dua batang ------------------------------ */
export const targetSelisih = (k: KeadaanUkur) => TARGET_SELISIH[k.selisihKe % TARGET_SELISIH.length];
export const selisihDari = (t: { a: number; b: number }): number => t.a - t.b;
/** Tiga pilihan selisih: yang benar, jumlah dua panjang, dan panjang yang lebih besar. Yang benar tidak di tempat pertama. */
export function pilihanSelisih(k: KeadaanUkur): number[] {
  const t = targetSelisih(k);
  const n = selisihDari(t);
  const lain = [t.a + t.b, t.a, n + 2, n - 1].filter((x, i, a) => x >= 1 && x !== n && a.indexOf(x) === i);
  return sisip(n, lain.slice(0, 2), n);
}
export function pilihSelisih(k: KeadaanUkur, i: number): KeadaanUkur {
  return i < 0 || i >= 3 ? k : { ...k, selisihPilih: i };
}
export function periksaSelisih(k: KeadaanUkur): { k: KeadaanUkur; ok: boolean } {
  const t = targetSelisih(k);
  if (k.selisihPilih >= 0 && pilihanSelisih(k)[k.selisihPilih] === selisihDari(t)) return { k: { ...k, selisihBenar: k.selisihBenar.includes(k.selisihKe) ? k.selisihBenar : [...k.selisihBenar, k.selisihKe], selisihKe: k.selisihKe + 1, selisihPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSelisih(k: KeadaanUkur): string {
  if (k.selisihPilih < 0) return "Pilih satu bilangan dulu.";
  return "Selisih didapat dengan mengurangkan panjang yang lebih besar dengan panjang yang lebih kecil, bukan menjumlahkannya.";
}
export function kalimatSelisih(k: KeadaanUkur): string {
  return k.selisihBenar.length > 0 && k.selisihPilih < 0 ? "Betul! Ada dua batang berikutnya." : "Baca ujung kedua batang, cari selisihnya, lalu tekan Periksa.";
}
