/**
 * Laboratorium Bentuk Datar (Kelas 2 Bab 3, Sub-Bab A): model PhET.
 * Satu bentuk terlihat sebagai gambar, sisi bernomor, tabel ciri, dan kalimat.
 * Segi banyak (3 sampai 6 sisi) dan bentuk lengkung (lingkaran, lonjong). Memutar dan membesarkan
 * tidak mengubah ciri. Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b3.mjs.
 */

export type Titik = [number, number];

export const SEGI = [3, 4, 5, 6] as const;
export type Sisi = (typeof SEGI)[number];

export const NAMA_SEGI: Record<Sisi, string> = {
  3: "Segitiga",
  4: "Segi empat",
  5: "Segi lima",
  6: "Segi enam",
};

export type Lengkung = "lingkaran" | "lonjong";

export const NAMA_LENGKUNG: Record<Lengkung, string> = {
  lingkaran: "Lingkaran",
  lonjong: "Bentuk lonjong",
};

export type Bentuk = { tipe: "segi"; n: Sisi } | { tipe: "lengkung"; jenis: Lengkung };

export const AWAL_SISI: Sisi = 6;

export const batasSisi = (n: number): Sisi => Math.max(3, Math.min(6, Math.round(n))) as Sisi;

export const namaBentuk = (b: Bentuk) => (b.tipe === "segi" ? NAMA_SEGI[b.n] : NAMA_LENGKUNG[b.jenis]);

export const kategori = (b: Bentuk) => (b.tipe === "segi" ? "Segi banyak" : "Bentuk lengkung");

export type Ciri = { sisiLurus: number; sudut: number; garisLengkung: boolean };

export const ciri = (b: Bentuk): Ciri => (b.tipe === "segi" ? { sisiLurus: b.n, sudut: b.n, garisLengkung: false } : { sisiLurus: 0, sudut: 0, garisLengkung: true });

/** Putaran dalam derajat, kelipatan 30. */
export const putarBatas = (d: number) => ((Math.round(d / 30) * 30) % 360 + 360) % 360;

export const SKALA = [0.7, 0.9, 1.1] as const;
export const NAMA_SKALA = ["Kecil", "Sedang", "Besar"] as const;

/** Titik sudut segi banyak beraturan. Sudut pertama di atas, lalu diputar. */
export function titikSegi(n: number, jari: number, putarDerajat: number, pusat: Titik = [0, 0]): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((-90 + putarDerajat + (360 / n) * i) * Math.PI) / 180;
    return [pusat[0] + jari * Math.cos(a), pusat[1] + jari * Math.sin(a)] as Titik;
  });
}

/** Letak nomor sisi: tengah tiap sisi, digeser keluar dari pusat. */
export function titikNomorSisi(titik: Titik[], geser: number, pusat: Titik = [0, 0]): Titik[] {
  const n = titik.length;
  return titik.map((p, i) => {
    const q = titik[(i + 1) % n];
    const mx = (p[0] + q[0]) / 2;
    const my = (p[1] + q[1]) / 2;
    const dx = mx - pusat[0];
    const dy = my - pusat[1];
    const len = Math.hypot(dx, dy) || 1;
    return [mx + (dx / len) * geser, my + (dy / len) * geser] as Titik;
  });
}

export const panjangSisi = (titik: Titik[]) => titik.map((p, i) => Math.hypot(titik[(i + 1) % titik.length][0] - p[0], titik[(i + 1) % titik.length][1] - p[1]));

export function kalimatBentuk(b: Bentuk): string {
  if (b.tipe === "segi") return `${NAMA_SEGI[b.n]} punya ${b.n} sisi lurus dan ${b.n} sudut.`;
  return `${NAMA_LENGKUNG[b.jenis]} dibatasi garis lengkung. Tidak punya sisi lurus dan tidak punya sudut.`;
}

export function ucapanBentuk(b: Bentuk, putar: number, skalaIdx: number): string {
  const dasar = kalimatBentuk(b);
  const diubah = putar !== 0 || skalaIdx !== 1;
  const catatan = diubah ? " Bentuknya sudah diputar atau dibesarkan, tetapi cirinya tetap sama." : "";
  const kat = b.tipe === "segi" ? " Ini termasuk segi banyak." : " Ini termasuk bentuk lengkung.";
  return `${dasar}${kat}${catatan}`;
}
