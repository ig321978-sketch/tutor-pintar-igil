import type { Obj } from "./logika-story";
import { E as E_C, W, bulat, emo, garis, kotak, teks, type Titik } from "./k1b1c-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 1 Sub-Bab D "Pesta Rumah Rapi" (pasangan bilangan), akhir cerita Misi Rumah Rapi.
 * Memakai ulang dasar gambar Sub-Bab A sampai C, ditambah: ikatan bilangan (lingkaran utuh dan dua bagian), meja pesta,
 * model batang, dan rak manik. Ikatan: lingkaran `${id}-u`, `${id}-a`, `${id}-b`, garis `${id}-ga`, `${id}-gb`, angka `${id}-tu`, `${id}-ta`, `${id}-tb`.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, wajah, type Titik } from "./k1b1c-gambar";
export { panahObj } from "./k1b1c-materi-gambar";

export const E = { ...E_C, kue: "\u{1F9C1}", kursi: "\u{1FA91}", meja: "\u{1F37D}\u{FE0F}", pita: "\u{1F380}", konfeti: "\u{1F38A}", peluk: "\u{1F917}" } as const;

/** Ikatan bilangan: utuh di atas (pusat ux, uy), dua bagian di bawah. Isi kosong = tanda tanya. */
export function ikatan(id: string, ux: number, uy: number, utuh: string, a: string, b: string, lebar = 46, r = 16): Obj[] {
  const pa: Titik = { x: ux - lebar, y: uy + 52 };
  const pb: Titik = { x: ux + lebar, y: uy + 52 };
  const isi = (s: string) => (s === "?" ? W.merah : W.biru);
  return [
    garis(`${id}-ga`, ux, uy + r, pa.x - ux, pa.y - r - (uy + r), W.biru, 2),
    garis(`${id}-gb`, ux, uy + r, pb.x - ux, pb.y - r - (uy + r), W.biru, 2),
    bulat(`${id}-u`, ux, uy, r, W.emas, W.biru, { tebal: 2 }),
    bulat(`${id}-a`, pa.x, pa.y, r, W.langit, W.biru, { tebal: 2 }),
    bulat(`${id}-b`, pb.x, pb.y, r, W.pink, W.biru, { tebal: 2 }),
    teks(`${id}-tu`, ux, uy + 5, utuh, 14, isi(utuh)),
    teks(`${id}-ta`, pa.x, pa.y + 5, a, 14, isi(a)),
    teks(`${id}-tb`, pb.x, pb.y + 5, b, 14, isi(b)),
  ];
}

/** Meja pesta: papan `${id}` dan nama `${id}-n` di bawahnya. */
export const meja = (id: string, x: number, y: number, w: number, nama: string): Obj[] => [
  kotak(id, x, y, w, 10, "#F59E0B", W.coklat, { rx: 3, tebal: 1.8, z: -1 }),
  garis(`${id}-k1`, x + 8, y + 10, 0, 22, W.coklat, 2.4),
  garis(`${id}-k2`, x + w - 8, y + 10, 0, 22, W.coklat, 2.4),
  teks(`${id}-n`, x + w / 2, y + 44, nama, 8.6, W.coklat),
];

/** Model batang: `a` sel biru dan `b` sel merah muda berderet dari x0 (sel `${id}{i}`), lebar sel s. */
export function batang(id: string, x0: number, y: number, a: number, b: number, s = 22): Obj[] {
  return Array.from({ length: a + b }, (_, i) => kotak(`${id}${i}`, x0 + i * s, y, s, 22, i < a ? W.langit : W.pink, W.biru, { rx: 2, tebal: 1.4 }));
}

/** Rak manik satu kawat sepuluh manik: `kiri` manik digeser ke kiri. Manik `${id}{i}` (lima merah, lima putih). */
export function rakManik(id: string, kiri: number, y = 110, n = 10): Obj[] {
  const out: Obj[] = [garis(`${id}-k`, 14, y, 272, 0, W.coklat, 3)];
  for (let i = 0; i < n; i += 1) {
    const x = i < kiri ? 30 + i * 18 : 286 - (n - i) * 18 + 4;
    out.push(bulat(`${id}${i}`, x, y, 8, i < 5 ? W.merah : W.putih, W.biru, { tebal: 1.6 }));
  }
  return out;
}
export const xManik = (i: number, kiri: number, n = 10): number => (i < kiri ? 30 + i * 18 : 286 - (n - i) * 18 + 4);

/** Benda sejenis berderet (emoji) di titik-titik `pts`, id `${id}${i}`. */
export const deretEmo = (e: string, id: string, pts: Titik[], u = 20): Obj[] => pts.map((p, i) => emo(`${id}${i}`, p.x, p.y, e, u));
export const deret = (n: number, x0: number, jarak: number, y: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * jarak, y }));
