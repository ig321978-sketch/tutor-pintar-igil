/**
 * Logika murni Simulasi Meja Bandul Kelas 3 Bab 3 Sub-Bab D "Bandul Dokter Hana" (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bandul-k3b3d.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Rakit (pasang bandul timbangan kodok sampai seimbang dengan berat benda), Kg ke g (kali seribu), g ke kg (ambil tiap seribu gram),
 * Jumlah (dua berat ditambah) dan Kurang (dua berat dikurangi). Jawaban empat angka: angka ribuan atau kilogram, lalu ratusan, puluhan, dan satuan gram.
 * Data ada di data-sim.ts. Berat paling banyak sembilan ribu sembilan ratus sembilan puluh sembilan gram.
 */
import { TARGET_GKG, TARGET_JUMLAH, TARGET_KGG, TARGET_KURANG, TARGET_RAKIT, BENDA_BANDUL } from "./data-sim";

export type ModeBandul = "rakit" | "kgg" | "gkg" | "jumlah" | "kurang";
export type Empat = [number, number, number, number];
export type PasangBandul = [number, number, number, number, number];

export type KeadaanBandul = {
  alat: "bandul";
  mode: ModeBandul;
  /** Benda yang ditimbang (nomor dalam BENDA_BANDUL). */
  benda: number;
  /** Rakit: banyak bandul terpasang tiap jenis (setengah ons, satu ons, dua ons, setengah kilogram, satu kilogram), sasaran ke berapa, dan sasaran yang sudah seimbang. */
  pasang: PasangBandul;
  rakitKe: number;
  rakitBenar: number[];
  /** Kg ke g: kalimat ke berapa, empat angka yang diatur anak (ribuan, ratusan, puluhan, satuan gram), dan yang sudah benar. */
  kggKe: number;
  kgg: Empat;
  kggBenar: number[];
  /** g ke kg: empat angka (kilogram, ratusan, puluhan, satuan gram). */
  gkgKe: number;
  gkg: Empat;
  gkgBenar: number[];
  /** Jumlah dan Kurang: empat angka hasil (kilogram, ratusan, puluhan, satuan gram). */
  jumlahKe: number;
  jumlah: Empat;
  jumlahBenar: number[];
  kurangKe: number;
  kurang: Empat;
  kurangBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalBandul = (): KeadaanBandul => ({
  alat: "bandul",
  mode: "rakit",
  benda: 0,
  pasang: [0, 0, 0, 0, 0],
  rakitKe: 0,
  rakitBenar: [],
  kggKe: 0,
  kgg: [0, 0, 0, 0],
  kggBenar: [],
  gkgKe: 0,
  gkg: [0, 0, 0, 0],
  gkgBenar: [],
  jumlahKe: 0,
  jumlah: [0, 0, 0, 0],
  jumlahBenar: [],
  kurangKe: 0,
  kurang: [0, 0, 0, 0],
  kurangBenar: [],
  salah: 0,
});
export const mulaiLagiBandul = (): KeadaanBandul => awalBandul();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 99.999 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  if (n < 1000) {
    const r = Math.floor(n / 100);
    const sisa = n % 100;
    const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
    return sisa === 0 ? ratus : `${ratus} ${kata(sisa)}`;
  }
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 1 ? "seribu" : `${kata(ribu)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kata(sisa)}`;
}
export const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
/** Ucapan berat dari gram: dua kilogram lima ratus gram. */
export const sebutBerat = (t: number): string => {
  const kg = Math.floor(t / 1000);
  const g = t % 1000;
  return kg === 0 ? `${kata(g)} gram` : g === 0 ? `${kata(kg)} kilogram` : `${kata(kg)} kilogram ${kata(g)} gram`;
};
/** Nilai empat angka sebagai gram: ribuan, ratusan, puluhan, satuan. */
export const nilaiEmpat = (d: readonly number[]): number => d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];

export const pilihModeBandul = (k: KeadaanBandul, mode: ModeBandul): KeadaanBandul => ({ ...k, mode });
export const pilihBendaBandul = (k: KeadaanBandul, i: number): KeadaanBandul => (i < 0 || i >= BENDA_BANDUL.length ? k : { ...k, benda: i });

/** Mengubah satu angka naik atau turun, paling sedikit nol dan paling banyak sembilan. */
export function ubahEmpat(d: Empat, t: number, arah: 1 | -1): { d: Empat; ok: boolean } {
  if (t < 0 || t > 3) return { d, ok: false };
  const baru = d[t] + arah;
  if (baru < 0 || baru > 9) return { d, ok: false };
  const h: Empat = [d[0], d[1], d[2], d[3]];
  h[t] = baru;
  return { d: h, ok: true };
}

/* ------------------------------ Rakit ------------------------------ */
export const BERAT_PASANG = [50, 100, 200, 500, 1000] as const;
export const NAMA_PASANG = ["setengah ons", "satu ons", "dua ons", "setengah kilogram", "satu kilogram"] as const;
export const targetRakit = (k: KeadaanBandul) => TARGET_RAKIT[k.rakitKe % TARGET_RAKIT.length];
export const beratPasang = (k: KeadaanBandul): number => k.pasang.reduce((t, n, i) => t + n * BERAT_PASANG[i], 0);
/** Tambah (arah 1) atau kurangi (arah -1) satu bandul jenis `j`; paling banyak sembilan tiap jenis. */
export function pasangBandul(k: KeadaanBandul, j: number, arah: 1 | -1): { k: KeadaanBandul; ok: boolean } {
  if (j < 0 || j > 4) return { k, ok: false };
  const baru = k.pasang[j] + arah;
  if (baru < 0 || baru > 9) return { k, ok: false };
  const p: PasangBandul = [...k.pasang];
  p[j] = baru;
  return { k: { ...k, pasang: p }, ok: true };
}
export const kosongkanRakit = (k: KeadaanBandul): KeadaanBandul => ({ ...k, pasang: [0, 0, 0, 0, 0] });
/** Seimbang bila jumlah berat bandul sama dengan berat benda; sasaran berikutnya dibuka dan piring dikosongkan. */
export function periksaRakit(k: KeadaanBandul): { k: KeadaanBandul; ok: boolean } {
  const b = beratPasang(k);
  if (b > 0 && b === targetRakit(k).g) return { k: { ...k, rakitBenar: k.rakitBenar.includes(k.rakitKe) ? k.rakitBenar : [...k.rakitBenar, k.rakitKe], rakitKe: k.rakitKe + 1, pasang: [0, 0, 0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukRakit(k: KeadaanBandul): string {
  const t = targetRakit(k).g;
  const b = beratPasang(k);
  if (b === 0) return `Pasang bandul di piring kanan sampai beratnya sama dengan ${sebutBerat(t)}.`;
  return b > t ? "Bandulnya terlalu berat. Kurangi bandul, lalu periksa lagi." : "Bandulnya masih kurang berat. Tambah bandul, lalu periksa lagi.";
}
export function kalimatRakit(k: KeadaanBandul): string {
  const t = targetRakit(k).g;
  if (k.rakitBenar.length > 0 && beratPasang(k) === 0) return "Betul! Timbangannya seimbang. Ada benda berikutnya.";
  return `Berat benda ${sebutBerat(t)}. Pasang bandul sampai seimbang, lalu tekan Periksa. Berat bandul sekarang ${beratPasang(k) === 0 ? "nol" : sebutBerat(beratPasang(k))}.`;
}

/* ------------------------------ Kg ke g ------------------------------ */
export const targetKgg = (k: KeadaanBandul) => TARGET_KGG[k.kggKe % TARGET_KGG.length];
export const jawabKgg = (k: KeadaanBandul): number => targetKgg(k).kg * 1000 + targetKgg(k).g;
export function ubahKgg(k: KeadaanBandul, t: number, arah: 1 | -1): { k: KeadaanBandul; ok: boolean } {
  const r = ubahEmpat(k.kgg, t, arah);
  return { k: r.ok ? { ...k, kgg: r.d } : k, ok: r.ok };
}
export function periksaKgg(k: KeadaanBandul): { k: KeadaanBandul; ok: boolean } {
  if (nilaiEmpat(k.kgg) === jawabKgg(k)) return { k: { ...k, kggBenar: k.kggBenar.includes(k.kggKe) ? k.kggBenar : [...k.kggBenar, k.kggKe], kggKe: k.kggKe + 1, kgg: [0, 0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKgg(k: KeadaanBandul): string {
  const t = targetKgg(k);
  const n = nilaiEmpat(k.kgg);
  if (n === t.kg * 100 + t.g && n !== jawabKgg(k)) return "Satu kilogram sama dengan seribu gram, bukan seratus gram. Kalikan kilogram dengan seribu.";
  return `Kilogram diubah ke gram dengan dikalikan seribu: ${kata(t.kg)} kali seribu sama dengan ${kata(t.kg * 1000)}${t.g > 0 ? `, lalu tambah ${kata(t.g)}` : ""}.`;
}
export function kalimatKgg(k: KeadaanBandul): string {
  const t = targetKgg(k);
  return k.kggBenar.length > 0 && nilaiEmpat(k.kgg) === 0 ? "Betul! Kilogram sudah menjadi gram. Ada kalimat berikutnya." : `Berat benda ${sebutBerat(t.kg * 1000 + t.g)}. Ubah ke gram dengan angka ribuan, ratusan, puluhan, dan satuan, lalu tekan Periksa.`;
}

/* ------------------------------ g ke kg ------------------------------ */
export const targetGkg = (k: KeadaanBandul) => TARGET_GKG[k.gkgKe % TARGET_GKG.length];
export const jawabGkg = (k: KeadaanBandul): number => targetGkg(k).g;
export function ubahGkg(k: KeadaanBandul, t: number, arah: 1 | -1): { k: KeadaanBandul; ok: boolean } {
  const r = ubahEmpat(k.gkg, t, arah);
  return { k: r.ok ? { ...k, gkg: r.d } : k, ok: r.ok };
}
export function periksaGkg(k: KeadaanBandul): { k: KeadaanBandul; ok: boolean } {
  if (nilaiEmpat(k.gkg) === jawabGkg(k)) return { k: { ...k, gkgBenar: k.gkgBenar.includes(k.gkgKe) ? k.gkgBenar : [...k.gkgBenar, k.gkgKe], gkgKe: k.gkgKe + 1, gkg: [0, 0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukGkg(k: KeadaanBandul): string {
  const t = jawabGkg(k);
  return `Ambil tiap seribu gram sebagai satu kilogram: ${kata(t)} gram sama dengan ${sebutBerat(t)}. Sisa yang kurang dari seribu tetap gram.`;
}
export function kalimatGkg(k: KeadaanBandul): string {
  return k.gkgBenar.length > 0 && nilaiEmpat(k.gkg) === 0 ? "Betul! Gram sudah menjadi kilogram. Ada kalimat berikutnya." : `Berat benda ${kata(jawabGkg(k))} gram. Atur angka kilogram, ratusan, puluhan, dan satuan gram, lalu tekan Periksa.`;
}

/* ------------------------------ Jumlah ------------------------------ */
export const targetJumlah = (k: KeadaanBandul) => TARGET_JUMLAH[k.jumlahKe % TARGET_JUMLAH.length];
export const jawabJumlah = (k: KeadaanBandul): number => targetJumlah(k).a + targetJumlah(k).b;
export function ubahJumlah(k: KeadaanBandul, t: number, arah: 1 | -1): { k: KeadaanBandul; ok: boolean } {
  const r = ubahEmpat(k.jumlah, t, arah);
  return { k: r.ok ? { ...k, jumlah: r.d } : k, ok: r.ok };
}
export function periksaJumlah(k: KeadaanBandul): { k: KeadaanBandul; ok: boolean } {
  if (nilaiEmpat(k.jumlah) === jawabJumlah(k)) return { k: { ...k, jumlahBenar: k.jumlahBenar.includes(k.jumlahKe) ? k.jumlahBenar : [...k.jumlahBenar, k.jumlahKe], jumlahKe: k.jumlahKe + 1, jumlah: [0, 0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukJumlah(k: KeadaanBandul): string {
  const t = targetJumlah(k);
  return `Ubah dulu ke gram, lalu tambah: ${kata(t.a)} gram ditambah ${kata(t.b)} gram sama dengan ${kata(t.a + t.b)} gram. Atur angkanya sebagai kilogram dan gram.`;
}
export function kalimatJumlah(k: KeadaanBandul): string {
  const t = targetJumlah(k);
  return k.jumlahBenar.length > 0 && nilaiEmpat(k.jumlah) === 0 ? "Betul! Beratnya sudah dijumlahkan. Ada kalimat berikutnya." : `Dua berat dicampur: ${sebutBerat(t.a)} dan ${sebutBerat(t.b)}. Atur hasilnya sebagai kilogram dan gram, lalu tekan Periksa.`;
}

/* ------------------------------ Kurang ------------------------------ */
export const targetKurang = (k: KeadaanBandul) => TARGET_KURANG[k.kurangKe % TARGET_KURANG.length];
export const jawabKurang = (k: KeadaanBandul): number => targetKurang(k).a - targetKurang(k).b;
export function ubahKurang(k: KeadaanBandul, t: number, arah: 1 | -1): { k: KeadaanBandul; ok: boolean } {
  const r = ubahEmpat(k.kurang, t, arah);
  return { k: r.ok ? { ...k, kurang: r.d } : k, ok: r.ok };
}
export function periksaKurang(k: KeadaanBandul): { k: KeadaanBandul; ok: boolean } {
  if (nilaiEmpat(k.kurang) === jawabKurang(k)) return { k: { ...k, kurangBenar: k.kurangBenar.includes(k.kurangKe) ? k.kurangBenar : [...k.kurangBenar, k.kurangKe], kurangKe: k.kurangKe + 1, kurang: [0, 0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukKurang(k: KeadaanBandul): string {
  const t = targetKurang(k);
  return `Ubah dulu ke gram, lalu kurangkan: ${kata(t.a)} gram dikurangi ${kata(t.b)} gram sama dengan ${kata(t.a - t.b)} gram. Atur angkanya sebagai kilogram dan gram.`;
}
export function kalimatKurang(k: KeadaanBandul): string {
  const t = targetKurang(k);
  return k.kurangBenar.length > 0 && nilaiEmpat(k.kurang) === 0 ? "Betul! Beratnya sudah dikurangkan. Ada kalimat berikutnya." : `Berat semula ${sebutBerat(t.a)}, lalu berkurang ${sebutBerat(t.b)}. Atur sisanya sebagai kilogram dan gram, lalu tekan Periksa.`;
}

/** Mengisi angka empat tempat dari berat dalam gram (untuk uji dan petunjuk). */
export const empatDari = (t: number): Empat => [Math.floor(t / 1000) % 10, Math.floor(t / 100) % 10, Math.floor(t / 10) % 10, t % 10];
