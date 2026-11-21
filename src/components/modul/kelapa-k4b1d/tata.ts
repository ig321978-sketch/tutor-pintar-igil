/**
 * Tata letak gambar Kelas 4 Bab 1 Sub-Bab D (murni, tanpa React, diuji di Node: scripts/uji-kelapa-k4b1d.mjs).
 * Gambar harus sungguh sebanyak datanya: rak keranjang (Concrete) menaruh tepat satu gambar benda untuk tiap angka di tiap tempat,
 * balok cacah polos (Pictorial) menggambar tepat satu balok untuk tiap angka, dan rak bagan menaruh tepat ribuan dan ratusan sesuai bilangannya.
 */
import { HARGA, URUT_PECAHAN, URUT_TEMPAT, angkaDi, type IsiUang, type Pecahan, type Tempat } from "./logika-cpa";

/** Lebar kanvas gambar (viewBox 300 x 200). */
export const LEBAR = 300;
export const TINGGI = 200;

/* ------------------------------ Rak keranjang (Concrete) ------------------------------ */
export const FS_RAK: Record<Tempat, number> = { ribuan: 20, ratusan: 17, puluhan: 14, satuan: 14 };
export const X0_RAK = 74;
export type BarisRak = { tempat: Tempat; harga: number; jumlah: number; fs: number; y: number; tinggi: number; xs: number[]; lebar: number };

/** Banyak keranjang tiap tempat (ribuan, ratusan, puluhan, satuan) untuk bilangan `n`: sama dengan angka di tiap tempat. */
export const isiDari = (n: number): number[] => URUT_TEMPAT.map((t) => angkaDi(n, t));

/** Empat baris rak: satu baris tiap tempat angka, berisi sebanyak `isi` di tempat itu (bawaan: angka bilangan `n`). */
export function susunRak(n: number, isi: number[] = isiDari(n)): BarisRak[] {
  return URUT_TEMPAT.map((t, i) => {
    const jumlah = isi[i];
    const fs = FS_RAK[t];
    const jarak = Math.round(fs * 1.15 * 10) / 10;
    return {
      tempat: t,
      harga: HARGA[t],
      jumlah,
      fs,
      y: 24 + i * 43,
      tinggi: 39,
      xs: Array.from({ length: jumlah }, (_, j) => Math.round((X0_RAK + j * jarak) * 10) / 10),
      lebar: jumlah * jarak,
    };
  });
}

export const FS_RIBU = 14;
export const FS_RATUS = 11;
export const X0_BAGAN = 66;
export const BATAS_BAGAN = 288;
const jarakR = (fs: number): number => Math.round(fs * 1.15 * 10) / 10;
export type BarisBagan = { nama: string; y: number; ribu: number[]; ratus: number[]; kanan: number };

/** Satu baris rak bagan untuk bilangan kelipatan seratus: keranjang besar (ribuan) lalu keranjang sedang (ratusan). */
export function susunBagan(m: number, nama: string, y: number): BarisBagan {
  const a = Math.floor(m / 1000);
  const b = Math.floor((m % 1000) / 100);
  const ribu = Array.from({ length: a }, (_, j) => Math.round((X0_BAGAN + j * jarakR(FS_RIBU)) * 10) / 10);
  const mulai = X0_BAGAN + a * jarakR(FS_RIBU) + (a > 0 && b > 0 ? 6 : 0);
  const ratus = Array.from({ length: b }, (_, j) => Math.round((mulai + j * jarakR(FS_RATUS)) * 10) / 10);
  return { nama, y, ribu, ratus, kanan: Math.max(X0_BAGAN, mulai + b * jarakR(FS_RATUS)) };
}
/** Apakah bilangan kelipatan seratus muat pada satu baris rak bagan? */
export const muatBagan = (m: number): boolean => m % 100 === 0 && susunBagan(m, "x", 0).kanan <= BATAS_BAGAN;

/* ------------------------------ Balok cacah polos (Pictorial) ------------------------------ */
export type Balok = { x: number; y: number; w: number; h: number };
export type KolomBalok = { tempat: Tempat; jumlah: number; x0: number; lebar: number; balok: Balok[] };
export const LEBAR_KOLOM = 68;
export const X0_KOLOM = 14;
export const Y0_BALOK = 100;
const UKURAN: Record<Tempat, [number, number]> = { ribuan: [18, 18], ratusan: [18, 9], puluhan: [6, 18], satuan: [7, 7] };

/** Empat kolom bagan tempat angka: tepat satu balok untuk tiap angka (kubus besar, lempeng, batang, kubus kecil), tersusun tiga per baris. */
export function susunBalok(n: number): KolomBalok[] {
  return URUT_TEMPAT.map((t, i) => {
    const jumlah = angkaDi(n, t);
    const x0 = X0_KOLOM + i * LEBAR_KOLOM;
    const [w, h] = UKURAN[t];
    const balok = Array.from({ length: jumlah }, (_, j) => ({
      x: x0 + 2 + (j % 3) * 20 + (20 - w) / 2,
      y: Y0_BALOK + Math.floor(j / 3) * 23 + (21 - h) / 2,
      w,
      h,
    }));
    return { tempat: t, jumlah, x0, lebar: LEBAR_KOLOM - 4, balok };
  });
}

/* ------------------------------ Uang (Concrete dan Pictorial) ------------------------------ */
export const X0_UANG = 74;
/** Lembar uang Rp 2.000 berupa persegi panjang (lebar 26) dan keping berupa lingkaran (garis tengah 18). */
export const LEBAR_LEMBAR = 26;
export const TINGGI_LEMBAR = 15;
export const R_KEPING = 9;
export type BarisUang = { pecahan: Pecahan; jenis: "lembar" | "keping"; jumlah: number; tanya: boolean; y: number; tinggi: number; xs: number[] };

/** Empat baris uang (Rp 2.000, 1.000, 500, 100): tepat satu gambar lembar atau keping untuk tiap banyaknya. Baris `tanya` kosong (tanda tanya). */
export function susunUang(isi: IsiUang, tanya?: Pecahan): BarisUang[] {
  return URUT_PECAHAN.map((p, i) => {
    const jumlah = p === tanya ? 0 : isi[p];
    const lembar = p === 2000;
    const jarak = lembar ? 28 : 22;
    return {
      pecahan: p,
      jenis: lembar ? "lembar" : "keping",
      jumlah,
      tanya: p === tanya,
      y: 24 + i * 43,
      tinggi: 39,
      xs: Array.from({ length: jumlah }, (_, j) => X0_UANG + j * jarak),
    };
  });
}
/** Apakah semua gambar uang muat di baris (batas kanan 288)? */
export const muatUang = (isi: IsiUang): boolean => susunUang(isi).every((b) => b.xs.length === 0 || b.xs[b.xs.length - 1] + (b.jenis === "lembar" ? LEBAR_LEMBAR : 2 * R_KEPING) <= 288);
