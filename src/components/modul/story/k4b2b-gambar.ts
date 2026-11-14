import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab B (Pecahan dengan Penyebut Sama): pecahan bertingkat, batang, lingkaran, segi enam, tabel, dan kartu.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 * Benda bernama `id-b{nomor}` (kotak batang), `id-q{nomor}` (juring lingkaran), `id-h{nomor}` (segitiga segi enam), supaya uji bisa menghitung ulang
 * jumlah bagian dan bagian yang diarsir (warna emas) dari gambar. Pecahan bertingkat: `id-n` (pembilang), `id-g` (garis), `id-d` (penyebut).
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FFF000",
  merahTua: "#D3232B",
  biruMuda: "#2B8FD0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Satu baris tabel (kepala bila `kepala`): id sel `${id}-s{kolom}` (kotak) dan `${id}-t{kolom}` (teks). Untuk baris yang muncul satu per satu. */
export function barisTabel(id: string, x: number, y: number, kolW: number[], isi: string[], tinggi = 16, u = 8, kepala = false, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  let px = x;
  isi.forEach((sel, c) => {
    out.push(kotak(`${id}-s${c}`, px, y, kolW[c], tinggi, kepala ? W.krem : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
    if (sel) out.push(teks(`${id}-t${c}`, px + kolW[c] / 2, y + tinggi / 2 + u * 0.35, sel, u, kepala || c === 0 ? W.biru : W.hijau, o));
    px += kolW[c];
  });
  return out;
}

/* ------------------------------ Data pecahan dari Buku Siswa (dihitung dari gambar PDF) ------------------------------ */

/** Ayo Mengamati (hlm. 63 dan 64): pasangan [pembilang kiri, pembilang kanan, penyebut]. Pertama: 1/3 lebih kecil dari 2/3. Kedua: 2/10 lebih besar dari 1/10. */
export const AMATI: readonly (readonly [number, number, number])[] = [
  [1, 2, 3],
  [2, 1, 10],
];
/** Ayo Berlatih 1 (lingkaran dibagi empat): kiri dua bagian diarsir, kanan satu bagian. Kunci Panduan Guru hlm. 98 menulis 2/4 dan 1/3 (salah ketik). */
export const LATIHAN_SATU = { penyebut: 4, kiri: 2, kanan: 1, kunciGuruKanan: [1, 3] } as const;
/** Ayo Berlatih 2 (dua batang dibagi enam): atas dua bagian, bawah empat bagian. */
export const LATIHAN_DUA = { penyebut: 6, atas: 2, bawah: 4 } as const;
/** Ayo Berlatih 3 (tiga segi enam dibagi enam segitiga): bagian diarsir 5, 3, 1. */
export const LATIHAN_TIGA = { penyebut: 6, arsir: [5, 3, 1] } as const;
/** Ayo Berlatih 4 a sampai e: [pembilang kiri, pembilang kanan, penyebut], dan kunci Panduan Guru hlm. 99. */
export const LATIHAN_EMPAT: readonly (readonly [number, number, number])[] = [
  [1, 3, 5],
  [2, 3, 4],
  [3, 2, 8],
  [5, 2, 10],
  [11, 12, 13],
];
export const KUNCI_EMPAT = ["<", "<", ">", ">", "<"] as const;
/** Ayo Berlatih 5: tongkat Asep 3/6 meter, tongkat Azizah 2/6 meter. */
export const TONGKAT = { penyebut: 6, asep: 3, azizah: 2 } as const;

/* ------------------------------ Pecahan, batang, lingkaran, segi enam ------------------------------ */

/** Pecahan bertingkat berpusat di x; garis pecahan di y. Id `${id}-n`, `${id}-g`, `${id}-d`. */
export function pecahan(id: string, x: number, y: number, n: number | string, d: number | string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const ns = String(n);
  const ds = String(d);
  const w = Math.max(ns.length, ds.length) * u * 0.6 + 5;
  return [teks(`${id}-n`, x, y - 2, ns, u, warna, o), garis(`${id}-g`, x - w / 2, y, w, 0, warna, 1.2, o), teks(`${id}-d`, x, y + u + 1, ds, u, warna, o)];
}

/** Id ketiga benda pecahan buatan `pecahan`. */
export const idPecahan = (id: string): string[] => [`${id}-n`, `${id}-g`, `${id}-d`];

/** Batang `bagian` kotak sama lebar, `arsir` kotak pertama berwarna emas. Id `${id}-b{nomor}`. */
export function batang(id: string, x: number, y: number, w: number, h: number, bagian: number, arsir: number, o: Opsi = {}): Obj[] {
  return Array.from({ length: bagian }, (_, i) => kotak(`${id}-b${i}`, x + (i * w) / bagian, y, w / bagian, h, i < arsir ? W.emas : W.putih, W.biru, { rx: 0, tebal: 1.4, ...o }));
}

/** Id semua kotak batang buatan `batang`. */
export const idBatang = (id: string, bagian: number): string[] => Array.from({ length: bagian }, (_, i) => `${id}-b${i}`);

const bulatkan = (v: number): number => Math.round(v * 1000) / 1000 + 0;

/** Lingkaran dibagi `bagian` juring sama besar mulai dari atas searah jarum jam. Juring bernomor di `arsir` berwarna emas. Id `${id}-q{nomor}`. */
export function lingkaran(id: string, cx: number, cy: number, r: number, bagian: number, arsir: readonly number[], o: Opsi = {}): Obj[] {
  return Array.from({ length: bagian }, (_, i) => {
    const a1 = ((-90 + (i * 360) / bagian) * Math.PI) / 180;
    const a2 = ((-90 + ((i + 1) * 360) / bagian) * Math.PI) / 180;
    const d = `M0 0 L${bulatkan(r * Math.cos(a1))} ${bulatkan(r * Math.sin(a1))} A${r} ${r} 0 0 1 ${bulatkan(r * Math.cos(a2))} ${bulatkan(r * Math.sin(a2))} Z`;
    return jalur(`${id}-q${i}`, cx, cy, d, arsir.includes(i) ? W.emas : W.putih, W.biru, { tebal: 1.4, ...o });
  });
}

/** Segi enam beraturan berpusat (cx, cy) berjari-jari r, dibagi enam segitiga sama besar. Segitiga bernomor di `arsir` berwarna emas. Id `${id}-h{nomor}`. */
export function segienam(id: string, cx: number, cy: number, r: number, arsir: readonly number[], o: Opsi = {}): Obj[] {
  const titik = (i: number): [number, number] => [bulatkan(r * Math.cos((i * Math.PI) / 3)), bulatkan(r * Math.sin((i * Math.PI) / 3))];
  return Array.from({ length: 6 }, (_, i) => {
    const [x1, y1] = titik(i);
    const [x2, y2] = titik(i + 1);
    return jalur(`${id}-h${i}`, cx, cy, `M0 0 L${x1} ${y1} L${x2} ${y2} Z`, arsir.includes(i) ? W.emas : W.putih, W.biru, { tebal: 1.4, ...o });
  });
}

/** Id semua juring atau segitiga buatan `lingkaran` atau `segienam`. */
export const idJuring = (id: string, bagian: number, huruf: "q" | "h"): string[] => Array.from({ length: bagian }, (_, i) => `${id}-${huruf}${i}`);
