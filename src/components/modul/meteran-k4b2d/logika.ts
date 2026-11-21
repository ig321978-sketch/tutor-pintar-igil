/**
 * Logika murni Simulasi Meteran Kain Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas", Sanggar Batik Kampung Mekar.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-meteran-k4b2d.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Warnai (warnai kolom kisi sepuluh kolom sebanyak angka di belakang koma), Susun (isi baris penuh dan kotak lepas pada kisi seratus kotak;
 * alat menolak sepuluh kotak lepas karena harus ditukar dengan satu baris penuh), Jembatan (pilih desimal dari pecahan, Cek Jembatan, lalu Periksa),
 * dan Balik (pilih pecahan dari desimal). Data ada di data-sim.ts.
 * Tipe KeadaanMeteran (alat: "meteran") dipakai misi-k4bab2.ts dan HARUS tetap diekspor.
 */
import { MAKS_BARIS, MAKS_LEPAS, TARGET_BALIK, TARGET_JEMBATAN, TARGET_SEPULUH, TARGET_SERATUS } from "./data-sim";
import { desimalDari, kataBil, pecahanDari } from "./logika-cpa";

export type ModeMeteran = "sepuluh" | "seratus" | "jembatan" | "balik";

export type KeadaanMeteran = {
  alat: "meteran";
  mode: ModeMeteran;
  /** Warnai: sasaran ke berapa, banyak kolom berwarna, sasaran yang sudah benar. */
  sepKe: number;
  sepWarna: number;
  sepBenar: number[];
  /** Susun: sasaran ke berapa, baris penuh, kotak lepas, sasaran yang sudah benar. */
  serKe: number;
  serBaris: number;
  serLepas: number;
  serBenar: number[];
  /** Jembatan: sasaran ke berapa, pilihan desimal (-1 bila belum), sudah menekan Cek Jembatan, sasaran yang sudah benar. */
  jemKe: number;
  jemPilih: number;
  jemCek: boolean;
  jemBenar: number[];
  /** Balik: sasaran ke berapa, pilihan pecahan (-1 bila belum), sasaran yang sudah benar. */
  balKe: number;
  balPilih: number;
  balBenar: number[];
  /** Pernah menaruh sepuluh kotak lepas pada kisi seratus kotak dan ditolak alat. */
  tolak: boolean;
  /** Banyak percobaan Periksa yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalMeteran = (): KeadaanMeteran => ({
  alat: "meteran",
  mode: "sepuluh",
  sepKe: 0,
  sepWarna: 0,
  sepBenar: [],
  serKe: 0,
  serBaris: 0,
  serLepas: 0,
  serBenar: [],
  jemKe: 0,
  jemPilih: -1,
  jemCek: false,
  jemBenar: [],
  balKe: 0,
  balPilih: -1,
  balBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiMeteran = (): KeadaanMeteran => awalMeteran();

export const kata = kataBil;
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeMeteran = (k: KeadaanMeteran, mode: ModeMeteran): KeadaanMeteran => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const tambahBenar = (daftar: number[], ke: number): number[] => (daftar.includes(ke) ? daftar : [...daftar, ke]);

/* ------------------------------ Warnai: kisi sepuluh kolom ------------------------------ */
export const targetSepuluh = (k: KeadaanMeteran) => TARGET_SEPULUH[k.sepKe % TARGET_SEPULUH.length];
export const desimalSepuluh = (k: KeadaanMeteran): string => desimalDari(targetSepuluh(k).p, 10);
/** Tambah atau kurangi satu kolom berwarna (0 sampai 10 kolom). */
export function aturWarna(k: KeadaanMeteran, delta: -1 | 1): { k: KeadaanMeteran; ok: boolean } {
  const w = k.sepWarna + delta;
  if (w < 0 || w > 10) return { k, ok: false };
  return { k: { ...k, sepWarna: w }, ok: true };
}
export function periksaSepuluh(k: KeadaanMeteran): { k: KeadaanMeteran; ok: boolean } {
  if (k.sepWarna === targetSepuluh(k).p) {
    return { k: { ...k, sepBenar: tambahBenar(k.sepBenar, k.sepKe), sepKe: k.sepKe + 1, sepWarna: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSepuluh(k: KeadaanMeteran): string {
  const w = k.sepWarna;
  const p = targetSepuluh(k).p;
  if (w === 0) return "Belum ada kolom berwarna. Baca angka di belakang koma pada desimal, lalu warnai sebanyak itu.";
  if (w < p) return "Kolom berwarna masih kurang dari yang ditunjukkan desimal. Baca lagi angka di belakang koma.";
  if (w > p) return "Kolom berwarna sudah lebih dari yang ditunjukkan desimal. Kurangi kolom yang berwarna.";
  return "Kolom berwarna sudah pas. Tekan Periksa.";
}
export function kalimatSepuluh(k: KeadaanMeteran): string {
  if (k.sepBenar.length > 0 && k.sepWarna === 0) return "Betul! Ada kain berikutnya.";
  return k.sepWarna === 0 ? "Warnai kolom sebanyak angka di belakang koma, lalu tekan Periksa." : "Terus warnai kolom sampai sesuai dengan desimal, lalu tekan Periksa.";
}

/* ------------------------------ Susun: kisi seratus kotak ------------------------------ */
export const targetSeratus = (k: KeadaanMeteran) => TARGET_SERATUS[k.serKe % TARGET_SERATUS.length];
export const desimalSeratus = (k: KeadaanMeteran): string => desimalDari(targetSeratus(k).q, 100);
export const jumlahSeratus = (k: KeadaanMeteran): number => k.serBaris * 10 + k.serLepas;
/** Tambah atau kurangi satu baris penuh (sepuluh kotak). Tidak boleh melewati seratus kotak. */
export function aturBaris(k: KeadaanMeteran, delta: -1 | 1): { k: KeadaanMeteran; ok: boolean } {
  const b = k.serBaris + delta;
  if (b < 0 || b > MAKS_BARIS || b * 10 + k.serLepas > 100) return { k, ok: false };
  return { k: { ...k, serBaris: b }, ok: true };
}
/** Tambah atau kurangi satu kotak lepas. Kotak lepas kesepuluh ditolak alat: sepuluh kotak lepas harus ditukar dengan satu baris penuh. */
export function aturLepas(k: KeadaanMeteran, delta: -1 | 1): { k: KeadaanMeteran; ok: boolean } {
  if (delta > 0 && k.serLepas >= MAKS_LEPAS) return { k: { ...k, tolak: true }, ok: false };
  const l = k.serLepas + delta;
  if (l < 0 || k.serBaris * 10 + l > 100) return { k, ok: false };
  return { k: { ...k, serLepas: l }, ok: true };
}
export function periksaSeratus(k: KeadaanMeteran): { k: KeadaanMeteran; ok: boolean } {
  if (jumlahSeratus(k) === targetSeratus(k).q) {
    return { k: { ...k, serBenar: tambahBenar(k.serBenar, k.serKe), serKe: k.serKe + 1, serBaris: 0, serLepas: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSeratus(k: KeadaanMeteran): string {
  const j = jumlahSeratus(k);
  const q = targetSeratus(k).q;
  if (j === 0) return "Belum ada kotak berwarna. Angka pertama di belakang koma menentukan banyak baris penuh, angka kedua menentukan banyak kotak lepas.";
  if (j < q) return "Kotak berwarna masih kurang dari yang ditunjukkan desimal. Periksa baris penuh dan kotak lepasnya.";
  if (j > q) return "Kotak berwarna sudah lebih dari yang ditunjukkan desimal. Kurangi baris atau kotak lepas.";
  return "Kotak berwarna sudah pas. Tekan Periksa.";
}
export const petunjukTolak = (): string => "Alat menolak. Satu baris sudah penuh bila ada sepuluh kotak, jadi sepuluh kotak lepas harus ditukar dengan satu baris penuh.";
export function kalimatSeratus(k: KeadaanMeteran): string {
  if (k.serBenar.length > 0 && jumlahSeratus(k) === 0) return "Betul! Ada kain berikutnya.";
  return jumlahSeratus(k) === 0 ? "Isi baris penuh dan kotak lepas sesuai dua angka di belakang koma, lalu tekan Periksa." : "Terus isi kotak sampai sesuai dengan desimal, lalu tekan Periksa.";
}

/* ------------------------------ Jembatan: pecahan ke desimal ------------------------------ */
export const targetJembatan = (k: KeadaanMeteran) => TARGET_JEMBATAN[k.jemKe % TARGET_JEMBATAN.length];
export const desimalJembatan = (k: KeadaanMeteran): string => desimalDari(targetJembatan(k).m, targetJembatan(k).den);
/** Tiga pilihan desimal (semua berbentuk nol koma): yang benar dan dua yang keliru. Yang benar tidak di tempat pertama. */
export function pilihanJembatan(k: KeadaanMeteran): string[] {
  const { m, den } = targetJembatan(k);
  const benar = desimalDari(m, den);
  let lain: string[];
  if (den === 10) lain = [`0,0${m}`, `0,1${m}`];
  else if (m < 10) lain = [`0,${m}`, `0,1${m}`];
  else lain = [`0,${(m % 10) * 10 + Math.floor(m / 10)}`, `0,${m < 50 ? m + 10 : m - 10}`];
  return sisip(benar, lain, m + k.jemKe);
}
export function pilihJembatan(k: KeadaanMeteran, i: number): KeadaanMeteran {
  return i < 0 || i >= 3 ? k : { ...k, jemPilih: i, jemCek: false };
}
/** Cek Jembatan: desimal yang dipilih diubah kembali menjadi pecahan dan dibandingkan dengan pecahan di kiri. Butuh satu pilihan. */
export function cekJembatan(k: KeadaanMeteran): { k: KeadaanMeteran; ok: boolean; teks: string; cocok: boolean } {
  if (k.jemPilih < 0) return { k, ok: false, teks: "", cocok: false };
  const d = pilihanJembatan(k)[k.jemPilih];
  const p = pecahanDari(d);
  const t = targetJembatan(k);
  const cocok = p !== null && p.m * t.den === t.m * p.den;
  return { k: { ...k, jemCek: true }, ok: true, teks: p ? `${d} = ${p.m}/${p.den}` : d, cocok };
}
export function periksaJembatan(k: KeadaanMeteran): { k: KeadaanMeteran; ok: boolean } {
  if (k.jemPilih >= 0 && k.jemCek && pilihanJembatan(k)[k.jemPilih] === desimalJembatan(k)) {
    return { k: { ...k, jemBenar: tambahBenar(k.jemBenar, k.jemKe), jemKe: k.jemKe + 1, jemPilih: -1, jemCek: false }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJembatan(k: KeadaanMeteran): string {
  if (k.jemPilih < 0) return "Pilih satu desimal dulu.";
  if (!k.jemCek) return "Tekan Cek Jembatan dulu untuk mengubah desimal itu kembali menjadi pecahan.";
  return "Pecahan hasil cek harus sama dengan pecahan di kiri. Lihat penyebutnya: sepuluh memberi satu angka di belakang koma, seratus memberi dua angka.";
}
export function kalimatJembatan(k: KeadaanMeteran): string {
  if (k.jemBenar.length > 0 && k.jemPilih < 0) return "Betul! Ada jembatan berikutnya.";
  return k.jemCek ? "Cek Jembatan sudah dilihat. Tekan Periksa bila yakin." : "Pilih desimal di kanan, tekan Cek Jembatan, lalu tekan Periksa.";
}

/* ------------------------------ Balik: desimal ke pecahan ------------------------------ */
export const targetBalik = (k: KeadaanMeteran) => TARGET_BALIK[k.balKe % TARGET_BALIK.length];
export const desimalBalik = (k: KeadaanMeteran): string => desimalDari(targetBalik(k).m, targetBalik(k).den);
export const pecahBalik = (k: KeadaanMeteran): string => `${targetBalik(k).m}/${targetBalik(k).den}`;
/** Tiga pilihan pecahan: yang benar dan dua yang keliru (penyebut lain atau pembilang bergeser). Yang benar tidak di tempat pertama. */
export function pilihanBalik(k: KeadaanMeteran): string[] {
  const { m, den } = targetBalik(k);
  const lain = [...new Set([`${m}/${den === 10 ? 100 : 10}`, `${m === 1 ? 2 : m - 1}/${den}`, `${m + 1}/${den}`])].slice(0, 2);
  return sisip(`${m}/${den}`, lain, m + k.balKe);
}
export function pilihBalik(k: KeadaanMeteran, i: number): KeadaanMeteran {
  return i < 0 || i >= 3 ? k : { ...k, balPilih: i };
}
export function periksaBalik(k: KeadaanMeteran): { k: KeadaanMeteran; ok: boolean } {
  if (k.balPilih >= 0 && pilihanBalik(k)[k.balPilih] === pecahBalik(k)) {
    return { k: { ...k, balBenar: tambahBenar(k.balBenar, k.balKe), balKe: k.balKe + 1, balPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBalik(k: KeadaanMeteran): string {
  if (k.balPilih < 0) return "Pilih satu pecahan dulu.";
  return "Hitung dulu banyak angka di belakang koma, lalu tentukan penyebutnya. Angka-angka di belakang koma menjadi pembilangnya.";
}
export function kalimatBalik(k: KeadaanMeteran): string {
  return k.balBenar.length > 0 && k.balPilih < 0 ? "Betul! Ada desimal berikutnya." : "Lihat desimal di papan, pilih pecahan yang sama besar, lalu tekan Periksa.";
}
