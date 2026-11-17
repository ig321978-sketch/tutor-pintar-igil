import type { Obj } from "./logika-story";
import { E as E_B, W, emo, garis, kotak, teks, type Titik } from "./k1b1b-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 1 Sub-Bab C "Tangga Gudang Loteng" (menghitung maju dan mundur).
 * Memakai ulang dasar gambar Sub-Bab A dan B, ditambah: tangga sepuluh anak tangga, kardus bernomor, jalur angka, dan tongkat hitung.
 * Tangga: anak tangga `${id}{i}` (i = 0 sampai 9, anak tangga ke-(i+1)), angka di dalamnya `${id}a{i}`.
 */

export { W, emo, garis, judul, kartu, kartuAngka, kotak, orang, teks, wajah, bulat, type Titik } from "./k1b1b-gambar";

export const E = { ...E_B, piring: "\u{1F37D}\u{FE0F}", gelas: "\u{1F964}", balon: "\u{1F388}" } as const;

/** Letak tangga: anak tangga ke-i (0 sampai 9) berdiri di dasar `dasar`, makin ke kanan makin tinggi. */
export const TANGGA = { x0: 34, lebar: 22, naik: 13, dasar: 184 };
export const atasTangga = (i: number): Titik => ({ x: TANGGA.x0 + i * TANGGA.lebar + TANGGA.lebar / 2, y: TANGGA.dasar - (i + 1) * TANGGA.naik });

/** Tangga sepuluh anak tangga (kotak kayu) dengan angka di pucuk tiap anak tangga bila `angka`. */
export function tangga(id: string, angka = false): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < 10; i += 1) {
    const p = atasTangga(i);
    out.push(kotak(`${id}${i}`, p.x - TANGGA.lebar / 2, p.y, TANGGA.lebar, TANGGA.dasar - p.y, i % 2 ? "#D6A15E" : "#E8B979", W.coklat, { rx: 1, tebal: 1.4, z: -1 }));
    if (angka) out.push(teks(`${id}a${i}`, p.x, p.y + 11, String(i + 1), 9, W.putih));
  }
  return out;
}

/** Angka anak tangga ke-i muncul (dipakai saat menghitung). */
export const angkaTangga = (id: string, i: number, warna: string = W.putih): Obj => teks(`${id}a${i}`, atasTangga(i).x, atasTangga(i).y + 11, String(i + 1), 9, warna);

/** Kardus bernomor: kotak `${id}` dan nomor `${id}-t` (nomor kosong = tanda tanya). */
export const kardus = (id: string, x: number, y: number, nomor: string, w = 24, warna = "#D6A15E"): Obj[] => [
  kotak(id, x - w / 2, y - w / 2, w, w, warna, W.coklat, { rx: 3, tebal: 1.6 }),
  teks(`${id}-t`, x, y + 4, nomor, 11, nomor === "?" ? W.merah : W.biru),
];

/** Jalur angka: petak `${id}{i}` bernomor 1 sampai 10 (`${id}a{i}`) berderet dari x0. */
export function jalur(id: string, x0: number, y: number, s = 26): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < 10; i += 1) {
    out.push(kotak(`${id}${i}`, x0 + i * s, y, s, s, i % 2 ? W.krem : W.langit, W.biru, { rx: 2, tebal: 1.4 }));
    out.push(teks(`${id}a${i}`, x0 + i * s + s / 2, y + s / 2 + 4, String(i + 1), 10, W.biru));
  }
  return out;
}
export const tengahPetak = (x0: number, y: number, i: number, s = 26): Titik => ({ x: x0 + i * s + s / 2, y: y + s / 2 });

/** Tongkat hitung: sepuluh ruas berselang warna dari x0, label di bawah hanya untuk angka di `label`. */
export function tongkat(id: string, x0: number, y: number, label: number[], r = 26): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < 10; i += 1) out.push(kotak(`${id}${i}`, x0 + i * r, y, r, 16, i % 2 ? W.putih : W.emas, W.biru, { rx: 0, tebal: 1.4 }));
  for (let n = 0; n <= 10; n += 1) out.push(garis(`${id}c${n}`, x0 + n * r, y + 16, 0, 6, W.biru, 1.6));
  for (const n of label) out.push(teks(`${id}l${n}`, x0 + n * r, y + 34, String(n), 10, W.biru));
  return out;
}
export const xTongkat = (x0: number, n: number, r = 26): number => x0 + n * r;

/** Penanda tokoh di atas petak atau anak tangga. */
export const penandaTokoh = (id: string, p: Titik, e: string, u = 18): Obj => emo(id, p.x, p.y - 2, e, u);
