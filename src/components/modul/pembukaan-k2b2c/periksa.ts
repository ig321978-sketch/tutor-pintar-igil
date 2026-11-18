/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 2 Bab 2 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-pembukaan-k2b2c.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari dan tulis angka) dan pengenal ucapan sampai dua puluh.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";
import type { Zona } from "./logika";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

const r1 = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Baris benda atau petak ------------------------------ */
/** Jarak antarbenda dalam satu baris yang memuat n benda (paling banyak dua puluh) dan masih muat di lebar kanvas. */
export const dxBaris = (n: number): number => (n <= 14 ? 18 : Math.floor(250 / (n - 1)));
/** Titik tengah n benda berderet datar pada tinggi y, berpusat di tengah kanvas. */
export function tataBaris(n: number, y: number): Titik[] {
  const dx = dxBaris(n);
  const lebar = (n - 1) * dx;
  return Array.from({ length: n }, (_, i) => ({ x: r1(150 - lebar / 2 + i * dx), y }));
}
/** Tinggi baris cerita (Metode IGIL): benda pertama dan benda kedua. */
export const Y_CERITA = [48, 84] as const;
/** Tinggi baris benda di meja (Peragakan Cerita), kelompok yang datang, dan baris akhir (Berpikir Mundur). */
export const Y_MEJA = 118;
export const Y_DATANG = 60;
export const Y_AKHIR = 90;

/* ------------------------------ Tanda hitung (tambah dan kurang) untuk dilingkari ------------------------------ */
export const OP_UKURAN = { w: 116, h: 46 };
export const OP_PUSAT: Record<"tambah" | "kurang", Titik> = { tambah: { x: 82, y: 152 }, kurang: { x: 218, y: 152 } };

/* ------------------------------ Bagian dan utuh ------------------------------ */
export const ZONA_KOTAK: Record<Zona, { x: number; y: number; w: number; h: number }> = {
  utuh: { x: 50, y: 24, w: 200, h: 60 },
  kiri: { x: 14, y: 108, w: 130, h: 70 },
  kanan: { x: 156, y: 108, w: 130, h: 70 },
};
export const ZONA_PUSAT: Record<Zona, Titik> = { utuh: { x: 150, y: 54 }, kiri: { x: 79, y: 143 }, kanan: { x: 221, y: 143 } };
export const R_BULAT = 26;
/** Titik tengah n benda di dalam zona (Concrete): utuh sepuluh per baris, bagian enam per baris. */
export function titikZona(zona: Zona, n: number): Titik[] {
  const utuh = zona === "utuh";
  const kolom = utuh ? 10 : 6;
  const dx = utuh ? 17 : 18;
  const c = ZONA_PUSAT[zona];
  const y0 = utuh ? 46 : 140;
  return Array.from({ length: n }, (_, i) => {
    const baris = Math.floor(i / kolom);
    const dalamBaris = Math.min(kolom, n - baris * kolom);
    const geser = (i % kolom) - (dalamBaris - 1) / 2;
    return { x: r1(c.x + geser * dx), y: y0 + baris * 18 };
  });
}

/* ------------------------------ Ucapan bilangan nol sampai dua puluh ------------------------------ */
const KATA_DASAR: Record<string, number> = {
  nol: 0, kosong: 0,
  satu: 1, se: 1,
  dua: 2,
  tiga: 3,
  empat: 4, ampat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7, tuju: 7,
  delapan: 8, lapan: 8,
  sembilan: 9, semilan: 9,
};
/**
 * Semua bilangan nol sampai dua puluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali "sebelas",
 * "<satuan> belas", "dua puluh", "sepuluh", kata satuan, dan angka. Pengenal bersama (lemari-k1b1a) hanya sampai sepuluh.
 */
export function bilanganDariUcapan20(teks: string): number[] {
  const t = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bse\s+(belas|puluh)\b/g, "se$1")
    .replace(/\b([a-z]+)(belas|puluh)\b/g, (m, a: string, b: string) => (a in KATA_DASAR || a === "se" ? `${a} ${b}` : m))
    .trim();
  const kt = t.split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 20 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < kt.length; i += 1) {
    const w = kt[i];
    const lanjut = kt[i + 1];
    if (/^\d+$/.test(w)) {
      tambah(Number(w));
      continue;
    }
    if (w === "sebelas") {
      tambah(11);
      continue;
    }
    if (w === "sepuluh") {
      tambah(10);
      continue;
    }
    if (w in KATA_DASAR) {
      const v = KATA_DASAR[w];
      if (lanjut === "belas" && v >= 1) {
        tambah(10 + v);
        i += 1;
        continue;
      }
      if (lanjut === "puluh" && (v === 1 || v === 2)) {
        tambah(v * 10);
        i += 1;
        continue;
      }
      if (w !== "se") tambah(v);
    }
  }
  return hasil;
}
