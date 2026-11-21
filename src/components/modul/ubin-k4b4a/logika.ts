/**
 * Logika murni Simulasi Lantai Ubin Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta", awal cerita Kolam Renang Tirta Ceria.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ubin-k4b4a.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Tutup (lantai kosong, pasang ubin satu per satu atau satu baris; alat menolak memeriksa selama lantai masih kosong),
 * Baris (isi luas dari baris kali kolom dengan satuannya), Tangga (ubah meter persegi ke sentimeter persegi), dan Satuan (pilih satuan luas yang tepat untuk benda).
 * Data ada di data-sim.ts.
 */
import { kataBilK4B4 } from "../eja-k4b4";
import { BARIS_MAKS, TANGGA_MAKS, TARGET_BARIS, TARGET_SATUAN, TARGET_TANGGA, TARGET_TUTUP, type BendaSim, type LantaiSim } from "./data-sim";

export type ModeUbin = "tutup" | "baris" | "tangga" | "satuan";

export type KeadaanUbin = {
  alat: "ubin";
  mode: ModeUbin;
  /** Tutup: sasaran ke berapa, banyak ubin yang sudah dipasang, sasaran yang sudah benar. */
  tutupKe: number;
  tutupIsi: number;
  tutupBenar: number[];
  /** Baris: sasaran ke berapa, luas yang diisi (0 bila belum), sasaran yang sudah benar. */
  barisKe: number;
  barisIsi: number;
  barisBenar: number[];
  /** Tangga: sasaran ke berapa, banyak kelompok sepuluh ribu sentimeter persegi yang diisi (0 bila belum), sasaran yang sudah benar. */
  tanggaKe: number;
  tanggaIsi: number;
  tanggaBenar: number[];
  /** Satuan: sasaran ke berapa, satuan dipilih (-1 bila belum; 0 cm², 1 m²), sasaran yang sudah benar. */
  satuanKe: number;
  satuanPilih: number;
  satuanBenar: number[];
  /** Alat sudah pernah menolak memeriksa lantai yang masih kosong. */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalUbin = (): KeadaanUbin => ({
  alat: "ubin",
  mode: "tutup",
  tutupKe: 0,
  tutupIsi: 0,
  tutupBenar: [],
  barisKe: 0,
  barisIsi: 0,
  barisBenar: [],
  tanggaKe: 0,
  tanggaIsi: 0,
  tanggaBenar: [],
  satuanKe: 0,
  satuanPilih: -1,
  satuanBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiUbin = (): KeadaanUbin => awalUbin();
export const pilihModeUbin = (k: KeadaanUbin, mode: ModeUbin): KeadaanUbin => ({ ...k, mode });

/* ------------------------------ Kata dan hitungan ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataBilK4B4(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const luasSim = (g: LantaiSim): number => g.b * g.k;
export const NAMA_SATUAN: readonly string[] = ["cm²", "m²"];
/** Nomor satuan menurut `SatuanSim`: cm² = 0, m² = 1. Sama dengan `satuanPilih`. */
export const nomorSatuan = (u: "cm²" | "m²"): number => (u === "cm²" ? 0 : 1);
/** Bilangan dengan titik ribuan: 30000 menjadi "30.000". */
export const teksRibu = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const batas = (n: number, min: number, maks: number): number => Math.max(min, Math.min(maks, n));
/** Semua ubin kisi baris demi baris: ubin ke-i berada di baris floor(i / k) dan kolom i mod k; `terpasang` bila i < jumlah yang sudah dipasang. */
export function selLantai(g: LantaiSim, terpasang: number): { i: number; baris: number; kolom: number; terpasang: boolean }[] {
  return Array.from({ length: g.b * g.k }, (_, i) => ({ i, baris: Math.floor(i / g.k), kolom: i % g.k, terpasang: i < terpasang }));
}

/* ------------------------------ Tutup lantai ------------------------------ */
export const targetTutup = (k: KeadaanUbin): LantaiSim => TARGET_TUTUP[k.tutupKe % TARGET_TUTUP.length];
/** Tambah atau ambil ubin pada lantai. Satu baris menambah sebanyak kolom sekaligus. */
export function ubahTutup(k: KeadaanUbin, delta: number): KeadaanUbin {
  const tutupIsi = batas(k.tutupIsi + delta, 0, luasSim(targetTutup(k)));
  return tutupIsi === k.tutupIsi ? k : { ...k, tutupIsi };
}
/** Periksa: alat menolak selama lantai masih kosong (itulah penolakan yang dihitung tantangan). */
export function periksaTutup(k: KeadaanUbin): { k: KeadaanUbin; ok: boolean } {
  if (k.tutupIsi === 0) return { k: { ...k, tolak: true }, ok: false };
  if (k.tutupIsi === luasSim(targetTutup(k))) {
    return { k: { ...k, tutupBenar: k.tutupBenar.includes(k.tutupKe) ? k.tutupBenar : [...k.tutupBenar, k.tutupKe], tutupKe: k.tutupKe + 1, tutupIsi: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTutup(k: KeadaanUbin): string {
  if (k.tutupIsi === 0) return "Alat menolak. Lantai masih kosong. Pasang ubin dulu, lalu tekan Periksa.";
  return "Lantai belum tertutup pas. Hitung banyak baris dan banyak kolom, lalu pastikan tidak ada celah dan tidak ada ubin yang berlebih.";
}
export function kalimatTutup(k: KeadaanUbin): string {
  if (k.tutupBenar.length > 0 && k.tutupIsi === 0) return "Betul! Ada lantai berikutnya.";
  if (k.tutupIsi === 0) return "Lantai masih kosong. Pasang ubin untuk menutupnya.";
  return `Sudah terpasang ${kata(k.tutupIsi)} ubin. Tekan Periksa bila lantai sudah tertutup pas.`;
}

/* ------------------------------ Baris kali kolom ------------------------------ */
export const targetBaris = (k: KeadaanUbin): LantaiSim => TARGET_BARIS[k.barisKe % TARGET_BARIS.length];
/** Naikkan atau turunkan luas yang diisi. Nol berarti luas belum diisi. */
export function ubahBaris(k: KeadaanUbin, delta: number): KeadaanUbin {
  const barisIsi = batas(k.barisIsi + delta, 0, BARIS_MAKS);
  return barisIsi === k.barisIsi ? k : { ...k, barisIsi };
}
export function periksaBaris(k: KeadaanUbin): { k: KeadaanUbin; ok: boolean } {
  if (k.barisIsi === 0) return { k, ok: false };
  if (k.barisIsi === luasSim(targetBaris(k))) {
    return { k: { ...k, barisBenar: k.barisBenar.includes(k.barisKe) ? k.barisBenar : [...k.barisBenar, k.barisKe], barisKe: k.barisKe + 1, barisIsi: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaris(k: KeadaanUbin): string {
  if (k.barisIsi === 0) return "Alat menolak. Luas belum diisi. Atur luas dulu, lalu tekan Periksa.";
  return "Luas belum sesuai. Hitung ulang banyak baris kali banyak kolom.";
}
export function kalimatBaris(k: KeadaanUbin): string {
  if (k.barisBenar.length > 0 && k.barisIsi === 0) return "Betul! Ada lantai berikutnya.";
  return k.barisIsi === 0 ? "Hitung baris dan kolom ubin, lalu atur luasnya." : "Luas sudah diisi. Tekan Periksa bila sudah yakin.";
}

/* ------------------------------ Tangga satuan ------------------------------ */
export const targetTangga = (k: KeadaanUbin): number => TARGET_TANGGA[k.tanggaKe % TARGET_TANGGA.length];
/** Naikkan atau turunkan banyak kelompok sepuluh ribu sentimeter persegi. Nol berarti belum diisi. */
export function ubahTangga(k: KeadaanUbin, delta: number): KeadaanUbin {
  const tanggaIsi = batas(k.tanggaIsi + delta, 0, TANGGA_MAKS);
  return tanggaIsi === k.tanggaIsi ? k : { ...k, tanggaIsi };
}
export function periksaTangga(k: KeadaanUbin): { k: KeadaanUbin; ok: boolean } {
  if (k.tanggaIsi === 0) return { k, ok: false };
  if (k.tanggaIsi === targetTangga(k)) {
    return { k: { ...k, tanggaBenar: k.tanggaBenar.includes(k.tanggaKe) ? k.tanggaBenar : [...k.tanggaBenar, k.tanggaKe], tanggaKe: k.tanggaKe + 1, tanggaIsi: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTangga(k: KeadaanUbin): string {
  if (k.tanggaIsi === 0) return "Alat menolak. Hasil perubahan belum diisi. Atur dulu, lalu tekan Periksa.";
  return "Hasil belum sesuai. Ingat satu meter persegi sama dengan sepuluh ribu sentimeter persegi, lalu hitung berapa meter persegi di lantai ini.";
}
export function kalimatTangga(k: KeadaanUbin): string {
  if (k.tanggaBenar.length > 0 && k.tanggaIsi === 0) return "Betul! Ada lantai berikutnya.";
  return k.tanggaIsi === 0 ? "Turun tangga dari meter persegi ke sentimeter persegi. Atur hasilnya." : "Hasil sudah diisi. Tekan Periksa bila sudah yakin.";
}

/* ------------------------------ Satuan yang tepat ------------------------------ */
export const targetSatuan = (k: KeadaanUbin): BendaSim => TARGET_SATUAN[k.satuanKe % TARGET_SATUAN.length];
export function pilihSatuan(k: KeadaanUbin, i: number): KeadaanUbin {
  return i < 0 || i > 1 ? k : { ...k, satuanPilih: i };
}
export function periksaSatuan(k: KeadaanUbin): { k: KeadaanUbin; ok: boolean } {
  if (k.satuanPilih < 0) return { k, ok: false };
  if (k.satuanPilih === nomorSatuan(targetSatuan(k).u)) {
    return { k: { ...k, satuanBenar: k.satuanBenar.includes(k.satuanKe) ? k.satuanBenar : [...k.satuanBenar, k.satuanKe], satuanKe: k.satuanKe + 1, satuanPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukSatuan(k: KeadaanUbin): string {
  if (k.satuanPilih < 0) return "Alat menolak. Pilih satu satuan dulu, lalu tekan Periksa.";
  return "Bayangkan ukuran benda itu. Satuan kecil cocok untuk benda kecil, dan satuan besar cocok untuk lantai yang luas.";
}
export function kalimatSatuan(k: KeadaanUbin): string {
  return k.satuanBenar.length > 0 && k.satuanPilih < 0 ? "Betul! Ada benda berikutnya." : "Lihat bendanya, pilih satuan luas yang tepat, lalu tekan Periksa.";
}
