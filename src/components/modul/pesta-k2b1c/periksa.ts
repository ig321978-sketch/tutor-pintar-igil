/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 2 Bab 1 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-pesta-k2b1c.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari dan tulis angka) dan menambah pengenal ucapan sampai lima puluh.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";
import { awalGaris, PANJANG_GARIS, PATOKAN, puluhSatuan } from "./logika";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

const r1 = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Bilangan sebagai kotak sepuluh dan kue lepas (Concrete), batang puluhan dan kubus satuan (Pictorial) ------------------------------ */
export type TataBilangan = { kotak: Titik[]; lepas: Titik[]; lebar: number; tinggi: number };
/** Ukuran satu kotak sepuluh (benda) dan jarak antarkotak. */
export const KOTAK = { w: 24, h: 16, jarak: 27 };
export const LEPAS = { u: 14, jarak: 17 };
/**
 * Benda: p kotak sepuluh berjajar di baris atas (pojok kiri-atas tiap kotak), lalu s kue lepas di petak lima kolom di bawahnya (pusat tiap kue).
 * Titik relatif terhadap pojok kiri-atas gambar bilangan. Paling banyak empat kotak dan sembilan kue lepas (bilangan sampai empat puluh sembilan).
 */
export function tataBenda(n: number): TataBilangan {
  const { p, s } = puluhSatuan(n);
  return {
    kotak: Array.from({ length: p }, (_, i) => ({ x: i * KOTAK.jarak, y: 0 })),
    lepas: Array.from({ length: s }, (_, j) => ({ x: r1(8 + (j % 5) * LEPAS.jarak), y: r1(32 + Math.floor(j / 5) * LEPAS.jarak) })),
    lebar: 4 * KOTAK.jarak,
    tinggi: 56,
  };
}
/** Diagram: p batang puluhan tegak (pojok kiri-atas, 9 x 30) dan s kubus satuan (pojok kiri-atas, 10 x 10) di petak dua baris lima kolom di sebelah kanannya. */
export const BATANG_PULUHAN = { w: 9, h: 30, jarak: 12 };
export const KUBUS = { u: 10, jarak: 13 };
export function tataDiagram(n: number): TataBilangan {
  const { p, s } = puluhSatuan(n);
  const x0 = 4 * BATANG_PULUHAN.jarak + 8;
  return {
    kotak: Array.from({ length: p }, (_, i) => ({ x: i * BATANG_PULUHAN.jarak, y: 0 })),
    lepas: Array.from({ length: s }, (_, j) => ({ x: r1(x0 + (j % 5) * KUBUS.jarak), y: r1(Math.floor(j / 5) * KUBUS.jarak + 2) })),
    lebar: x0 + 5 * KUBUS.jarak,
    tinggi: 32,
  };
}

/* ------------------------------ Dua bilangan berdampingan (Metode IGIL) ------------------------------ */
/** Pusat gambar bilangan ke-i dari dua (Metode IGIL). */
export const pusatDua = (i: number): Titik => ({ x: i === 0 ? 78 : 222, y: 104 });
/** Pojok kiri-atas gambar bilangan Concrete atau Pictorial yang berpusat di c. */
export const pojokBenda = (c: Titik, skala = 1): Titik => ({ x: r1(c.x - (4 * KOTAK.jarak * skala) / 2), y: r1(c.y - 30 * skala) });
export const pojokDiagram = (c: Titik, skala = 1): Titik => ({ x: r1(c.x - (tataDiagram(0).lebar * skala) / 2), y: r1(c.y - 18 * skala) });
/** Jari-jari penerimaan tanda di bilangan dan baris. */
export const R_PILIH = 52;

/* ------------------------------ Tiga nampan yang disusun (Number Line, Concrete) ------------------------------ */
export const SKALA_TIGA = 0.8;
export const pusatTiga = (i: number): Titik => ({ x: 52 + i * 98, y: 76 });
/** Slot tempat nampan disusun: tiga slot di bawah, dari kiri (paling sedikit) ke kanan (paling banyak). */
export const slotTiga = (i: number): Titik => ({ x: 52 + i * 98, y: 160 });

/* ------------------------------ Garis bilangan (Number Line, Pictorial) ------------------------------ */
export const GARIS = { x: 24, w: 252, y: 122 };
export const xGaris = (isi: readonly number[], n: number): number => r1(GARIS.x + (GARIS.w * (n - awalGaris(isi))) / PANJANG_GARIS);
/** Letak titik bilangan n pada garis bilangan untuk himpunan `isi`. */
export const titikGaris = (isi: readonly number[], n: number): Titik => ({ x: xGaris(isi, n), y: GARIS.y });

/* ------------------------------ Bendera patokan (Benchmark Numbers) ------------------------------ */
export const xPatokan = (i: number): number => 40 + 55 * i;
export const xBilPatokan = (n: number): number => r1(40 + 5.5 * (n - 10));
/** Pusat bendera patokan ke-i untuk lingkari (Pictorial) dan untuk ketuk. */
export const pusatBendera = (i: number): Titik => ({ x: xPatokan(i), y: 74 });
export const Y_DASAR_PATOKAN = 122;
/** Patokan di Concrete: lima tumpuk kotak di baris bawah. */
export const pusatPatokanBenda = (i: number): Titik => ({ x: xPatokan(i), y: 156 });
export { PATOKAN };

/* ------------------------------ Deretan dan batang sejajar (Bar Model) ------------------------------ */
export const X_BARIS = 44;
export const SATUAN_BATANG = 4.5;
/** Pusat baris ke-i dari tiga untuk lingkari dan ketuk. */
export const pusatBaris = (i: number): Titik => ({ x: 150, y: 56 + i * 46 });
export const yBaris = (i: number): number => 56 + i * 46;
/** Deretan kotak kue (Concrete): kotak sepuluh lalu kue lepas, sejajar dari X_BARIS. Panjang deret dihitung per bilangan. */
export function tataBaris(n: number): { kotak: Titik[]; lepas: Titik[]; panjang: number } {
  const { p, s } = puluhSatuan(n);
  const lepasMulai = p * KOTAK.jarak;
  return {
    kotak: Array.from({ length: p }, (_, i) => ({ x: i * KOTAK.jarak, y: 0 })),
    lepas: Array.from({ length: s }, (_, j) => ({ x: r1(lepasMulai + 6 + j * 12), y: 8 })),
    panjang: lepasMulai + s * 12,
  };
}

/* ------------------------------ Pengenal ucapan sampai lima puluh ------------------------------ */
const KATA_DASAR: Record<string, number> = {
  nol: 0,
  satu: 1,
  dua: 2,
  tiga: 3,
  empat: 4,
  ampat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7,
  tuju: 7,
  delapan: 8,
  lapan: 8,
  sembilan: 9,
  semilan: 9,
  se: 1,
};
/**
 * Semua bilangan nol sampai lima puluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali "sebelas", "<satuan> belas",
 * "sepuluh", "<dua sampai lima> puluh" dengan satuan di belakangnya, kata satuan, dan angka.
 */
export function bilanganDariUcapan50(teks: string): number[] {
  const t = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bse\s+(belas|puluh)\b/g, "se$1")
    .replace(/\b([a-z]+)(belas|puluh)\b/g, (m, a: string, b: string) => (a in KATA_DASAR ? `${a} ${b}` : m))
    .trim();
  const kt = t.split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 50 && !hasil.includes(n)) hasil.push(n);
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
    if (!(w in KATA_DASAR)) continue;
    const v = KATA_DASAR[w];
    if (lanjut === "belas" && v >= 1) {
      tambah(10 + v);
      i += 1;
      continue;
    }
    if (lanjut === "puluh" && v >= 2 && v <= 5) {
      const sesudah = kt[i + 2];
      if (sesudah !== undefined && sesudah in KATA_DASAR && sesudah !== "se" && KATA_DASAR[sesudah] >= 1 && KATA_DASAR[sesudah] <= 9) {
        tambah(v * 10 + KATA_DASAR[sesudah]);
        i += 2;
      } else {
        tambah(v * 10);
        i += 1;
      }
      continue;
    }
    if (w === "se" && lanjut === "puluh") {
      tambah(10);
      i += 1;
      continue;
    }
    if (w !== "se") tambah(v);
  }
  return hasil;
}
