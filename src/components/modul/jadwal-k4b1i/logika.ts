/**
 * Logika murni Simulasi Papan Jadwal Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga", akhir cerita Penginapan Pulau Karang Indah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jadwal-k4b1i.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Payung (atur banyak baris; alat menolak mencatat bila payung tidak habis dibagi; catat semua pasangan faktor), Faktor (tandai semua faktor),
 * Jadwal (tandai kelipatan pada garis jadwal) dan Uji (tekan Bagi, alat menolak memutuskan sebelum itu, lalu putuskan faktor atau bukan). Data ada di data-sim.ts.
 */
import { FAKTOR_SIM, JADWAL_SIM, MAKS_BARIS, PASANG_SIM, UJI_SIM } from "./data-sim";

export type ModeJadwal = "pasang" | "faktor" | "jadwal" | "uji";

export type KeadaanJadwal = {
  alat: "jadwal";
  mode: ModeJadwal;
  /** Payung: banyak baris yang diatur, sasaran ke berapa, pasangan yang tercatat (faktor kecilnya), sasaran yang sudah benar. */
  baris: number;
  pasangKe: number;
  pasangCatat: number[];
  pasangBenar: number[];
  /** Faktor: sasaran ke berapa, bilangan yang ditandai, sasaran yang sudah benar. */
  faktorKe: number;
  faktorPilih: number[];
  faktorBenar: number[];
  /** Jadwal: sasaran ke berapa, angka yang ditandai, sasaran yang sudah benar. */
  jadwalKe: number;
  jadwalTanda: number[];
  jadwalBenar: number[];
  /** Uji: sasaran ke berapa, sudah menekan Bagi, putusan (-1 belum, 0 faktor, 1 bukan faktor), sasaran yang sudah benar. */
  ujiKe: number;
  sudahBagi: boolean;
  ujiPilih: -1 | 0 | 1;
  ujiBenar: number[];
  /** Pernah ditolak alat (mencatat susunan yang tidak habis, atau memutuskan sebelum membagi). */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalJadwal = (): KeadaanJadwal => ({
  alat: "jadwal",
  mode: "pasang",
  baris: 1,
  pasangKe: 0,
  pasangCatat: [],
  pasangBenar: [],
  faktorKe: 0,
  faktorPilih: [],
  faktorBenar: [],
  jadwalKe: 0,
  jadwalTanda: [],
  jadwalBenar: [],
  ujiKe: 0,
  sudahBagi: false,
  ujiPilih: -1,
  ujiBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiJadwal = (): KeadaanJadwal => awalJadwal();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const s = n % 10;
    return s === 0 ? `${SAT[Math.floor(n / 10)]} puluh` : `${SAT[Math.floor(n / 10)]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kata(sisa)}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeJadwal = (k: KeadaanJadwal, mode: ModeJadwal): KeadaanJadwal => ({ ...k, mode });

const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);
const urut = (xs: number[]): number[] => [...xs].sort((a, b) => a - b);
const sama = (a: number[], b: number[]): boolean => a.length === b.length && urut(a).every((x, i) => x === urut(b)[i]);

/* ------------------------------ Payung: pasangan faktor ------------------------------ */
export const targetPasang = (k: KeadaanJadwal) => PASANG_SIM[k.pasangKe % PASANG_SIM.length];
/** Faktor kecil dari semua pasangan faktor `n` (a tidak lebih besar dari b), dari kecil ke besar. */
export const pasanganSemua = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((a) => a * a <= n && n % a === 0);
/** Sisa payung bila disusun dalam `baris` baris sama banyak. */
export const sisaSusun = (k: KeadaanJadwal): number => targetPasang(k).n % k.baris;
/** Ubah banyak baris sebesar `delta`; paling kecil satu dan paling besar MAKS_BARIS. */
export function ubahBaris(k: KeadaanJadwal, delta: number): { k: KeadaanJadwal; ok: boolean } {
  const baru = k.baris + delta;
  if (baru < 1 || baru > MAKS_BARIS) return { k, ok: false };
  return { k: { ...k, baris: baru }, ok: true };
}
/** Catat susunan sekarang sebagai pasangan faktor. Ditolak (tanpa dihitung keliru) bila payung tidak habis dibagi. */
export function catatPasang(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  const n = targetPasang(k).n;
  if (n % k.baris !== 0) return { k: { ...k, tolak: true }, ok: false };
  const kecil = Math.min(k.baris, n / k.baris);
  return { k: { ...k, pasangCatat: tanpaKembar([...k.pasangCatat, kecil]) }, ok: true };
}
export const hapusPasang = (k: KeadaanJadwal): KeadaanJadwal => ({ ...k, pasangCatat: [] });
export function periksaPasang(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  if (sama(k.pasangCatat, pasanganSemua(targetPasang(k).n))) return { k: { ...k, pasangBenar: tanpaKembar([...k.pasangBenar, k.pasangKe]), pasangKe: k.pasangKe + 1, pasangCatat: [], baris: 1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPasang(k: KeadaanJadwal): string {
  if (k.pasangCatat.length === 0) return "Belum ada pasangan tercatat. Atur banyak baris sampai payung habis dibagi, lalu tekan Catat pasangan.";
  return "Masih ada pasangan yang belum tercatat. Coba banyak baris yang lain, mulai dari yang paling kecil, dan perhatikan sisa payung.";
}
export function kalimatPasang(k: KeadaanJadwal): string {
  if (k.pasangBenar.length > 0 && k.pasangCatat.length === 0 && k.baris === 1) return "Betul! Ada susunan payung berikutnya.";
  return sisaSusun(k) === 0 ? "Payung habis dibagi. Tekan Catat pasangan, atau coba baris yang lain." : "Ada sisa payung yang tidak muat. Coba banyak baris yang lain.";
}

/* ------------------------------ Faktor: tandai semua faktor ------------------------------ */
export const targetFaktor = (k: KeadaanJadwal) => FAKTOR_SIM[k.faktorKe % FAKTOR_SIM.length];
export const faktorSasaran = (k: KeadaanJadwal): number[] => targetFaktor(k).kandidat.filter((x) => targetFaktor(k).n % x === 0);
/** Tandai atau lepas tanda bilangan `x`. Bilangan di luar kandidat ditolak. */
export function tandaiFaktor(k: KeadaanJadwal, x: number): { k: KeadaanJadwal; ok: boolean } {
  if (!targetFaktor(k).kandidat.includes(x)) return { k, ok: false };
  return { k: { ...k, faktorPilih: k.faktorPilih.includes(x) ? k.faktorPilih.filter((y) => y !== x) : [...k.faktorPilih, x] }, ok: true };
}
export function periksaFaktor(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  if (sama(k.faktorPilih, faktorSasaran(k))) return { k: { ...k, faktorBenar: tanpaKembar([...k.faktorBenar, k.faktorKe]), faktorKe: k.faktorKe + 1, faktorPilih: [] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukFaktor(k: KeadaanJadwal): string {
  if (k.faktorPilih.length === 0) return "Belum ada bilangan yang ditandai. Bagi bilangan itu dengan tiap pilihan, lalu tandai yang habis dibagi.";
  return "Ada tanda yang keliru atau faktor yang belum ditandai. Periksa lagi dengan membagi dan melihat sisanya.";
}
export function kalimatFaktor(k: KeadaanJadwal): string {
  return k.faktorBenar.length > 0 && k.faktorPilih.length === 0 ? "Betul! Ada bilangan berikutnya." : "Tandai semua faktor, lalu tekan Periksa.";
}

/* ------------------------------ Jadwal: tandai kelipatan ------------------------------ */
export const targetJadwal = (k: KeadaanJadwal) => JADWAL_SIM[k.jadwalKe % JADWAL_SIM.length];
export const kelipatanSasaran = (k: KeadaanJadwal): number[] => {
  const t = targetJadwal(k);
  return Array.from({ length: Math.floor(t.batas / t.b) }, (_, i) => (i + 1) * t.b);
};
/** Tandai atau lepas tanda angka `x` pada garis jadwal (1 sampai batas). */
export function tandaiJadwal(k: KeadaanJadwal, x: number): { k: KeadaanJadwal; ok: boolean } {
  if (x < 1 || x > targetJadwal(k).batas) return { k, ok: false };
  return { k: { ...k, jadwalTanda: k.jadwalTanda.includes(x) ? k.jadwalTanda.filter((y) => y !== x) : [...k.jadwalTanda, x] }, ok: true };
}
/** Loncat: tandai kelipatan berikutnya (lompatan sebesar bilangan itu dari tanda terakhir). Ditolak bila sudah melewati batas. */
export function loncatJadwal(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  const t = targetJadwal(k);
  const tertinggi = Math.max(0, ...k.jadwalTanda.filter((x) => x % t.b === 0));
  const baru = tertinggi + t.b;
  if (baru > t.batas) return { k, ok: false };
  return { k: { ...k, jadwalTanda: tanpaKembar([...k.jadwalTanda, baru]) }, ok: true };
}
export const hapusJadwal = (k: KeadaanJadwal): KeadaanJadwal => ({ ...k, jadwalTanda: [] });
export function periksaJadwal(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  if (sama(k.jadwalTanda, kelipatanSasaran(k))) return { k: { ...k, jadwalBenar: tanpaKembar([...k.jadwalBenar, k.jadwalKe]), jadwalKe: k.jadwalKe + 1, jadwalTanda: [] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJadwal(k: KeadaanJadwal): string {
  if (k.jadwalTanda.length === 0) return "Belum ada angka yang ditandai. Tekan Loncat, atau kalikan bilangan itu dengan satu, dua, tiga, dan seterusnya.";
  return "Ada angka yang keliru atau belum ditandai. Bandingkan dengan lompatan yang sama besar dari nol sampai batas.";
}
export function kalimatJadwal(k: KeadaanJadwal): string {
  return k.jadwalBenar.length > 0 && k.jadwalTanda.length === 0 ? "Betul! Ada garis jadwal berikutnya." : "Tandai kelipatannya, lalu tekan Periksa.";
}

/* ------------------------------ Uji: cek bagi habis ------------------------------ */
export const targetUji = (k: KeadaanJadwal) => UJI_SIM[k.ujiKe % UJI_SIM.length];
export const hasilBagi = (k: KeadaanJadwal): { hasil: number; sisa: number } => {
  const t = targetUji(k);
  return { hasil: Math.floor(t.n / t.d), sisa: t.n % t.d };
};
/** Tekan Bagi: alat membagi dan menampilkan hasil bagi serta sisa. */
export const bagiUji = (k: KeadaanJadwal): KeadaanJadwal => ({ ...k, sudahBagi: true });
export function pilihUji(k: KeadaanJadwal, i: 0 | 1): KeadaanJadwal {
  return k.sudahBagi ? { ...k, ujiPilih: i } : k;
}
/** Periksa putusan. Ditolak (bukan percobaan keliru) bila belum menekan Bagi. */
export function periksaUji(k: KeadaanJadwal): { k: KeadaanJadwal; ok: boolean } {
  if (!k.sudahBagi) return { k: { ...k, tolak: true }, ok: false };
  const betul = hasilBagi(k).sisa === 0 ? 0 : 1;
  if (k.ujiPilih === betul) return { k: { ...k, ujiBenar: tanpaKembar([...k.ujiBenar, k.ujiKe]), ujiKe: k.ujiKe + 1, sudahBagi: false, ujiPilih: -1 }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUji(k: KeadaanJadwal): string {
  if (!k.sudahBagi) return "Alat belum membagi. Tekan Bagi dulu, baru putuskan faktor atau bukan faktor.";
  if (k.ujiPilih < 0) return "Pilih satu putusan dulu.";
  return "Lihat sisanya. Kalau tidak ada sisa, bilangan itu faktor, kalau masih ada sisa, bukan faktor.";
}
export function kalimatUji(k: KeadaanJadwal): string {
  if (k.ujiBenar.length > 0 && !k.sudahBagi && k.ujiPilih < 0) return "Betul! Ada bilangan berikutnya.";
  return k.sudahBagi ? "Sisanya sudah terlihat. Pilih faktor atau bukan faktor, lalu tekan Periksa." : "Tekan Bagi dulu supaya alat membagi bilangannya.";
}
